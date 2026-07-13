// ============================================================
// SATU WORKER UNTUK DUA HAL:
//   1. Menyajikan website villa (index.html di folder /public)
//   2. Menangani webhook bot WhatsApp di /webhook
//
// Kalau request menuju /webhook -> diproses sebagai bot.
// Selain itu (misal "/", "/apa-saja") -> dilempar ke aset statis
// (yaitu index.html kamu), persis seperti website biasa.
// ============================================================

import { getLiveVillaData } from "./firestore.js";
import { DEFAULT_DATA } from "./defaultData.js";
import { buildReply } from "./botReplies.js";

async function sendReply(target, message, fonnteToken) {
  const res = await fetch("https://api.fonnte.com/send", {
    method: "POST",
    headers: {
      Authorization: fonnteToken,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ target, message }),
  });
  const json = await res.json();
  if (json.status === false) {
    console.error("[Fonnte] Gagal kirim:", json.reason || json);
  }
  return json;
}

async function parseIncoming(request) {
  const contentType = request.headers.get("content-type") || "";
  let body = {};
  if (contentType.includes("application/json")) {
    body = await request.json();
  } else {
    const form = await request.formData();
    body = Object.fromEntries(form.entries());
  }
  const sender = body.sender || body.from || body.pengirim;
  const message = (body.message || body.text || body.pesan || "").toString();
  return { sender, message };
}

// Gabungkan data live Firestore dengan data cadangan.
// Kalau field tertentu tidak ada di Firestore (misal baru pertama kali
// setup), tetap pakai nilai cadangan supaya bot tidak error/kosong.
function mergeData(liveData) {
  if (!liveData) return DEFAULT_DATA;
  return {
    villa: liveData.villa || DEFAULT_DATA.villa,
    contact: liveData.contact || DEFAULT_DATA.contact,
    facilities: liveData.facilities || DEFAULT_DATA.facilities,
    rooms: liveData.rooms || DEFAULT_DATA.rooms,
    pricing: liveData.pricing || DEFAULT_DATA.pricing,
    rules: liveData.rules || DEFAULT_DATA.rules,
    faq: liveData.faq || DEFAULT_DATA.faq,
    location: liveData.location || DEFAULT_DATA.location,
  };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/webhook" && request.method === "POST") {
      const { sender, message } = await parseIncoming(request);

      if (!sender || !message) {
        return new Response("ok", { status: 200 });
      }

      // Ambil data ter-update dari Firestore (data yang sama dengan
      // yang diedit admin lewat panel admin website).
      const liveData = await getLiveVillaData();
      const data = mergeData(liveData);

      const reply = buildReply(message, data);

      // waitUntil supaya Worker tidak berhenti sebelum selesai kirim balasan,
      // tapi webhook tetap langsung dibalas "ok" ke Fonnte tanpa menunggu.
      ctx.waitUntil(sendReply(sender, reply, env.FONNTE_TOKEN));

      return new Response("ok", { status: 200 });
    }

    // Semua request selain /webhook dianggap permintaan halaman website
    // biasa -> dilayani dari folder /public (index.html dkk).
    return env.ASSETS.fetch(request);
  },
};

// ============================================================
// FIRESTORE READER — ambil data villa langsung dari database yang
// sama dipakai website (koleksi "villaSite", dokumen "content").
// Ini artinya: kalau admin ubah harga/fasilitas/dll lewat panel admin
// di website, bot ini otomatis ikut berubah tanpa perlu deploy ulang.
//
// Firestore REST API dipakai (bukan SDK penuh) karena lebih ringan
// dan cocok untuk Cloudflare Workers. Rule keamanan di proyek ini
// sudah mengizinkan baca publik untuk dokumen villaSite/content
// (allow read: if true), jadi tidak perlu token login admin.
// ============================================================

const FIREBASE_PROJECT_ID = "zn-villa";
const FIREBASE_API_KEY = "AIzaSyBZbt5x2nn5DJRuZHQUYf6TM2zlHSupETk";

// Firestore REST API membungkus tiap value dengan tipe data, misal:
// { stringValue: "abc" } atau { mapValue: { fields: {...} } }.
// Fungsi ini "membuka" bungkusan itu jadi objek JS biasa.
function convertValue(v) {
  if (v == null) return null;
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return parseInt(v.integerValue, 10);
  if ("doubleValue" in v) return v.doubleValue;
  if ("booleanValue" in v) return v.booleanValue;
  if ("nullValue" in v) return null;
  if ("timestampValue" in v) return v.timestampValue;
  if ("mapValue" in v) return convertFields(v.mapValue.fields || {});
  if ("arrayValue" in v) return (v.arrayValue.values || []).map(convertValue);
  return null;
}

function convertFields(fields) {
  const out = {};
  for (const key in fields) out[key] = convertValue(fields[key]);
  return out;
}

// Ambil data villa dari Firestore. Kalau gagal (offline/rules berubah/dll),
// kembalikan null supaya pemanggil bisa pakai data cadangan (DEFAULT_DATA).
export async function getLiveVillaData() {
  try {
    const url =
      `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}` +
      `/databases/(default)/documents/villaSite/content?key=${FIREBASE_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error("Firestore fetch gagal, status:", res.status);
      return null;
    }
    const json = await res.json();
    if (!json.fields) return null;
    return convertFields(json.fields);
  } catch (err) {
    console.error("Firestore fetch error:", err.message);
    return null;
  }
}

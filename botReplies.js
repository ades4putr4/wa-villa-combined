// ============================================================
// PENYUSUN BALASAN BOT — semua fungsi di sini menerima "data"
// yang bentuknya sama seperti DATA di panel admin website
// (villa, contact, rooms, pricing, facilities, rules, faq, location).
// ============================================================

const bullet = (arr) => arr.map((x) => `• ${x}`).join("\n");

export function buildMenu(data) {
  return (
    `*${data.villa.name}*\n${data.villa.tagline}\n\n` +
    `Ketik salah satu perintah berikut untuk info otomatis:\n\n` +
    `*menu* - tampilkan daftar ini\n` +
    `*harga* - daftar harga & yang termasuk\n` +
    `*kamar* - tipe kamar & tarifnya\n` +
    `*fasilitas* - daftar fasilitas villa\n` +
    `*lokasi* - alamat & link maps\n` +
    `*aturan* - jam check-in/out & aturan villa\n` +
    `*faq* - pertanyaan yang sering ditanyakan\n` +
    `*kontak* - kontak admin\n` +
    `*booking* - cara reservasi\n\n` +
    `Atau ketik langsung pertanyaan kamu, nanti diteruskan ke admin ya 🙏`
  );
}

export function buildHarga(data) {
  const h = data.pricing;
  return (
    `*Daftar Harga - ${data.villa.name}*\n\n` +
    `Weekday: ${h.weekday}\n` +
    `Weekend: ${h.weekend}\n` +
    `High Season: ${h.highSeason}\n` +
    `Peak Season: ${h.peakSeason}\n\n` +
    `*Sudah termasuk:*\n${bullet(h.includes)}\n\n` +
    `${h.deposit}\n\n` +
    `Ketik *kamar* untuk lihat tipe kamar, atau *booking* untuk mulai reservasi.`
  );
}

export function buildKamar(data) {
  const list = data.rooms
    .map((k) => `*${k.name}*\n${k.desc}\nKapasitas: ${k.capacity}\nHarga: ${k.price}`)
    .join("\n\n");
  return `*Tipe Kamar - ${data.villa.name}*\n\n${list}\n\nKetik *booking* untuk cek ketersediaan tanggal.`;
}

export function buildFasilitas(data) {
  const names = data.facilities.map((f) => f.name);
  return `*Fasilitas - ${data.villa.name}*\n\n${bullet(names)}`;
}

export function buildLokasi(data) {
  const address = data.location.address;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  return `*Lokasi - ${data.villa.name}*\n\n${address}\n\nLihat di Maps: ${mapsLink}`;
}

export function buildAturan(data) {
  const a = data.rules;
  return (
    `*Aturan Villa - ${data.villa.name}*\n\n` +
    `Check-in: ${a.checkin}\n` +
    `Check-out: ${a.checkout}\n` +
    `Maks. tamu: ${a.maxGuest}\n` +
    `Merokok: ${a.noSmoking ? "Tidak diperbolehkan di dalam kamar" : "Diperbolehkan"}\n` +
    `Hewan peliharaan: ${a.pets ? "Diperbolehkan" : "Belum diperbolehkan"}\n` +
    `Deposit kerusakan: ${a.deposit}\n` +
    `Pembatalan: ${a.cancellation}`
  );
}

export function buildFaq(data) {
  const list = data.faq.map((f) => `*${f.q}*\n${f.a}`).join("\n\n");
  return `*FAQ - ${data.villa.name}*\n\n${list}`;
}

export function buildKontak(data) {
  const k = data.contact;
  return (
    `*Kontak Admin - ${data.villa.name}*\n\n` +
    `WhatsApp/Telepon: ${k.phone}\n` +
    `Email: ${k.email}\n` +
    `Instagram: ${k.instagram}`
  );
}

export function buildBooking(data) {
  return (
    `*Cara Reservasi - ${data.villa.name}*\n\n` +
    `1. Ketik *kamar* untuk pilih tipe kamar\n` +
    `2. Kirim ke sini: tanggal check-in, check-out, jumlah tamu, dan tipe kamar yang diinginkan\n` +
    `3. Admin kami akan konfirmasi ketersediaan & kirim rincian pembayaran\n` +
    `4. Reservasi sah setelah deposit 30% dibayarkan\n\n` +
    `Chat pesan ini akan diteruskan ke admin untuk diproses ya 🙏`
  );
}

// Peta perintah -> fungsi pembuat balasan.
// Mau tambah perintah baru? Tinggal tambah baris baru di sini, contoh:
//   promo: (data) => "Promo bulan ini: diskon 10% untuk booking weekday!",
export const COMMANDS = {
  menu: buildMenu,
  help: buildMenu,
  bantuan: buildMenu,
  start: buildMenu,
  harga: buildHarga,
  price: buildHarga,
  kamar: buildKamar,
  room: buildKamar,
  fasilitas: buildFasilitas,
  facility: buildFasilitas,
  lokasi: buildLokasi,
  alamat: buildLokasi,
  location: buildLokasi,
  aturan: buildAturan,
  rules: buildAturan,
  faq: buildFaq,
  kontak: buildKontak,
  contact: buildKontak,
  admin: buildKontak,
  booking: buildBooking,
  reservasi: buildBooking,
  book: buildBooking,
};

export function buildReply(rawMessage, data) {
  const command = rawMessage.trim().toLowerCase().replace(/^[.!/]/, "");
  const handler = COMMANDS[command];
  if (handler) return handler(data);
  return `Maaf, perintah "${rawMessage}" tidak dikenali.\n\n${buildMenu(data)}`;
}

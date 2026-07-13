// ============================================================
// DATA CADANGAN (fallback) — dipakai HANYA kalau Firestore gagal
// diakses (misal internet villa lagi bermasalah). Normalnya bot
// selalu pakai data live dari Firestore (lihat firestore.js), jadi
// file ini tidak perlu sering diedit — tapi kalau mau, strukturnya
// sengaja disamakan persis dengan DATA di panel admin website.
// ============================================================
export const DEFAULT_DATA = {
  villa: {
    name: "ZN Villa Gedong Songo",
    tagline:
      "Vila pegunungan di jalur Candi Gedong Songo — udara sejuk Bandungan, panorama matahari terbit, dan area camping pribadi.",
  },
  contact: {
    whatsapp: "628112701923",
    phone: "0811-2701-923",
    email: "reservasi@znvilla.com",
    instagram: "@znvilla.gedongsongo",
  },
  facilities: [
    { name: "Area Camping" }, { name: "Sunset Point" }, { name: "WiFi Cepat" },
    { name: "Smart TV" }, { name: "Netflix" }, { name: "AC" }, { name: "Water Heater" },
    { name: "Kitchen Set" }, { name: "BBQ" }, { name: "Rooftop" }, { name: "Balkon" },
    { name: "Parkir" }, { name: "CCTV" }, { name: "Security" }, { name: "Mesin Cuci" },
    { name: "Hair Dryer" }, { name: "Coffee Maker" }, { name: "Rice Cooker" },
    { name: "Microwave" }, { name: "Kulkas" }, { name: "Playground" }, { name: "Gazebo" },
    { name: "Karaoke" }, { name: "Meja Kerja" },
  ],
  rooms: [
    {
      name: "Kamar Utama — Valley View",
      desc: "Balkon pribadi menghadap lembah dan perbukitan Bandungan.",
      capacity: "2 Tamu",
      price: "Rp 3.500.000 / malam",
    },
    {
      name: "Kamar Keluarga",
      desc: "Kamar luas untuk keluarga, dekat ruang bersama dan dapur.",
      capacity: "4 Tamu",
      price: "Rp 4.200.000 / malam",
    },
    {
      name: "Tenda Camping Gazebo",
      desc: "Area camping pribadi beratap gazebo kayu.",
      capacity: "2-4 Tamu",
      price: "Rp 1.800.000 / malam",
    },
  ],
  pricing: {
    weekday: "Rp 3.500.000",
    weekend: "Rp 4.500.000",
    highSeason: "Rp 6.000.000",
    peakSeason: "Rp 8.500.000",
    includes: [
      "Sarapan untuk seluruh tamu",
      "Wi-Fi & listrik tanpa batas",
      "Layanan kebersihan harian",
      "Handuk kolam & perlengkapan mandi",
    ],
    deposit: "Deposit 30% saat konfirmasi, pelunasan H-3 sebelum check-in.",
  },
  rules: {
    checkin: "14:00",
    checkout: "11:00",
    maxGuest: "8 orang",
    noSmoking: true,
    pets: false,
    deposit: "Rp 1.000.000, dikembalikan penuh jika tidak ada kerusakan.",
    cancellation: "Pembatalan gratis hingga H-7 sebelum check-in.",
  },
  faq: [
    { q: "Apakah harga sudah termasuk sarapan?", a: "Ya, sarapan untuk seluruh tamu sudah termasuk dalam harga sewa." },
    { q: "Apakah bisa membawa hewan peliharaan?", a: "Mohon maaf, villa kami belum dapat menerima hewan peliharaan untuk saat ini." },
    { q: "Bagaimana proses reservasi?", a: "Hubungi kami via WhatsApp untuk cek ketersediaan tanggal, lalu lakukan deposit untuk mengunci jadwal." },
    { q: "Apakah tersedia layanan antar-jemput?", a: "Ya, layanan antar-jemput bandara tersedia dengan biaya tambahan sesuai jarak." },
  ],
  location: {
    address:
      "Jl. Ke Candi Gedong Songo, Krajan, Banyukuning, Bandungan, Kabupaten Semarang, Jawa Tengah 50614",
  },
};

// --- OBJECT TYPE: a mudik traveller ---
let traveller;
traveller = {
    nama: "Budi Santoso",
    asalKota: "Jakarta",
    tujuan: "Yogyakarta",
    provinsi: "Jawa Tengah",
    transport: "kereta",
    status: "belum berangkat",
};
console.log("Traveller:", traveller);
// --- ARRAY OF OBJECTS: mudik convoy group ---
let convoy = [
    { nama: "Budi", tujuan: "Yogyakarta", transport: "kereta", jarak: 564, status: "belum berangkat" },
    { nama: "Siti", tujuan: "Surabaya", transport: "pesawat", jarak: 791, status: "dalam perjalanan" },
    { nama: "Agus", tujuan: "Semarang", transport: "mobil", jarak: 450, status: "sudah sampai" },
    { nama: "Dewi", tujuan: "Bandung", transport: "motor", jarak: 150, status: "sudah sampai" },
    { nama: "Eko", tujuan: "Medan", transport: "pesawat", jarak: 1_869, status: "dalam perjalanan" },
    { nama: "Fitri", tujuan: "Makassar", transport: "pesawat", jarak: 1_411, status: "belum berangkat" },
];
// --- TUPLE: checkpoint — [kota, jarak dari Jakarta (km), estimasi waktu (jam)] ---
let checkpoint = ["Cirebon", 258, 3];
console.log(`Checkpoint: ${checkpoint[0]} — ${checkpoint[1]} km dari Jakarta (~${checkpoint[2]} jam)`);
// --- NUMBERS ---
let totalPesanaMudik = 26_500_000; // mudik travellers nationally
let hargaTiketKereta = 350_000;
let hargaBensin = 10_000; // per liter
// --- BOOLEANS ---
let isMacetParah = true;
let isH1Lebaran = false;
// ============================================================
// FUNCTIONS
// ============================================================
// Typed params + return type — estimate travel time
function estimasiWaktu(jarak, transport) {
    const kecepatan = {
        motor: 60, mobil: 80, bus: 70, kereta: 100, pesawat: 800,
    };
    const jam = Math.round(jarak / kecepatan[transport]);
    return `~${jam} jam`;
}
// Void — announce travel status
function umumkanStatus(nama, tujuan, status) {
    const icon = status === "sudah sampai" ? "✅" :
        status === "dalam perjalanan" ? "🚗" : "⏳";
    console.log(`  ${icon} ${nama.padEnd(8)} → ${tujuan.padEnd(15)} [${status}]`);
}
// Optional param — pesan tiket with optional seat preference
function pesanTiket(tujuan, transport, kursi) {
    return kursi
        ? `Tiket ${transport} ke ${tujuan} — Kursi: ${kursi}`
        : `Tiket ${transport} ke ${tujuan} — Kursi: bebas`;
}
// Default param — hitung biaya BBM
function biayaBBM(jarak, konsumsi = 20) {
    // konsumsi = km per liter, default 20 km/L
    const literDibutuhkan = jarak / konsumsi;
    return Math.round(literDibutuhkan * hargaBensin);
}
// Rest param — total biaya perjalanan dari beberapa pengeluaran
function totalBiaya(...pengeluaran) {
    return pengeluaran.reduce((sum, p) => sum + p, 0);
}
// Function inference — apakah jarak jauh? (inferred: boolean)
function isJarakJauh(jarak) {
    return jarak > 500;
}
// ============================================================
// LET'S RUN IT
// ============================================================
console.log("\n========== MUDIK PLANNER LEBARAN ==========\n");
console.log(`Total pemudik nasional: ${totalPesanaMudik.toLocaleString("id-ID")} orang`);
console.log(`Macet parah: ${isMacetParah} | H+1 Lebaran: ${isH1Lebaran}`);
console.log("\n--- Status Konvoi ---");
convoy.forEach((c) => umumkanStatus(c.nama, c.tujuan, c.status));
console.log("\n--- Yang Sudah Sampai ---");
const sampai = convoy.filter((c) => c.status === "sudah sampai");
console.log(`${sampai.length} orang sudah sampai tujuan`);
console.log("\n--- Estimasi Perjalanan ---");
convoy
    .filter((c) => c.status !== "sudah sampai")
    .forEach((c) => {
    const waktu = estimasiWaktu(c.jarak, c.transport);
    const jauh = isJarakJauh(c.jarak) && c.transport === "pesawat" ? "✈️ jauh banget" : "";
    console.log(`  ${c.nama} ke ${c.tujuan}: ${c.jarak} km ${waktu} ${jauh}`);
});
console.log("\n--- Pesan Tiket ---");
console.log(pesanTiket("Yogyakarta", "kereta", "12A"));
console.log(pesanTiket("Surabaya", "pesawat"));
console.log("\n--- Hitung Biaya ---");
const bbm = biayaBBM(450); // default 20 km/L
const bbmMotor = biayaBBM(150, 40); // motor lebih irit
const tol = 200_000;
const makan = 150_000;
const total = totalBiaya(bbm, tol, makan, hargaTiketKereta);
console.log(`BBM mobil (450 km)  : Rp ${bbm.toLocaleString("id-ID")}`);
console.log(`BBM motor (150 km)  : Rp ${bbmMotor.toLocaleString("id-ID")}`);
console.log(`Total estimasi biaya: Rp ${total.toLocaleString("id-ID")}`);
console.log("\n============================================");
export {};

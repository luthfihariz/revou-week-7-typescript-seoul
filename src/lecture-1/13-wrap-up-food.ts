export {};
// ============================================================
// Lecture 1 — Wrap-up Demo: WARUNG MAKAN
// Indonesian food stall order system
// ============================================================

// --- UNION TYPE ---
type FoodCategory = "nasi" | "mie" | "gorengan" | "minuman" | "cemilan";
type OrderStatus = "pending" | "dimasak" | "siap" | "dibatalkan";
// ^ OrderStatus will be used when we track live order updates

// --- OBJECT TYPE: menu item ---
let menuItem: {
  nama: string;
  harga: number;
  kategori: FoodCategory;
  tersedia: boolean;
};

menuItem = {
  nama: "Nasi Goreng Spesial",
  harga: 25_000,
  kategori: "nasi",
  tersedia: true,
};
console.log("Menu item:", menuItem);

// --- ARRAY OF OBJECTS: full menu ---
let menu: {
  id: number;
  nama: string;
  harga: number;
  kategori: FoodCategory;
  tersedia: boolean;
}[] = [
  { id: 1, nama: "Nasi Goreng Spesial", harga: 25_000, kategori: "nasi",     tersedia: true  },
  { id: 2, nama: "Mie Ayam Bakso",      harga: 20_000, kategori: "mie",      tersedia: true  },
  { id: 3, nama: "Nasi Uduk",           harga: 15_000, kategori: "nasi",     tersedia: true  },
  { id: 4, nama: "Tempe Goreng",        harga: 5_000,  kategori: "gorengan", tersedia: true  },
  { id: 5, nama: "Es Teh Manis",        harga: 5_000,  kategori: "minuman",  tersedia: true  },
  { id: 6, nama: "Es Jeruk",            harga: 7_000,  kategori: "minuman",  tersedia: false },
  { id: 7, nama: "Kerupuk",             harga: 2_000,  kategori: "cemilan",  tersedia: true  },
];

// --- TUPLE: order record — [orderId, customerName, totalPrice] ---
let currentOrder: [number, string, number] = [1001, "Budi Santoso", 0];

// ============================================================
// FUNCTIONS
// ============================================================

// Typed params + return type — format price to Rupiah
function formatRupiah(harga: number): string {
  return `Rp ${harga.toLocaleString("id-ID")}`;
}

// Void — print a menu item
function tampilkanMenu(nama: string, harga: number, tersedia: boolean): void {
  const status = tersedia ? "✓" : "✗ HABIS";
  console.log(`  ${status}  ${nama.padEnd(25)} ${formatRupiah(harga)}`);
}

// Optional param — add note to order
function buatPesanan(nama: string, jumlah: number, catatan?: string): string {
  const note = catatan ? ` (catatan: ${catatan})` : "";
  return `Pesan: ${jumlah}x ${nama}${note}`;
}

// Default param — hitung total dengan diskon
function hitungTotal(harga: number, jumlah: number, diskon: number = 0): number {
  return harga * jumlah * (1 - diskon);
}

// Rest param — total belanja dari beberapa item
function totalBelanja(...hargaList: number[]): number {
  return hargaList.reduce((total, h) => total + h, 0);
}

// Function inference — cek apakah murah (return type inferred as boolean)
function isMurah(harga: number) {
  return harga <= 10_000;
}

// ============================================================
// LET'S RUN IT
// ============================================================

console.log("\n========== WARUNG MAKAN BAROKAH ==========\n");

console.log("=== DAFTAR MENU ===");
menu.forEach((item) => tampilkanMenu(item.nama, item.harga, item.tersedia));

console.log("\n=== MENU TERSEDIA ===");
const tersedia = menu.filter((item) => item.tersedia);
console.log(`${tersedia.length} dari ${menu.length} menu tersedia`);

console.log("\n=== MENU MURAH (≤ Rp10.000) ===");
menu
  .filter((item) => isMurah(item.harga) && item.tersedia)
  .forEach((item) => console.log(`  - ${item.nama}`));

console.log("\n=== PESANAN ===");
console.log(buatPesanan("Nasi Goreng Spesial", 2, "tidak pakai pedas"));
console.log(buatPesanan("Es Teh Manis", 1));

console.log("\n=== HITUNG HARGA ===");
const hargaNasiGoreng = hitungTotal(25_000, 2);
const hargaDiskon     = hitungTotal(25_000, 2, 0.1); // diskon 10%
console.log(`Nasi Goreng 2x         : ${formatRupiah(hargaNasiGoreng)}`);
console.log(`Nasi Goreng 2x (diskon): ${formatRupiah(hargaDiskon)}`);

console.log("\n=== TOTAL TAGIHAN ===");
const total = totalBelanja(50_000, 20_000, 5_000, 5_000, 2_000);
console.log(`Total: ${formatRupiah(total)}`);

currentOrder[2] = total;
console.log(`Order #${currentOrder[0]} atas nama ${currentOrder[1]}: ${formatRupiah(currentOrder[2])}`);

console.log("\n==========================================");

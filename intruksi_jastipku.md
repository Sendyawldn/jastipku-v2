Anda adalah senior full-stack developer.

Instruksi Proyek: Upgrade Platform "Jastipku"

1. Ringkasan Proyek & Peran Pengguna
   Jastipku adalah platform yang menghubungkan antara customer (pengguna yang ingin membeli barang) dengan traveler (pengguna yang sedang bepergian dan bisa membelikan barang). Tujuannya adalah memfasilitasi transaksi jasa titip dalam negeri secara aman, transparan, dan efisien.

Platform ini akan mendukung tiga peran pengguna utama:

Admin: Memiliki akses penuh ke sistem melalui Admin Panel. Bertugas untuk memvalidasi profil traveler, mengelola transaksi yang bermasalah, memproses penarikan dana (withdrawal), dan mengelola data master lainnya.

Traveler: Pengguna yang menawarkan jasa titip. Mereka dapat mempublikasikan jadwal perjalanan (trip), menerima pesanan, berkomunikasi dengan customer, dan mengelola penghasilan mereka. Akun traveler memerlukan verifikasi dari Admin.

Customer: Pengguna yang membuat pesanan jasa titip. Mereka dapat mencari traveler berdasarkan tujuan, membuat pesanan, melakukan pembayaran, melacak status pesanan, dan memberikan ulasan setelah pesanan selesai.

2. Stack Teknologi & Arsitektur
   Proyek ini akan di-refactor dari arsitektur monolitik menjadi 3 repositori terpisah untuk meningkatkan skalabilitas, fleksibilitas, dan kemudahan pengelolaan.

1. Backend API (jastipku-api)
   Framework: NestJS (latest) dengan TypeScript untuk membangun API yang robust dan terstruktur.

Database & ORM: PostgreSQL (latest stable version) dengan Prisma (latest) untuk manajemen skema dan query yang aman.

Otentikasi: JWT (JSON Web Tokens) diimplementasikan dengan Passport.js (latest), menggunakan secure HTTP-only cookie untuk keamanan.

Manajemen Peran (RBAC): Dibangun menggunakan NestJS Guards dan custom decorators untuk memproteksi endpoint berdasarkan peran pengguna.

Antrian & Cache: Redis (latest stable version) dengan Bull.js (latest) untuk menangani background jobs (seperti pengiriman notifikasi) dan @nestjs/cache-manager untuk caching data yang sering diakses.

2. Frontend Customer & Traveler (jastipku-web)
   Framework: Next.js (latest) dengan App Router untuk server-side rendering (SSR) dan performa yang optimal.

UI/UX: Tailwind CSS (latest) untuk desain yang responsif dan utility-first.

Manajemen State: Zustand (latest) untuk manajemen state global yang simpel dan efisien.

Komunikasi API: Custom hooks menggunakan axios (latest) atau fetch untuk berinteraksi dengan jastipku-api.

3. Admin Panel (jastipku-admin)
   Framework: Next.js (latest) dengan App Router, dibangun secara manual (bukan menggunakan library admin panel jadi).

UI Library: Shadcn/ui (latest components), yang dibangun di atas Tailwind CSS, untuk menciptakan komponen UI yang konsisten, aksesibel, dan mudah dikustomisasi.

Manajemen Data: React Query / TanStack Query (latest) untuk data fetching, caching, dan sinkronisasi state dengan server secara efisien.

3. Fitur Inti & Fungsionalitas
   Manajemen Perjalanan (Traveler):

Traveler dapat membuat, mengedit, dan menghapus jadwal perjalanan mereka, mencakup kota asal, kota tujuan, dan tanggal.

Sistem akan menampilkan perjalanan yang aktif di halaman utama untuk ditemukan oleh customer.

Alur Pesanan (End-to-End):

Customer membuat pesanan dengan detail barang, tautan produk (opsional), dan alamat pengiriman.

Pesanan masuk ke traveler yang relevan untuk diterima atau ditolak.

Setelah diterima, customer melakukan pembayaran.

Traveler meng-update status pesanan (misal: "sedang dibelikan", "dalam perjalanan", "telah dikirim").

Customer mengonfirmasi penerimaan barang untuk menyelesaikan pesanan.

Sistem Keuangan & Penarikan Dana:

Dana dari customer ditahan oleh sistem (escrow) hingga pesanan selesai.

Setelah pesanan selesai, total biaya barang dan ongkos jasa akan masuk ke saldo traveler.

Traveler dapat mengajukan permintaan penarikan dana (withdrawal) yang akan divalidasi dan diproses oleh Admin.

Panel Admin Kustom:

Dibangun dengan Next.js dan Shadcn/ui.

Fitur CRUD untuk mengelola data pengguna, verifikasi profil traveler, memantau pesanan, dan memproses withdrawal.

Menggunakan komponen dari Shadcn/ui seperti Table, Form, Card, dan Dialog untuk membangun antarmuka yang intuitif.

Integrasi Pembayaran & Logistik:

Xendit: Digunakan sebagai payment gateway. Dipanggil dari backend NestJS. Webhook dari Xendit akan diterima oleh controller khusus untuk rekonsiliasi pembayaran otomatis.

RajaOngkir: API dipanggil dari backend NestJS untuk kalkulasi ongkos kirim dari alamat traveler ke alamat customer secara aman tanpa mengekspos API key.

Sistem Notifikasi & Chat Real-time:

Email: Menggunakan Nodemailer (latest) di NestJS untuk notifikasi penting (registrasi, status pesanan, withdrawal).

WebSockets: Implementasi chat real-time antara customer dan traveler per pesanan menggunakan library seperti Socket.IO (latest) yang terintegrasi dengan NestJS.

4. Skema Database Utama (Prisma/PostgreSQL)
   Skema ini dirancang untuk mencakup semua kebutuhan fungsional platform "Jastipku", termasuk tabel log untuk audit dan pelacakan transaksi keuangan demi keandalan sistem. Struktur ini akan diimplementasikan menggunakan schema.prisma di dalam proyek jastipku-api.

Cuplikan kode

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}

// =================================
// ENUMS
// =================================

enum UserRole {
ADMIN
TRAVELER
CUSTOMER
}

enum VerificationStatus {
PENDING
VERIFIED
REJECTED
}

enum OrderStatus {
PENDING_ACCEPTANCE // Menunggu diterima traveler
PENDING_PAYMENT // Menunggu pembayaran customer
PROCESSING // Sedang dibelikan oleh traveler
SHIPPING // Dalam pengiriman ke customer
COMPLETED // Selesai dan dana dilepaskan
CANCELLED // Dibatalkan
REFUNDED // Dana dikembalikan
}

enum WithdrawalStatus {
PENDING
APPROVED
REJECTED
COMPLETED
}

enum TransactionType {
PAYMENT_IN // Pembayaran dari customer
PAYMENT_OUT // Pengembalian dana (refund) ke customer
FEE // Potongan biaya platform
WITHDRAWAL // Penarikan dana oleh traveler
REVENUE // Pendapatan untuk traveler dari pesanan
}

// =================================
// CORE MODELS
// =================================

model User {
id Int @id @default(autoincrement())
email String @unique
name String
password String
role UserRole @default(CUSTOMER)
profilePhotoUrl String?
balance Float @default(0.0)
averageRating Float?
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

travelerProfile TravelerProfile?
trips Trip[]
customerOrders Order[] @relation("CustomerOrders")
travelerOrders Order[] @relation("TravelerOrders")
withdrawals Withdrawal[]
reviewsGiven Review[] @relation("ReviewsGiven")
reviewsReceived Review[] @relation("ReviewsReceived")
chatMessages ChatMessage[]
transactions Transaction[]
}

model TravelerProfile {
id Int @id @default(autoincrement())
userId Int @unique
idCardNumber String
idCardImageUrl String
bankName String
bankAccountNumber String
bankAccountName String
verificationStatus VerificationStatus @default(PENDING)
verifiedAt DateTime?
rejectionReason String?

user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Trip {
id Int @id @default(autoincrement())
travelerId Int
originCity String
destinationCity String
departureDate DateTime
arrivalDate DateTime
description String?
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

traveler User @relation(fields: [travelerId], references: [id])
orders Order[]
}

model Order {
id Int @id @default(autoincrement())
customerId Int
travelerId Int
tripId Int
status OrderStatus @default(PENDING_ACCEPTANCE)
totalItemPrice Float // Total harga semua barang
serviceFee Float // Ongkos jasa titip
shippingFee Float? // Ongkos kirim dari traveler ke customer
totalAmount Float // Total yang dibayar customer
shippingAddress String
trackingNumber String?
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

customer User @relation("CustomerOrders", fields: [customerId], references: [id])
traveler User @relation("TravelerOrders", fields: [travelerId], references: [id])
trip Trip @relation(fields: [tripId], references: [id])
items OrderItem[]
payment Payment?
review Review?
chatMessages ChatMessage[]
}

model OrderItem {
id Int @id @default(autoincrement())
orderId Int
productName String
productUrl String?
quantity Int
estimatedPrice Float
productImageUrl String?
notes String?

order Order @relation(fields: [orderId], references: [id])
}

model Review {
id Int @id @default(autoincrement())
orderId Int @unique
reviewerId Int // Customer
receiverId Int // Traveler
rating Int // 1-5
comment String?
createdAt DateTime @default(now())

order Order @relation(fields: [orderId], references: [id])
reviewer User @relation("ReviewsGiven", fields: [reviewerId], references: [id])
receiver User @relation("ReviewsReceived", fields: [receiverId], references: [id])
}

// =================================
// FINANCIAL & LOG MODELS
// =================================

model Payment {
id Int @id @default(autoincrement())
orderId Int @unique
xenditInvoiceId String @unique
amount Float
status String // Sesuai status dari Xendit (e.g., "PENDING", "PAID", "EXPIRED")
paymentMethod String?
paidAt DateTime?
createdAt DateTime @default(now())

order Order @relation(fields: [orderId], references: [id])
paymentLogs PaymentLog[]
}

model Withdrawal {
id Int @id @default(autoincrement())
travelerId Int
amount Float
status WithdrawalStatus @default(PENDING)
processedAt DateTime?
rejectionReason String?
transactionId Int? @unique // Link to the corresponding transaction log
createdAt DateTime @default(now())

traveler User @relation(fields: [travelerId], references: [id])
transaction Transaction? @relation(fields: [transactionId], references: [id])
}

// Log spesifik untuk interaksi dengan payment gateway (Xendit)
model PaymentLog {
id Int @id @default(autoincrement())
paymentId Int
rawResponse Json // Menyimpan payload webhook lengkap dari Xendit
status String // Status yang diterima dari webhook
createdAt DateTime @default(now())

payment Payment @relation(fields: [paymentId], references: [id])
}

// Log umum untuk semua pergerakan dana di dalam sistem (audit trail)
model Transaction {
id Int @id @default(autoincrement())
userId Int
type TransactionType
amount Float // Nilai transaksi (bisa positif atau negatif)
description String
relatedOrderId Int? // Opsional, jika terkait pesanan
createdAt DateTime @default(now())

user User @relation(fields: [userId], references: [id])
withdrawal Withdrawal?
}

// =================================
// COMMUNICATION MODELS
// =================================

model ChatMessage {
id Int @id @default(autoincrement())
orderId Int
senderId Int
message String
createdAt DateTime @default(now())

order Order @relation(fields: [orderId], references: [id])
sender User @relation(fields: [senderId], references: [id])

} 5. Kriteria Desain & UX (Wajib)
Mobile-First & Responsif: Desain harus optimal di perangkat mobile terlebih dahulu, diimplementasikan dengan Tailwind CSS.

Performa:

Optimasi Gambar: Menggunakan komponen <Image> bawaan Next.js.

Lazy Loading & Code Splitting: Disediakan secara otomatis oleh Next.js untuk mempercepat waktu muat halaman.

PWA Ready: Dikonfigurasi menggunakan next-pwa (latest) atau library sejenis agar dapat di-"install" di perangkat pengguna dan memiliki fungsionalitas offline dasar.

6. Lingkungan Development Lokal (Docker)
   Semua layanan (3 proyek + 2 database: PostgreSQL & Redis) akan diorkestrasi menggunakan satu file docker-compose.yml dengan Docker (latest stable version) untuk menyederhanakan proses setup bagi tim developer.

Struktur Folder Lokal
jastipku-upgrade/ <-- Folder root
├── jastipku-api/ <-- Repositori Backend (NestJS)
├── jastipku-web/ <-- Repositori Frontend (Next.js)
├── jastipku-admin/ <-- Repositori Admin Panel (Next.js)
└── docker-compose.yml <-- File Orkestrasi Utama

# Seblak RA

Halaman pesanan seblak. Tanpa build step: upload folder/zip ini ke Cloudflare Pages.
Pakai ES modules, jadi harus lewat server (Cloudflare Pages / tombol Run di Acode), bukan buka `index.html` langsung dari file.

## Struktur
- `index.html`  kerangka halaman (markup, link CSS, CDN GSAP/Lenis)
- `css/`  1 file per komponen. Urutan `<link>` di index.html penting (base dulu, komponen setelahnya)
- `js/config.js`  nomor WhatsApp & alamat
- `js/data/`  `menu.js`, `toppings.js`, `levels.js`
- `js/core/`  `bus.js` (event), `state.js` (data), `cart.js` (logika keranjang)
- `js/services/whatsapp.js`  susun isi pesan & buka WhatsApp
- `js/ui/`  1 modul per komponen: page, menu, level, sheet, cart, bar
- `js/fx/`  efek & animasi: motion, scroll, reveal, marquee, fit-hero, anti-copy
- `js/main.js`  pintu masuk

## Mau ubah apa?
- Nomor WA / alamat: `js/config.js`
- Menu, harga, topping, level pedas: `js/data/*.js`
- Warna & font: `css/tokens.css`
- Isi pesan WhatsApp: `buildMessage()` di `js/services/whatsapp.js`
- Matiin anti-copy: hapus `initAntiCopy()` di `js/main.js`

## Aturan main
- Komponen tidak saling import. Komunikasi lewat `emit/on` di `js/core/bus.js`
  (event: `menu:pick`, `cart`, `level`, `layout`, `sheet:open`, `sheet:close`).
- Modul baru: bikin file di folder yang pas, `export function initXxx()`, lalu panggil di `js/main.js`.

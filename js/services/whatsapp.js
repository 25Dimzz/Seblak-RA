import { WA } from "../config.js";
import { LEVELS } from "../data/levels.js";
import { state } from "../core/state.js";
import { countItems, totalPrice } from "../core/cart.js";
import { rp } from "../lib/format.js";

const BR = "━━━━━━━━━━━━━━";
const enc = encodeURIComponent;
const MOBILE = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || matchMedia("(pointer:coarse)").matches;

/** isi pesan WhatsApp (ubah format pesan di sini) */
export function buildMessage(){
  const L = ["Halo Seblak RA, saya mau pesan ya 🙏", "", "🧾 *RINGKASAN PESANAN*", BR];
  state.cart.forEach((c, i) => L.push(
    `*${i + 1}. ${c.n}*`,
    ...(c.t.length ? ["• Topping per porsi:", ...c.t.map(x => "   - " + x)] : ["• Tanpa topping tambahan"]),
    `• Jumlah: ${c.q} porsi`,
    `• Harga: ${rp(c.u)} x ${c.q} = ${rp(c.u * c.q)}`, ""));
  L.push(BR, `🌶️ Level pedas: ${LEVELS[state.lv][0]}`, `🍜 Total porsi: ${countItems()}`,
    `💰 *TOTAL BAYAR: ${rp(totalPrice())}*`, "", "Mohon dikonfirmasi ya, terima kasih 🙏");
  return L.join("\n");
}

export const waLink = () => `https://wa.me/${WA}?text=${enc(buildMessage())}`;

/** buka WhatsApp langsung tanpa halaman perantara wa.me */
export function openWA(){
  if (!state.cart.length) return;
  const t = enc(buildMessage());
  if (!MOBILE){ window.open(`https://web.whatsapp.com/send?phone=${WA}&text=${t}`, "_blank", "noopener"); return; }
  let gone = false;
  const mark = () => { gone = true; };
  addEventListener("pagehide", mark); addEventListener("blur", mark); document.addEventListener("visibilitychange", mark);
  location.href = `whatsapp://send?phone=${WA}&text=${t}`;
  setTimeout(() => {
    removeEventListener("pagehide", mark); removeEventListener("blur", mark); document.removeEventListener("visibilitychange", mark);
    if (!gone && !document.hidden) location.href = `https://wa.me/${WA}?text=${t}`;
  }, 1500);
}

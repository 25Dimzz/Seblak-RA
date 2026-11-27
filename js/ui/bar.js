import { $ } from "../lib/dom.js";
import { rp } from "../lib/format.js";
import { countItems, totalPrice } from "../core/cart.js";
import { on } from "../core/bus.js";
import { openWA, waLink } from "../services/whatsapp.js";

const bar = $("#bar"), order = $("#order");
let shown = false;

const syncHref = () => { order.href = waLink(); };   // cadangan; klik biasa lewat openWA()

function render(){
  const n = countItems();
  $("#sum").textContent = `${n} porsi · ${rp(totalPrice())}`;
  if (window.gsap) gsap.fromTo("#sum", { scale: 1.12 }, { scale: 1, duration: .4, ease: "back.out(3)" });
  if (n > 0 !== shown){
    shown = n > 0;
    if (window.gsap) gsap.to(bar, { yPercent: shown ? 0 : 250, duration: .6, ease: "expo.out" });
    else bar.style.transform = shown ? "translate(-50%,0)" : "translate(-50%,250%)";
  }
  syncHref();
}

/** bar pesanan melayang + tombol "Pesan via WhatsApp" */
export function initBar(){
  if (window.gsap) gsap.set(bar, { xPercent: -50, yPercent: 250 });
  on("cart", render);
  on("level", syncHref);
  order.addEventListener("click", e => { e.preventDefault(); openWA(); });
}

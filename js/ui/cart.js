import { $ } from "../lib/dom.js";
import { rp } from "../lib/format.js";
import { state } from "../core/state.js";
import { changeQty, totalPrice } from "../core/cart.js";
import { on, emit } from "../core/bus.js";
import { openWA } from "../services/whatsapp.js";

const box = $("#cartBox"), list = $("#cart"), sum = $("#cartSum");

function render(){
  const was = !box.hidden, has = state.cart.length > 0;
  box.hidden = !has;
  list.innerHTML = state.cart.map((c, i) =>
    `<li class="cl"><div><b>${c.n}</b><small>${c.t.join(", ") || "Tanpa topping tambahan"}</small></div><div class="cr"><span>${rp(c.u * c.q)}</span><div class="qty">` +
    `<button type="button" aria-label="Kurangi ${c.n}" data-i="${i}" data-s="-1">-</button><output>${c.q}</output>` +
    `<button type="button" aria-label="Tambah ${c.n}" data-i="${i}" data-s="1">+</button></div></div></li>`).join("");
  sum.textContent = rp(totalPrice());
  if (was !== has) emit("layout");   // tinggi halaman berubah -> animasi scroll dihitung ulang
}

/** daftar "Pesanan kamu" */
export function initCart(){
  on("cart", render);
  $("#cartWa").addEventListener("click", openWA);
  list.addEventListener("click", e => { const b = e.target.closest("[data-s]"); if (b) changeQty(+b.dataset.i, +b.dataset.s); });
}

import { $ } from "../lib/dom.js";
import { rp } from "../lib/format.js";
import { MENU } from "../data/menu.js";
import { emit } from "../core/bus.js";
import { MIN_ORDER } from "../config.js";

const priceLabel = m => m.v ? m.v.map(x => `${x[0]} ${rp(x[1])}`).join(" · ") : m.b ? rp(m.b) : `Minimal ${rp(MIN_ORDER)}`;

/** kartu menu; klik tombol memicu event "menu:pick" (didengar sheet.js) */
export function initMenu(){
  $("#grid").innerHTML = MENU.map((m, i) =>
    `<article class="card" data-fade="1"><h3>${m.n}</h3><p>${m.d}${priceLabel(m) ? "<br><b>" + priceLabel(m) + "</b>" : ""}</p><button class="pick" type="button" data-i="${i}">${m.v ? "Pilih variasi" : "Pilih topping"}</button></article>`).join("");
  $("#grid").addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (b) emit("menu:pick", +b.dataset.i); });
}

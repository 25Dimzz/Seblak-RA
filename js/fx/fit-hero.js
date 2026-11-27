import { $$ } from "../lib/dom.js";
import { emit } from "../core/bus.js";

function fit(){
  const hs = $$(".hero h1");
  hs.forEach(h => h.style.fontSize = "");
  let k = 1;
  hs.forEach(h => {
    const r = document.createRange(); r.selectNodeContents(h);
    const need = r.getBoundingClientRect().width, room = h.clientWidth;
    if (room && need > room) k = Math.min(k, room / need);
  });
  if (k < 1) hs.forEach(h => h.style.fontSize = parseFloat(getComputedStyle(h).fontSize) * k * .97 + "px");
}

/** judul hero selalu muat di lebar layar (HP kecil / font belum termuat) */
export function initFitHero(){
  fit();
  addEventListener("resize", fit);
  addEventListener("load", fit);
  if (document.fonts){
    document.fonts.ready.then(fit);
    document.fonts.addEventListener("loadingdone", () => { fit(); emit("layout"); });
  }
}

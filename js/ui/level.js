import { $, $$ } from "../lib/dom.js";
import { LEVELS } from "../data/levels.js";
import { state, setLevel } from "../core/state.js";
import { on } from "../core/bus.js";

/** pilihan level pedas */
export function initLevel(){
  const desc = $("#lvdesc");
  $("#pills").innerHTML = LEVELS.map((l, i) => `<button class="pill" type="button" data-l="${i}" aria-pressed="${i === state.lv}">${l[0]}</button>`).join("");
  desc.textContent = LEVELS[state.lv][1];
  $("#pills").addEventListener("click", e => { const b = e.target.closest("[data-l]"); if (b) setLevel(+b.dataset.l); });
  on("level", i => {
    $$(".pill").forEach(p => p.setAttribute("aria-pressed", +p.dataset.l === i));
    if (!window.gsap){ desc.textContent = LEVELS[i][1]; return; }
    gsap.to(desc, { opacity: 0, y: 8, duration: .15, onComplete(){ desc.textContent = LEVELS[i][1]; gsap.to(desc, { opacity: 1, y: 0, duration: .35 }); } });
  });
}

import { $, $$ } from "../lib/dom.js";
import { on } from "../core/bus.js";

let lenis = null;
export const getLenis = () => lenis;

/** smooth scroll (Lenis) + sinkron ScrollTrigger */
export function initScroll(){
  if (window.Lenis){
    lenis = new Lenis({ lerp: .085, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
      const el = $(a.getAttribute("href"));
      if (el){ e.preventDefault(); lenis.scrollTo(el, { duration: 1.4 }); }
    }));
    on("sheet:open", () => lenis.stop());
    on("sheet:close", () => lenis.start());
  }
  const refresh = () => ScrollTrigger.refresh();
  on("layout", refresh);
  addEventListener("load", refresh);
  if (document.fonts) document.fonts.ready.then(refresh);
}

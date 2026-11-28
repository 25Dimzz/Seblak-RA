import { initScroll } from "./scroll.js";
import { initReveal } from "./reveal.js";
import { initMarquee } from "./marquee.js";
import { initBg } from "./bg.js";

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/** semua animasi GSAP + Lenis; aman kalau CDN gagal kemuat (halaman tetap jalan tanpa animasi) */
export function initMotion(){
  if (!window.gsap || !window.ScrollTrigger || reduceMotion) return;
  gsap.registerPlugin(ScrollTrigger);
  initScroll(); initReveal(); initMarquee(); initBg();   // urutan penting: marquee butuh instance Lenis, bg paling akhir
}

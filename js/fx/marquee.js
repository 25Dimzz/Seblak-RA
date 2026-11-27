import { getLenis } from "./scroll.js";

/** tulisan berjalan terus, ngebut saat scroll kencang */
export function initMarquee(){
  const loop = gsap.to("#mq", { xPercent: -50, duration: 26, ease: "none", repeat: -1 });
  const lenis = getLenis();
  if (lenis) lenis.on("scroll", ({ velocity }) => {
    gsap.killTweensOf(loop);
    loop.timeScale(1 + Math.min(Math.abs(velocity), 30) * .6);
    gsap.to(loop, { timeScale: 1, duration: 1.2, ease: "power2.out" });
  });
}

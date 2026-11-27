import { $$ } from "../lib/dom.js";

/** teks dipecah per kata: masuk saat muncul, keluar saat lewat; elemen data-fade naik pelan */
export function initReveal(){
  $$("[data-split]").forEach(el => {
    el.setAttribute("aria-label", el.textContent.trim());
    el.innerHTML = el.textContent.trim().split(/\s+/).map(w =>
      `<span class="w" aria-hidden="true"><span class="i">${w.replace(/&/g, "&amp;")}</span></span>`).join(" ");
    el.style.visibility = "visible";
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 90%", end: "bottom 8%", toggleActions: "play reverse play reverse" }
    }).from(el.querySelectorAll(".i"), { yPercent: 118, rotate: 5, duration: 1, ease: "expo.out", stagger: .06 });
    if (el.dataset.hero) tl.timeScale(.9);
  });

  gsap.utils.toArray("[data-fade]").forEach(el => {
    gsap.set(el, { visibility: "visible" });
    gsap.from(el, { opacity: 0, y: 36, duration: .9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 92%", end: "bottom 5%", toggleActions: "play reverse play reverse" } });
  });
}

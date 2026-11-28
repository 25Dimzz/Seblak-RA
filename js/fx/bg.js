import { $ } from "../lib/dom.js";

/** dekorasi latar yang hidup: bentuk seblak melayang pelan, bergeser beda kecepatan saat scroll (parallax),
 *  dan muncul/hilang halus saat masuk/keluar layar. Cuma transform + opacity, jadi ringan di HP.
 *  Dipanggil dari motion.js (ikut mati kalau GSAP gagal kemuat atau reduced-motion aktif). */

const SYM = [
  ["chili", `<path d="M58 20C64 16 80 22 86 34C88 60 56 84 12 90C36 74 52 48 58 20Z"/><path d="M60 22C57 13 61 7 71 4L74 10C69 12 67 16 69 24Z" opacity=".6"/>`],
  ["krupuk", `<path fill-rule="evenodd" d="M50 6a44 44 0 1 0 .1 0ZM30 38a4 4 0 1 0 .1 0ZM62 30a3.5 3.5 0 1 0 .1 0ZM66 62a4 4 0 1 0 .1 0ZM38 68a3.5 3.5 0 1 0 .1 0Z"/>`],
  ["leaf", `<path fill-rule="evenodd" d="M50 4C82 28 90 66 50 96C10 66 18 28 50 4ZM49 24C50.5 44 50.5 68 49.5 86C48.5 68 48.5 44 49 24Z"/>`],
  ["bubble", `<g fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"><circle cx="50" cy="50" r="42"/><path d="M28 40A24 24 0 0 1 44 26"/></g>`],
  ["spark", `<path d="M50 2C53 34 66 47 98 50C66 53 53 66 50 98C47 66 34 53 2 50C34 47 47 34 50 2Z"/>`]
];

// k=bentuk (chili, krupuk, leaf, bubble, spark, glow)  x,y=posisi (angka=%, atau CSS seperti "4rem")  s=ukuran (rem)
// o=transparan  r=putaran awal  p=parallax (+ naik, - turun)  c:1=pakai warna ke-2 (--fx2)
// m:"rise"=naik terus lalu memudar (gelembung/percikan)  sm:1=disembunyikan di layar kecil (hemat baterai HP)
const PLAN = {
  ".hero": [
    { k: "glow", x: -10, y: -15, s: 30, o: .35 },
    { k: "glow", x: 58, y: 38, s: 34, o: .2, c: 1, sm: 1 },
    { k: "chili", x: 76, y: 9, s: 7.5, o: .2, r: 25, p: -90, c: 1 },
    { k: "chili", x: 5, y: 12, s: 4, o: .16, r: -40, p: 70, c: 1 },
    { k: "krupuk", x: 52, y: 12, s: 4.5, o: .5, r: -15, p: 110 },
    { k: "krupuk", x: 90, y: 38, s: 3.2, o: .4, r: 10, p: -60, sm: 1 },
    { k: "bubble", x: 30, y: 78, s: 1.6, o: .55, m: "rise" },
    { k: "bubble", x: 84, y: 80, s: 2.2, o: .5, m: "rise" },
    { k: "bubble", x: 62, y: 86, s: 1.1, o: .55, m: "rise", sm: 1 }
  ],
  ".about": [
    { k: "glow", x: 62, y: -25, s: 28, o: .2 },
    { k: "chili", x: 80, y: 6, s: 6, o: .2, r: 200, p: 70 },
    { k: "krupuk", x: 3, y: 72, s: 4.5, o: .22, r: 20, p: -80 },
    { k: "leaf", x: 64, y: 64, s: 5, o: .25, r: -35, p: 90, c: 1 },
    { k: "leaf", x: 22, y: 6, s: 3.6, o: .22, r: 40, p: -60, c: 1, sm: 1 }
  ],
  ".level": [
    { k: "glow", x: 40, y: -30, s: 28, o: .14 },
    { k: "leaf", x: 82, y: 10, s: 5.5, o: .16, r: 15, p: 80 },
    { k: "chili", x: 70, y: 58, s: 5, o: .14, r: -50, p: -70, sm: 1 },
    { k: "krupuk", x: 2, y: 62, s: 4.5, o: .16, r: 30, p: 90 },
    { k: "bubble", x: 90, y: 84, s: 1.8, o: .4, m: "rise" }
  ],
  ".menu": [
    { k: "glow", x: 55, y: "-8rem", s: 34, o: .24 },
    { k: "chili", x: 82, y: "2rem", s: 6, o: .2, r: 20, p: 80 },
    { k: "spark", x: 68, y: "15rem", s: 1.3, o: .7, m: "rise", c: 1 },
    { k: "spark", x: 93, y: "11rem", s: 1.7, o: .6, m: "rise", c: 1 },
    { k: "spark", x: 38, y: "17rem", s: 1, o: .6, m: "rise", c: 1, sm: 1 },
    { k: "glow", x: -10, y: "calc(100% - 22rem)", s: 30, o: .16, sm: 1 },
    { k: "krupuk", x: 90, y: "calc(100% - 9rem)", s: 5, o: .18, r: 10, p: -60 }
  ],
  ".cara": [
    { k: "glow", x: 20, y: -30, s: 26, o: .16 },
    { k: "krupuk", x: 84, y: 6, s: 5, o: .2, r: 15, p: 80 },
    { k: "leaf", x: -2, y: 74, s: 5, o: .22, r: -20, p: -70, c: 1 },
    { k: "chili", x: 80, y: 62, s: 5.5, o: .16, r: 150, p: 90 }
  ],
  ".cta": [
    { k: "glow", x: 28, y: 5, s: 32, o: .3 },
    { k: "chili", x: 5, y: 14, s: 6, o: .18, r: -30, p: 90, c: 1 },
    { k: "chili", x: 84, y: 58, s: 6.5, o: .16, r: 140, p: -80, c: 1 },
    { k: "krupuk", x: 88, y: 8, s: 4.5, o: .45, r: 20, p: 70 },
    { k: "krupuk", x: 8, y: 66, s: 4, o: .4, r: -10, p: -90, sm: 1 },
    { k: "bubble", x: 24, y: 88, s: 1.5, o: .55, m: "rise" },
    { k: "bubble", x: 52, y: 92, s: 1.1, o: .5, m: "rise" },
    { k: "bubble", x: 74, y: 86, s: 2, o: .5, m: "rise", sm: 1 }
  ]
};

const rnd = (a, b) => gsap.utils.random(a, b);
const sign = () => (Math.random() < .5 ? -1 : 1);
const pos = v => (typeof v === "number" ? v + "%" : v);

// .fx = posisi + pemicu scroll, .fe = parallax + masuk/keluar, .fi = gerak melayang (3 lapis supaya tween nggak rebutan properti)
const shape = s => `<span class="fx${s.c ? " c2" : ""}" style="left:${pos(s.x)};top:${pos(s.y)};--s:${s.s}rem;--o:${s.o}"><span class="fe">${
  s.k === "glow" ? `<i class="fi gl"></i>` : `<svg class="fi" viewBox="0 0 100 100"><use href="#fx-${s.k}"/></svg>`}</span></span>`;

/** melayang pelan: x, y, putar jalan sendiri-sendiri dengan durasi beda, jadi gerakannya nggak kelihatan berulang */
function drift(ic, s){
  const a = 12 + s.s * 3, loop = v => gsap.to(ic, { ...v, ease: "sine.inOut", repeat: -1, yoyo: true, paused: true });
  const t = [
    loop({ x: rnd(.55, 1) * a * sign(), duration: rnd(5, 9) }),
    loop({ y: rnd(.55, 1) * a * sign(), duration: rnd(6, 11) }),
    loop({ rotation: rnd(6, 14) * sign(), duration: rnd(7, 12) })
  ];
  t.forEach(l => l.totalTime(rnd(0, 20)));   // fase acak: tiap bentuk mulai dari titik gerak yang beda
  return t;
}

/** naik terus lalu memudar (gelembung kuah / percikan); jarak naik sedikit beda tiap putaran */
function rise(ic, s){
  const d = rnd(8, 13), t0 = rnd(0, d * 2);
  const t = [
    gsap.fromTo(ic, { y: 0, scale: .7 }, { y: () => -innerHeight * rnd(.35, .6), scale: 1.15, duration: d, ease: "none", repeat: -1, repeatRefresh: true, paused: true }),
    gsap.fromTo(ic, { opacity: 0 }, { opacity: s.o, duration: d / 2, ease: "sine.inOut", repeat: -1, yoyo: true, paused: true }),
    gsap.to(ic, { x: rnd(10, 22) * sign(), duration: rnd(2.5, 4), ease: "sine.inOut", repeat: -1, yoyo: true, paused: true })
  ];
  t.forEach(l => l.totalTime(t0));
  return t;
}

function move(fx, s){
  const fe = fx.firstElementChild, loops = (s.m === "rise" ? rise : drift)(fe.firstElementChild, s), r = s.r || 0;
  // masuk: membesar sambil berputar sedikit. Keluar: diputar balik (reverse), jadi mulus dua arah
  const show = gsap.fromTo(fe, { scale: .3, opacity: 0, rotation: r - 28 }, { scale: 1, opacity: 1, rotation: r, duration: 1.5, ease: "power3.out", delay: rnd(0, .45), paused: true });
  show.eventCallback("onReverseComplete", () => { fx.classList.remove("on"); loops.forEach(l => l.pause()); });   // di luar layar: hemat tenaga
  ScrollTrigger.create({ trigger: fx, start: "top 96%", end: "bottom 4%", onToggle: self => {
    if (self.isActive){ fx.classList.add("on"); loops.forEach(l => l.play()); show.play(); } else show.reverse();
  } });
  if (s.p && s.m !== "rise") gsap.fromTo(fe, { yPercent: s.p }, { yPercent: -s.p, ease: "none", scrollTrigger: { trigger: fx, start: "top bottom", end: "bottom top", scrub: .6 } });
}

/** pasang layer dekorasi di tiap section lalu gerakkan */
export function initBg(){
  document.body.insertAdjacentHTML("afterbegin",
    `<svg class="fxs" aria-hidden="true" focusable="false"><defs>${SYM.map(([id, d]) => `<symbol id="fx-${id}" viewBox="0 0 100 100">${d}</symbol>`).join("")}</defs></svg>`);
  const small = matchMedia("(max-width:699px)").matches;
  Object.entries(PLAN).forEach(([sel, all]) => {
    const host = $(sel); if (!host) return;
    const list = all.filter(s => !(s.sm && small));
    const bg = document.createElement("div");
    bg.className = "bg"; bg.setAttribute("aria-hidden", "true");
    bg.innerHTML = list.map(shape).join("");
    host.prepend(bg);
    [...bg.children].forEach((el, i) => move(el, list[i]));
  });
}

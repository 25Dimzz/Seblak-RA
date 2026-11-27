// pintu masuk: panggil init tiap modul. Modul saling ngobrol lewat core/bus.js
import { initPage } from "./ui/page.js";
import { initMenu } from "./ui/menu.js";
import { initLevel } from "./ui/level.js";
import { initSheet } from "./ui/sheet.js";
import { initCart } from "./ui/cart.js";
import { initBar } from "./ui/bar.js";
import { initAntiCopy } from "./fx/anti-copy.js";
import { initFitHero } from "./fx/fit-hero.js";
import { initMotion } from "./fx/motion.js";

// 1) render konten  2) efek  3) animasi (harus terakhir, butuh elemen sudah ada)
initPage(); initMenu(); initLevel(); initSheet(); initCart(); initBar();
initAntiCopy(); initFitHero();
initMotion();

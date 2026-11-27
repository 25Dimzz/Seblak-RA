import { $, $$ } from "../lib/dom.js";
import { ADDRESS } from "../config.js";

/** isi bagian statis: alamat, link Maps, marquee, tahun footer */
export function initPage(){
  // U+2060 (word joiner, tak terlihat) setelah tanda hubung: "Al-Magfiroh" nggak putus di ujung baris. Hanya tampilan; link Maps tetap pakai ADDRESS asli
  const addrView = ADDRESS.replace(/-(?=\S)/g, "-\u2060");
  $$(".addr").forEach(e => e.textContent = addrView);
  $("#map").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ADDRESS);
  $("#mq").innerHTML = Array(8).fill("<span>Seblak pedas</span><span>Seblak RA</span>").join("");
  $("#yr").textContent = "© " + new Date().getFullYear();
}

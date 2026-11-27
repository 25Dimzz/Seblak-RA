import { $, $$ } from "../lib/dom.js";
import { ADDRESS } from "../config.js";

/** isi bagian statis: alamat, link Maps, marquee, tahun footer */
export function initPage(){
  $$(".addr").forEach(e => e.textContent = ADDRESS);
  $("#map").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ADDRESS);
  $("#mq").innerHTML = Array(8).fill("<span>Seblak pedas</span><span>Seblak RA</span>").join("");
  $("#yr").textContent = "© " + new Date().getFullYear();
}

/** teks tidak bisa diblok/dicopy: tahan lama, klik kanan, drag tidak memunculkan menu */
export function initAntiCopy(){
  ["contextmenu", "selectstart", "copy", "cut", "dragstart"].forEach(ev => document.addEventListener(ev, e => e.preventDefault()));
}

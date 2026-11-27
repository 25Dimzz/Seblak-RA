import { $ } from "../lib/dom.js";
import { rp } from "../lib/format.js";
import { MENU } from "../data/menu.js";
import { TOPPINGS } from "../data/toppings.js";
import { addLine } from "../core/cart.js";
import { on, emit } from "../core/bus.js";
import { openWA } from "../services/whatsapp.js";

const dlg = $("#dlg");
let cur = 0, q = 1, tc = [];   // menu terpilih, jumlah porsi, jumlah tiap topping

const picked = () => TOPPINGS.map((t, k) => ({ n: t.n, p: t.p, c: tc[k] })).filter(x => x.c);
const sum = a => a.reduce((s, t) => s + t.p * t.c, 0);
const label = x => `${x.n} x${x.c}`;
const base = () => { const m = MENU[cur], r = $("#vars input:checked"); return m.v ? m.v[r ? +r.value : 0] : [m.n, m.b || 0]; };

function renderPrice(){
  const price = base()[1] + sum(picked());
  $("#qv").textContent = q;
  $("#sp").textContent = rp(price * q);
  $("#add").disabled = $("#addwa").disabled = !price;
}

function openSheet(i){
  cur = i; q = 1; tc = TOPPINGS.map(() => 0);
  const m = MENU[i], hasBase = m.v || m.b;
  $("#dt").textContent = m.n;
  $("#dp").textContent = hasBase ? "Topping tambahan boleh dikosongkan, jumlahnya bisa diatur pakai + dan −. Harga dihitung dari harga menu ditambah topping." : "Pilih topping sesukamu, jumlahnya bisa diatur pakai + dan −. Harga dihitung dari topping yang dipilih.";
  $("#varBox").hidden = !m.v; $("#tl").hidden = !hasBase;
  $("#vars").innerHTML = (m.v || []).map((v, k) =>
    `<label class="tp"><input type="radio" name="var" value="${k}"${k ? "" : " checked"}><span>${v[0]}<em>${rp(v[1])}</em></span></label>`).join("");
  $("#tops").innerHTML = TOPPINGS.map((t, k) =>
    `<label class="tp"><input type="checkbox" value="${k}"><span>${t.n}<em>+${rp(t.p)}</em></span><span class="tq"><button type="button" data-t="${k}" data-d="-1" aria-label="Kurangi ${t.n}">−</button><output>1</output><button type="button" data-t="${k}" data-d="1" aria-label="Tambah ${t.n}">+</button></span></label>`).join("");
  renderPrice(); emit("sheet:open"); dlg.showModal();
}

function addCurrent(){
  const t = picked(), [name, price] = base();
  addLine({ key: `${cur}|${name}|${t.map(label).join(",")}`, n: name, t: t.map(label), u: price + sum(t), q });
  dlg.close();
}

/** popup pilih variasi, topping, jumlah porsi */
export function initSheet(){
  on("menu:pick", openSheet);
  $("#tops").addEventListener("change", e => {
    const k = +e.target.value; tc[k] = e.target.checked ? 1 : 0;
    e.target.closest(".tp").querySelector("output").textContent = 1; renderPrice();
  });
  $("#tops").addEventListener("click", e => {
    if (!e.target.closest(".tq")) return;
    e.preventDefault();
    const b = e.target.closest("[data-d]"); if (!b) return;
    const k = +b.dataset.t, row = b.closest(".tp");
    tc[k] = Math.max(0, tc[k] + +b.dataset.d);
    row.querySelector("input").checked = tc[k] > 0;
    row.querySelector("output").textContent = tc[k] || 1; renderPrice();
  });
  $("#vars").addEventListener("change", renderPrice);
  $("#qm").onclick = () => { q = Math.max(1, q - 1); renderPrice(); };
  $("#qp").onclick = () => { q++; renderPrice(); };
  $("#dx").onclick = () => dlg.close();
  $("#add").onclick = addCurrent;
  $("#addwa").onclick = () => { addCurrent(); openWA(); };
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", () => emit("sheet:close"));
}

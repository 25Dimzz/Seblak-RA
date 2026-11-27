import { state } from "./state.js";
import { emit } from "./bus.js";

export const countItems = () => state.cart.reduce((a, c) => a + c.q, 0);
export const totalPrice = () => state.cart.reduce((a, c) => a + c.q * c.u, 0);

/** line: {key, n, t:[topping], u:harga per porsi, q:jumlah}. Baris dengan key sama digabung */
export function addLine(line){
  const ex = state.cart.find(c => c.key === line.key);
  if (ex) ex.q += line.q; else state.cart.push(line);
  emit("cart");
}

export function changeQty(i, d){
  const c = state.cart[i]; if (!c) return;
  c.q += d;
  if (c.q < 1) state.cart.splice(i, 1);
  emit("cart");
}

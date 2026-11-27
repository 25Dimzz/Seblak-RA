import { emit } from "./bus.js";

// satu-satunya sumber data aplikasi
// cart: [{key, n, t:[topping], u:harga per porsi, q:jumlah}], lv: index level pedas
export const state = { cart: [], lv: 1 };

export function setLevel(i){ state.lv = i; emit("level", i); }

// event bus mini: modul saling "ngobrol" tanpa saling import
// event: menu:pick, cart, level, layout, sheet:open, sheet:close
const handlers = {};
export const on = (ev, fn) => { (handlers[ev] = handlers[ev] || []).push(fn); };
export const emit = (ev, data) => (handlers[ev] || []).forEach(fn => fn(data));

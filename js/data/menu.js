// harga = harga menu (v = variasi [nama, harga], b = harga dasar, kosong = 0) + total topping yang dipilih
/** @type {{n:string, d:string, v?:[string,number][], b?:number}[]} */
export const MENU = [
  {n:"Seblak", d:"Kerupuk, makaroni, telur, sayur. Dasar yang selalu aman."},
  {n:"Soto Ayam", d:"Ada 3 variasi. Bisa tambah topping ceker, sayap, dan topping seblak lainnya.", v:[["Soto ayam",5000],["Soto ceker",8000],["Soto sayap",6000]]},
  {n:"Chili Oil", d:"Bisa tambah topping seperti seblak.", b:8000}
];

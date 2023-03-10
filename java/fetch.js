import { Product } from "./products.js";

const url = "https://online-shop-d741c-default-rtdb.europe-west1.firebasedatabase.app/products.json";

async function fetchProducts() {
  const data = await (await fetch(url)).json();
  return data.map(p => new Product(p));
}

export { fetchProducts };

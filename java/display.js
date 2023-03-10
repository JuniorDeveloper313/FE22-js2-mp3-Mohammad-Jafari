import { displayCartQuantity } from "./cart.js";

async function updateStock(cartObj) { 
  for (const element of cartObj.getProducts()) {
    const product = element.product;
    const amount = element.quantity;
    const url = `https://online-shop-d741c-default-rtdb.europe-west1.firebasedatabase.app/products/${product.getId()-1}.json`;

    const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' }});
    const data = await response.json();
    const currentStock = data.instock;
    const resultStock = currentStock - amount;
    if (resultStock < 0) return console.error(`WE ARE OUT OF STOCK!!! for this product: ${product.getId()-1}`); //guardclause för för lite stock
    const options = { method: 'PATCH', body: JSON.stringify({ instock: resultStock }), headers: { 'Content-Type': 'application/json' }};
    const response2 = await fetch(url, options);
    const data2 = await response2.json();
  }
}

function displayProducts(products, cart) {
  const productsContainer = document.querySelector("#products");
  for (const product of products) {
    const article = document.createElement('article');
    article.id = `article-${product.getId()}`;
    article.className = 'products';
    article.innerHTML = `
      <img src="${product.getImg()}">
      <h1>${product.getName()}</h1>
      <p>${product.getPrice()}$</p>
      <input type="number" value="0" id="amount-${product.getId()}" min="0" max="${product.getStock()}">
      <button id="product-${product.getId()}">Add to Cart</button>
    `;
    productsContainer.append(article);
    article.querySelector(`#product-${product.getId()}`).addEventListener('click', () => {
      const amount = parseInt(article.querySelector(`#amount-${product.getId()}`).value);
      cart.addProducts(amount, product);
      product.removeStock(amount);
      article.querySelector(`#amount-${product.getId()}`).value = 0;
      article.querySelector(`#amount-${product.getId()}`).max = product.getStock();
      displayCartQuantity(cart);
    });
  }
}

export { displayProducts, updateStock };

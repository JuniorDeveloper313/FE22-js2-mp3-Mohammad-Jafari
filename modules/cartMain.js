import { Cart } from "./shoppingcart.js";

const cart = new Cart();
cart.setProducts(JSON.parse(localStorage.getItem("cart")));

// Display cart quantity
const cartButton = document.querySelector("#cart button");
const cartQuantity = cart.getProducts().reduce((acc, product) => acc + product.quantity, 0);
let sumBtn = cartButton.innerText = `Cart: ${cartQuantity}`;

// Update cart and save to local storage when cart button is clicked
document.querySelector("#cartbtn").addEventListener("click", () => {
    localStorage.setItem("cart", JSON.stringify(cart.getProducts()));
    console.log(JSON.parse(localStorage.getItem("cart")));
    emptyAll();
    window.location.href = "./html/cart.html";
});

// Display cart products
const cartProductsContainer = document.querySelector("#cart-products");
cart.getProducts().forEach(product => {
    const article = document.createElement("article");
    const h3 = document.createElement("h3");
    const input = document.createElement("input");
    const removeBtn = document.createElement("button");

    article.className = "cart-products";
    h3.innerText = `${product.quantity} x ${product.productName} x ${product.productprice * product.quantity}`;
    input.type = "number";
    input.value = 0;
    input.min = 0;
    input.max = product.quantity;
    removeBtn.classList.add("removeBtn")
    removeBtn.innerText = "Remove";

    article.append(h3, input, removeBtn);
    cartProductsContainer.append(article);

    removeBtn.addEventListener("click", () => {
        if (product.quantity > 0) product.quantity -= input.value;
        h3.innerText = `${product.quantity} x ${product.productName} x  ${product.productprice * product.quantity}`;
        input.max = product.quantity;
        input.value = 0;
        cart.removeProduct(input.value, product.product,);
        
        const cartButton = document.getElementById("cartbtn");
        cartButton.innerText= `Cart: ${product.quantity-input.value}`
        console.log(product.quantity)
        
    });
});

// Update stock when buy button is clicked
document.querySelector("#buy").addEventListener("click", () => {
    updateStock(cart).then(() => {
        console.log("DONE");
        localStorage.removeItem("cart");
        window.location.href = "../index.html";
    });
});

// Update stock for each product in the cart
async function updateStock(cart) {
    const products = cart.getProducts();

    for (const product of products) {
        const url = `https://online-shop-d741c-default-rtdb.europe-west1.firebasedatabase.app/products/${product.productId - 1}.json`;
        const response = await fetch(url);
        const data = await response.json();
        const currentStock = data.instock;
        const resultStock = currentStock - product.quantity;

        if (resultStock < 0) {
            return console.error(`WE ARE OUT OF STOCK!!! for product ${product.productId - 1}`);
        }

        const options = {
            method: "PATCH",
            body: JSON.stringify({ instock: resultStock }),
            headers: {
                "Content-Type": "application/json"
            }
        };

        await fetch(url, options);
    }
}

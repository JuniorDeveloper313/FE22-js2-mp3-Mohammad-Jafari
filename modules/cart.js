
export { displayCartQuantity , displayCartProducts, displayTotal };

function displayCartQuantity(cart) {
    const sum = cart.getProducts().reduce((acc, product) => acc + product.quantity, 0);
    let sumBtn = document.querySelector('#cart button').innerText = `Cart: ${sum}`;
    document.querySelector('#cartbtn').addEventListener("click", () => {
        localStorage.setItem("cart", JSON.stringify(cart.getProducts()));
        window.location.href = "html/cart.html";
        
    });
}


function displayCartProducts(cart) {
    const cartProducts = document.querySelector("#cart-products");
    cart.getProducts().forEach(product => {
        const article = Object.assign(document.createElement('article'), { className: 'cart-products' });
        const h3 = Object.assign(document.createElement('h3'), { innerText: `${product.quantity} x ${product.product.getName()}` });
        const input = Object.assign(document.createElement('input'), { type: 'number', value: 0, min: 0, max: product.quantity });
        const removeBtn = Object.assign(document.createElement('button'), { innerText: 'remove' });

        article.append(h3, input, removeBtn);
        cartProducts.append(article);

        removeBtn.addEventListener('click', () => {
            cart.removeProduct(input.value, product.product);
            h3.innerText = `${product.quantity} x ${product.product.getName()}`;
            input.max = product.quantity;
            input.value = 0;
        });
    });
}




async function updateStock(cart) {
    for (const product of cart.getProducts()) {
        const response = await fetch(`https://online-shop-d741c-default-rtdb.europe-west1.firebasedatabase.app/products/${product.product.getId()-1}.json`, {
            method: 'GET',  
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        const currentStock = data.instock;
        const resultStock = currentStock - product.quantity;

        if (resultStock < 0) {
            console.error(`WE ARE OUT OF STOCK!!! for product ID ${product.product.getId()-1}`);
            continue;
        }

        await fetch(`https://online-shop-d741c-default-rtdb.europe-west1.firebasedatabase.app/products/${product.product.getId()-1}.json`, {
            method: 'PATCH',
            body: JSON.stringify({ instock: resultStock }),
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

function displayTotal(cart) {
    updateStock(cart).catch(console.error);
    displayCartQuantity(cart);
}

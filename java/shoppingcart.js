class Cart {
    #products = [];

    getProducts() {
        return this.#products;
        
    }
    setProducts(arrayOjb){
        this.#products = arrayOjb;
    }
    addProduct(obj) {
        this.#products.push(obj)

    }
    addProducts(quantity, productToAdd) {
        let addItem = true;
        //Finns inga produkter lägger vi till produktern
        if (this.#products.length > 0) {
            for (const product of this.#products) {
                if (product.product.getName() === productToAdd.getName()) {
                    addItem = false;
                    product.quantity += quantity;
                    break;
                }
            }
        }

        if (addItem) {
            this.#products.push({
                product: productToAdd,
                productName: productToAdd.getName(),
                productId: productToAdd.getId(),
                quantity: quantity,
                productprice:productToAdd.getPrice()
            });
           
        }
    }

    removeProduct(quantity, productToRemove) {
        for (const product of this.#products) {
            if (product.productName === productToRemove.productName) {
                product.quantity -= quantity;
                break;
            }
        }
    }

}

export { Cart };

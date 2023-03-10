
class Product{
    #name;
    #img;
    #price;
    #stock;
    #id;

    constructor({name, picture, price, instock, id}){
        this.#name = name;
        this.#img = picture;
        this.#price = price;
        this.#stock = instock;
        this.#id = id;
    }
    removeStock(amount){
        if(amount>this.#stock){
            return 'Too much';
        }
        else{
            this.#stock-=amount;
            return this.#stock;
        }
    }
    getStock = () => this.#stock;
    getName = () => this.#name;
    getImg  = () => this.#img;
    getPrice  = () => this.#price;
    getId  = () => this.#id;
}

export {Product};
import{fetchProducts} from "./modules/fetch.js"
import { Cart } from "./modules/shoppingcart.js";
import { displayProducts ,updateStock} from "./modules/display.js";
import { displayCartQuantity,displayCartProducts,displayTotal } from "./modules/cart.js";
import anime from "./node_modules/animejs/lib/anime.es.js";

const cart= new Cart();
let productarray=[];
fetchProducts()
.then(products=>{
    displayProducts(products,cart);
});

document.querySelector('#cart button').addEventListener('click',checkevent);


function checkevent(e){
    document.querySelector('#products').style.display = 'block';
    document.querySelector('#cart button').style.display = 'block';
    document.querySelector('#cart-products').style.display = 'block';
    displayCartQuantity(cart)
    displayCartProducts(cart);
    displayTotal(cart);
     updateStock(cart);

}
function animation(){
    const animeHeading = document.querySelector('#anime-heading');
    
    animeHeading.addEventListener('mouseenter', () => {
      anime({
        targets: '#anime-heading',
        color: '#ff0000',
        duration: 500
      });
    });
    
    animeHeading.addEventListener('mouseleave', () => {
      anime({
        targets: '#anime-heading',
        color: '#000000',
        duration: 500
      });
    })};
    animation();
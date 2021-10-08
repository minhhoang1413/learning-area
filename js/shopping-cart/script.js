const client = contentful.createClient({
    space: '7lws4rqikrb8',
    accessToken: 'KmRW0iQsttYtkc7CxGAL262q_BuitjA7rFvfgAqJbJs'
  })


const cartBtn = document.querySelector(".cart-btn");
const cardOverlay = document.querySelector(".cart-overlay");
const closeBtn = document.querySelector(".close");
const productsCenter = document.querySelector(".products-center");
const cartContent = document.querySelector(".cart-content");
const cartItems = document.querySelector(".cart-items-amount");
const cartTotal = document.querySelector(".cart-total");
const clearCartBtn = document.querySelector(".clear-cart");
const productTemplate = document.querySelector("#product-template");
const cartItemTemplate = document.querySelector("#cart-item-template");
let cart = [];

let bagButtons;


class Products {
    async getProducts() {
        try {
            const response = await client.getEntries({
                content_type: 'comfyHouseProduct'
            })
            let data =  response.items;

            // let response = await fetch("products.json");
            // let jsonResponse = await response.json();
            // let data = jsonResponse.items;
            let products = data.map(item => {
                let id = item.sys.id;
                let title = item.fields.title;
                let price = item.fields.price;
                let image = item.fields.image.fields.file.url;
                return { id, title, price, image };
            });
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}
class UI {
    displayProducts(products) {
        products.forEach(product => {
            let productEle = productTemplate.content.cloneNode(true);
            productEle.querySelector(".product-img").src = product.image;
            productEle.querySelector(".bag-btn").setAttribute("data-id", product.id);
            productEle.querySelector("h3").textContent = product.title;
            productEle.querySelector("p").textContent = "$" + product.price;
            productsCenter.appendChild(productEle);
        });
    }
    getBagButtons() {
        bagButtons = [...document.querySelectorAll(".bag-btn")];
        bagButtons.forEach(button => {
            let id = button.getAttribute("data-id");
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                button.textContent = "In Cart";
                button.disabled = true;
            }
            button.addEventListener("click", ev => {
                ev.target.textContent = "In Cart";
                ev.target.disabled = true;
                //get product from products
                let cartItem = { ...Storage.getProduct(id), amount: 1 };
                //add product to cart
                cart = [...cart, cartItem];
                //save cart in localstorage
                Storage.saveCart(cart);
                //set cart value
                this.setCartValue(cart);
                //display cart item
                this.addCartItem(cartItem);
                // show cart
                this.showCart();
            });
        })
    }
    setCartValue(cart) {
        let values = cart.reduce((values, item) => {
            values.amountTotal += item.amount;
            values.priceTotal += item.price * item.amount;
            return values;
        }, { amountTotal: 0, priceTotal: 0 });
        cartItems.textContent = values.amountTotal;
        cartTotal.textContent = "$" + values.priceTotal.toFixed(2);
        //console.log(cartItems, cartTotal);
    }
    addCartItem(cartItem) {
        let cartItemEle = cartItemTemplate.content.cloneNode(true);
        cartItemEle.querySelector(".cart-item-img").src = cartItem.image;
        cartItemEle.querySelector("h4").textContent = cartItem.title;
        cartItemEle.querySelector("h5").textContent = "$" + cartItem.price;
        cartItemEle.querySelector(".item-amount").textContent = cartItem.amount;
        cartItemEle.querySelector(".remove-item").setAttribute("data-id", cartItem.id);
        cartItemEle.querySelector(".increase-amount").setAttribute("data-id", cartItem.id);
        cartItemEle.querySelector(".decrease-amount").setAttribute("data-id", cartItem.id);
        cartContent.appendChild(cartItemEle);
    }
    showCart() {
        cardOverlay.classList.add("show");
    }
    hideCart(){
        cardOverlay.classList.remove("show");
    }
    setupAPP(){
        cart = Storage.getCart();
        this.setCartValue(cart);
        this.populateCart(cart);
        cartBtn.addEventListener("click", this.showCart);
        closeBtn.addEventListener("click", this.hideCart);
    }
    populateCart(cart){
        cart.forEach( item => this.addCartItem(item));
    }
    cartLogic(){
        clearCartBtn.addEventListener("click", ev => {
            this.clearCart();
        });
        cartContent.addEventListener("click", ev => {
            if (ev.target.classList.contains("remove-item")) {
                this.removeItemCart(ev.target);
            } else if (ev.target.classList.contains("increase-amount")) {
                this.increaseAmount(ev.target);
            } else if (ev.target.classList.contains("decrease-amount")) {
                this.decreaseAmount(ev.target);
            }
        });
    }
    clearCart(){
        let ids = cart.map(item => item.id);
        ids.forEach(id => {
           this.reverseBagButton(id);
        });
        cart = [];
        Storage.saveCart(cart);
        this.setCartValue(cart);
        cartContent.replaceChildren();
    }
    removeItemCart(removeButton){
        let id = removeButton.getAttribute("data-id");      
        cart = cart.filter( item => item.id !== id);
        Storage.saveCart(cart);
        this.setCartValue(cart);
        this.reverseBagButton(id);
        removeButton.parentNode.parentNode.remove();
    }
    reverseBagButton(id){
        const btn = bagButtons.find(button => button.getAttribute("data-id") == id);
        btn.textContent = "ADD TO BAG";
        btn.disabled = false;
    }
    increaseAmount(increaseBtn){
        let id = increaseBtn.getAttribute("data-id");
        let item = cart.find( item => item.id === id);
        item.amount += 1;
        Storage.saveCart(cart);
        this.setCartValue(cart);
        increaseBtn.nextElementSibling.textContent = item.amount;
    }
    decreaseAmount(increaseBtn){
        let id = increaseBtn.getAttribute("data-id");
        let item = cart.find( item => item.id === id);
        if (item.amount === 1) return;
        item.amount -= 1;
        Storage.saveCart(cart);
        this.setCartValue(cart);
        increaseBtn.previousElementSibling.textContent = item.amount;
    }
}
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getCart(){
        return JSON.parse(localStorage.getItem("cart")) || [];
    }
}

const ui = new UI();
const products = new Products();

ui.setupAPP();
products.getProducts().then(products => {
    //console.log(typeof products[0].id);
    ui.displayProducts(products);
    Storage.saveProducts(products);
}).then(() => {
    ui.getBagButtons();
    ui.cartLogic();
});
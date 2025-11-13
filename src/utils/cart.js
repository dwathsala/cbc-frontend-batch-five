export function getCart() {
    let cart = localStorage.getItem("cart");
    if(cart == null) {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart)); //stringify use to convert json or array into string
    }else {
        cart = JSON.parse(cart); //convert string back to json or array
    }
    return cart
}

export function removeFromCart(productId) {
    let cart = getCart();
    
    const newCart = cart.filter((item) => item.productId != productId);

    localStorage.setItem("cart", JSON.stringify(newCart));
    
}

export function addToCart(product, qty) {
    let cart = getCart();
    let index = cart.findIndex((item) => //check whether the product is already in the cart
        {return item.productId == product.productId}); //if there is no such product, it will return -1

    if(index == -1){
        cart[cart.length] = {
            productId: product.productId, 
            name: product.name,
            image: product.images[0],
            price: product.price,
            labelledPrice: product.labelledPrice,
            qty: qty
        };
    }else{
        const newQty = cart[index].qty + qty;
        if(newQty <= 0){
             removeFromCart(product.productId);
             return;
        }else{
            cart[index].qty = newQty;
        };
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function getTotal() {
    let cart = getCart();
    let total = 0;

    for(let i=0; i<cart.length; i++){
        total += cart[i].price * cart[i].qty;
    }
    return total;
}


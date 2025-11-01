export function getCart() {
    let cart = localStorage.getItem("cart");
    if(cart == null) {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart)); //stringify use to convert json or array into string
    }
    return cart
}

export function addToCart(productId, qty) {
    let cart = getCart();
    let index = cart.findIndex((item) => 
        {return item.productId == product.productId});

    if(index == -1){
        cart{cart.length} = {
            productId: product.productId, 
            name: product.name,
            image: product.images[0],
            price: product.price,
            labellPrice: product.labelledPrice,
            qty: qty
        };
    }else{
        const newQty = cart[index].qty + qty;
        if(newQty <= 0){
             //remove item from cart
        }else{
            cart(index).qty = newQty;
        };
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(productId) {
    
}

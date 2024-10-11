let cart = [];

function addToCart(product, price) {
    cart.push({ product, price });
    alert(`${product} has been added to the cart.`);
}

function checkout() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.product} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(div);
    });
}

document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Order placed successfully!');
});

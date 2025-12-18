// Shopping cart page JavaScript for GitHub Pages

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartCount();
});

function loadCart() {
    const cart = getCartWithProducts();
    displayCart(cart);
}

function displayCart(cart) {
    const container = document.getElementById('cart-items-list');
    const subtotalElement = document.getElementById('cart-subtotal');
    const taxElement = document.getElementById('cart-tax');
    const totalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (!container) return;

    if (!cart || cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Browse our products and add items to your cart</p>
                <a href="products.html" class="btn btn-primary">Shop Now</a>
            </div>
        `;
        if (totalElement) totalElement.textContent = formatCurrency(0);
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    // Display cart items
    container.innerHTML = '';
    cart.forEach(item => {
        const cartItem = createCartItemElement(item);
        container.appendChild(cartItem);
    });

    // Update totals
    if (subtotalElement) {
        subtotalElement.textContent = formatCurrency(subtotal);
    }
    if (taxElement) {
        taxElement.textContent = formatCurrency(tax);
    }
    if (totalElement) {
        totalElement.textContent = formatCurrency(total);
    }

    if (checkoutBtn) {
        checkoutBtn.disabled = false;
    }
}

function createCartItemElement(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
        <img src="${item.image_url}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p class="cart-item-price">${formatCurrency(item.price)}</p>
        </div>
        <div class="cart-item-quantity">
            <button class="btn-quantity" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button class="btn-quantity" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
        <div class="cart-item-subtotal">
            <p>${formatCurrency(item.subtotal)}</p>
            <button class="btn-remove" onclick="removeItem(${item.id})">Remove</button>
        </div>
    `;
    return div;
}

function updateQuantity(cartId, newQuantity) {
    if (newQuantity < 1) {
        removeItem(cartId);
        return;
    }

    updateCartItem(cartId, newQuantity);
    loadCart();
    updateCartCount();
    showNotification('Cart updated');
}

function removeItem(cartId) {
    removeFromCart(cartId);
    loadCart();
    updateCartCount();
    showNotification('Item removed from cart');
}

function clearCartHandler() {
    if (confirm('Are you sure you want to clear your cart?')) {
        clearCart();
        loadCart();
        updateCartCount();
        showNotification('Cart cleared');
    }
}

function checkoutHandler() {
    const cart = getCartWithProducts();
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }

    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

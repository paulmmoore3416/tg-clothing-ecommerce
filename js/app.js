// Common functions and utilities for GitHub Pages (static version)

// Update cart count in navigation
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = count;
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = `notification ${type} show`;
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Load featured products on home page (Clothing only)
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
    document.addEventListener('DOMContentLoaded', () => {
        try {
            const allProducts = getAllProducts();
            // Filter to show only Clothing category
            const clothingProducts = allProducts.filter(p => p.category === 'Clothing');
            const container = document.getElementById('featured-products');

            if (container) {
                container.innerHTML = '';

                // Show all clothing products (6 bamboo items)
                clothingProducts.forEach(product => {
                    const card = createProductCard(product);
                    container.appendChild(card);
                });
            }
        } catch (err) {
            console.error('Error loading products:', err);
            const container = document.getElementById('featured-products');
            if (container) {
                container.innerHTML = '<p>Error loading products. Please refresh the page.</p>';
            }
        }
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image_url}" alt="${product.name}" class="product-image" loading="lazy">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">${formatCurrency(product.price)}</p>
            <p class="stock-info">In Stock: ${product.stock}</p>
            <button class="btn btn-primary" onclick="addToCartHandler(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Add product to cart handler
function addToCartHandler(productId) {
    try {
        addToCart(productId, 1);
        showNotification('Product added to cart!');
        updateCartCount();
    } catch (err) {
        console.error('Error adding to cart:', err);
        showNotification('Failed to add to cart', 'error');
    }
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);

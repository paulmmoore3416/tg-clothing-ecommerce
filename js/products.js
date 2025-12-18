// Products page JavaScript for GitHub Pages (static version)
// Uses local products-data.js instead of API calls

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupFilters();
    updateCartCount();
});

let allProducts = [];
let filteredProducts = [];

function loadProducts() {
    try {
        // Get products from static data
        allProducts = getAllProducts();
        filteredProducts = [...allProducts];
        displayProducts(filteredProducts);
    } catch (error) {
        console.error('Error loading products:', error);
        showError('Failed to load products');
    }
}

function displayProducts(products) {
    const container = document.getElementById('products-container');

    if (!products || products.length === 0) {
        container.innerHTML = '<p class="no-products">No products found</p>';
        return;
    }

    container.innerHTML = '';

    products.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const searchInput = document.getElementById('search');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
}

function applyFilters() {
    const category = document.getElementById('category-filter')?.value || '';
    const searchTerm = document.getElementById('search')?.value || '';

    filteredProducts = [...allProducts];

    // Apply category filter
    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // Apply search filter
    if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(lowerSearch) ||
            p.description.toLowerCase().includes(lowerSearch) ||
            p.category.toLowerCase().includes(lowerSearch)
        );
    }

    displayProducts(filteredProducts);
}

function showError(message) {
    const container = document.getElementById('products-container');
    container.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
            <button onclick="loadProducts()">Try Again</button>
        </div>
    `;
}

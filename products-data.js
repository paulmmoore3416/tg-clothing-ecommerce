// Static product data for GitHub Pages deployment
// This file contains all products including the bamboo clothing collection

const PRODUCTS_DATA = [
    {
        id: 1,
        name: 'Laptop Computer',
        description: 'High-performance laptop with 16GB RAM and 512GB SSD',
        price: 999.99,
        stock: 15,
        category: 'Electronics',
        image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=600&fit=crop'
    },
    {
        id: 2,
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with precision tracking',
        price: 29.99,
        stock: 50,
        category: 'Electronics',
        image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=600&fit=crop'
    },
    {
        id: 3,
        name: 'Mechanical Keyboard',
        description: 'RGB backlit mechanical keyboard with blue switches',
        price: 79.99,
        stock: 30,
        category: 'Electronics',
        image_url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&h=600&fit=crop'
    },
    {
        id: 4,
        name: 'USB-C Hub',
        description: '7-in-1 USB-C hub with HDMI, USB 3.0, and card reader',
        price: 39.99,
        stock: 40,
        category: 'Accessories',
        image_url: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=600&fit=crop'
    },
    {
        id: 5,
        name: 'Webcam HD',
        description: '1080p HD webcam with auto-focus and noise reduction',
        price: 59.99,
        stock: 25,
        category: 'Electronics',
        image_url: 'https://images.unsplash.com/photo-1589739900243-c390e1bdb0c4?w=500&h=600&fit=crop'
    },
    {
        id: 6,
        name: 'Monitor 27"',
        description: '27-inch 4K monitor with IPS panel',
        price: 349.99,
        stock: 12,
        category: 'Electronics',
        image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=600&fit=crop'
    },
    {
        id: 7,
        name: 'Laptop Bag',
        description: 'Padded laptop bag with multiple compartments',
        price: 49.99,
        stock: 20,
        category: 'Accessories',
        image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop'
    },
    {
        id: 8,
        name: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness',
        price: 34.99,
        stock: 35,
        category: 'Office',
        image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=600&fit=crop'
    },
    // Bamboo Clothing Collection
    {
        id: 9,
        name: 'Free Fly Bamboo Lightweight Fleece Hoodie - Rust',
        description: 'Ultra-soft bamboo fleece hoodie with a lightweight feel. Perfect for travel with moisture-wicking properties and natural odor resistance. Features a relaxed fit with kangaroo pocket and adjustable hood. Made from sustainable bamboo fabric.',
        price: 98.00,
        stock: 25,
        category: 'Clothing',
        image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    },
    {
        id: 10,
        name: 'Free Fly Bamboo Lightweight Fleece Hoodie - Charcoal',
        description: 'Premium bamboo fleece hoodie in classic charcoal. Breathable, thermoregulating fabric keeps you comfortable in any climate. Ideal for travelers who value comfort and sustainability. Naturally hypoallergenic and silky smooth texture.',
        price: 98.00,
        stock: 30,
        category: 'Clothing',
        image_url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=600&fit=crop'
    },
    {
        id: 11,
        name: 'Bamboo Motion Crew Neck Tee',
        description: 'Lightweight bamboo crew neck t-shirt designed for all-day comfort. Ultra-soft fabric with natural stretch and breathability. Perfect base layer for any adventure. Anti-microbial properties keep you fresh on long journeys.',
        price: 52.00,
        stock: 40,
        category: 'Clothing',
        image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop'
    },
    {
        id: 12,
        name: 'Bamboo Flex Pocket Henley',
        description: 'Versatile bamboo henley with convenient chest pocket. Buttery-soft fabric with 4-way stretch for maximum mobility. Stylish enough for dinner, comfortable enough for travel. Temperature-regulating bamboo keeps you cool or warm.',
        price: 68.00,
        stock: 28,
        category: 'Clothing',
        image_url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=600&fit=crop'
    },
    {
        id: 13,
        name: 'Bamboo Cloud Long Sleeve Shirt',
        description: 'Incredibly soft long sleeve bamboo shirt that feels like a cloud. Wrinkle-resistant and quick-drying for easy packing. Ideal for layering or wearing solo. Sustainable bamboo fabric is gentle on skin and planet.',
        price: 64.00,
        stock: 32,
        category: 'Clothing',
        image_url: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=500&h=600&fit=crop'
    },
    {
        id: 14,
        name: 'Bamboo Breeze Performance Polo',
        description: 'Athletic bamboo polo that transitions from trail to town. Moisture-wicking performance with classic style. UPF sun protection built into the fabric. Naturally anti-odor so you can pack light and wear longer.',
        price: 74.00,
        stock: 22,
        category: 'Clothing',
        image_url: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop'
    }
];

// Simulated localStorage cart for GitHub Pages
let cart = [];

// Helper functions to mimic the backend API
function getAllProducts() {
    return PRODUCTS_DATA;
}

function getProductById(id) {
    return PRODUCTS_DATA.find(p => p.id === id);
}

function getProductsByCategory(category) {
    if (!category) return PRODUCTS_DATA;
    return PRODUCTS_DATA.filter(p => p.category === category);
}

function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return PRODUCTS_DATA.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
}

// Cart management using localStorage
function getCart() {
    const savedCart = localStorage.getItem('tg_clothing_cart');
    return savedCart ? JSON.parse(savedCart) : [];
}

function saveCart(cartData) {
    localStorage.setItem('tg_clothing_cart', JSON.stringify(cartData));
}

function addToCart(productId, quantity = 1) {
    cart = getCart();
    const existingItem = cart.find(item => item.product_id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: Date.now(),
            product_id: productId,
            quantity: quantity,
            created_at: new Date().toISOString()
        });
    }

    saveCart(cart);
    return cart;
}

function updateCartItem(cartId, quantity) {
    cart = getCart();
    const item = cart.find(item => item.id === cartId);
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
    }
    return cart;
}

function removeFromCart(cartId) {
    cart = getCart();
    cart = cart.filter(item => item.id !== cartId);
    saveCart(cart);
    return cart;
}

function getCartWithProducts() {
    cart = getCart();
    return cart.map(item => {
        const product = getProductById(item.product_id);
        return {
            ...item,
            product_id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            image_url: product.image_url,
            subtotal: item.quantity * product.price
        };
    });
}

function clearCart() {
    localStorage.removeItem('tg_clothing_cart');
    cart = [];
}

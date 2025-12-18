// Checkout Page JavaScript with Square Payment Integration

// Square Configuration (Sandbox for demo)
const SQUARE_APPLICATION_ID = 'sandbox-sq0idb-YOUR_APP_ID'; // Replace with your Square App ID
const SQUARE_LOCATION_ID = 'YOUR_LOCATION_ID'; // Replace with your Location ID

let card;
let payments;
let orderData = {};
const SHIPPING_COST = 9.99;

document.addEventListener('DOMContentLoaded', async () => {
    // Load cart summary
    loadOrderSummary();
    updateCartCount();

    // Check if cart is empty
    const cart = getCartWithProducts();
    if (!cart || cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    // Initialize Square Payments (will be set up when reaching payment step)
});

// Load Order Summary
function loadOrderSummary() {
    const cart = getCartWithProducts();
    const container = document.getElementById('summary-items');

    if (!cart || cart.length === 0) {
        return;
    }

    // Display items
    container.innerHTML = '';
    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'summary-item';
        itemEl.innerHTML = `
            <img src="${item.image_url}" alt="${item.name}" class="summary-item-image">
            <div class="summary-item-details">
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="summary-item-price">${formatCurrency(item.subtotal)}</div>
        `;
        container.appendChild(itemEl);
    });

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = subtotal * 0.10;
    const total = subtotal + SHIPPING_COST + tax;

    // Update summary
    document.getElementById('summary-subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('summary-shipping').textContent = formatCurrency(SHIPPING_COST);
    document.getElementById('summary-tax').textContent = formatCurrency(tax);
    document.getElementById('summary-total').textContent = formatCurrency(total);

    // Store for later
    orderData.subtotal = subtotal;
    orderData.shipping = SHIPPING_COST;
    orderData.tax = tax;
    orderData.total = total;
}

// Auth Tab Switching
function showAuthTab(tab) {
    // Hide all forms
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });

    // Remove active from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected form and tab
    document.getElementById(`${tab}-form`).classList.add('active');
    event.target.classList.add('active');
}

// Handle Sign In
function handleSignIn() {
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Simulate sign in (in production, this would call your backend)
    orderData.email = email;
    orderData.customerType = 'existing';

    showNotification('Signed in successfully!');
    setTimeout(() => {
        goToStep('shipping');
    }, 500);
}

// Handle Guest Checkout
function continueAsGuest() {
    const email = document.getElementById('guest-email').value;

    if (!email) {
        showNotification('Please enter your email', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email', 'error');
        return;
    }

    orderData.email = email;
    orderData.customerType = 'guest';

    showNotification('Continuing as guest');
    setTimeout(() => {
        goToStep('shipping');
    }, 500);
}

// Handle Registration
function handleRegister() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;

    if (!name || !email || !password || !confirm) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email', 'error');
        return;
    }

    if (password !== confirm) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }

    // Simulate registration (in production, this would call your backend)
    orderData.name = name;
    orderData.email = email;
    orderData.customerType = 'new';

    showNotification('Account created successfully!');
    setTimeout(() => {
        goToStep('shipping');
    }, 500);
}

// Proceed to Payment
function proceedToPayment() {
    const form = document.getElementById('shipping-form');

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Collect shipping info
    orderData.shipping = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        address: document.getElementById('address').value,
        address2: document.getElementById('address2').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        phone: document.getElementById('phone').value
    };

    goToStep('payment');

    // Initialize Square Payment Form
    initializeSquarePayment();
}

// Initialize Square Payment
async function initializeSquarePayment() {
    try {
        // For demo purposes, we'll show a message about Square integration
        // In production, you would initialize the actual Square Web Payments SDK

        const cardContainer = document.getElementById('card-container');

        // Demo mode - show form fields instead of Square integration
        cardContainer.innerHTML = `
            <div class="demo-payment-notice">
                <p><strong>Demo Mode</strong> - In production, this would use Square's secure payment form.</p>
                <p>To enable Square payments:</p>
                <ol>
                    <li>Sign up for a Square account at <a href="https://squareup.com" target="_blank">squareup.com</a></li>
                    <li>Get your Application ID and Location ID from the Square Developer Dashboard</li>
                    <li>Replace the placeholder values in checkout.js</li>
                </ol>
            </div>
            <div class="form-group">
                <label for="demo-card">Card Number</label>
                <input type="text" id="demo-card" placeholder="4111 1111 1111 1111" maxlength="19">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="demo-expiry">Expiry (MM/YY)</label>
                    <input type="text" id="demo-expiry" placeholder="12/25" maxlength="5">
                </div>
                <div class="form-group">
                    <label for="demo-cvv">CVV</label>
                    <input type="text" id="demo-cvv" placeholder="123" maxlength="4">
                </div>
            </div>
            <div class="form-group">
                <label for="demo-name">Name on Card</label>
                <input type="text" id="demo-name" placeholder="John Doe">
            </div>
        `;

        // For production Square integration, uncomment below:
        /*
        if (!window.Square) {
            throw new Error('Square.js failed to load properly');
        }

        payments = window.Square.payments(SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID);

        card = await payments.card();
        await card.attach('#card-container');

        console.log('Square Payment Form initialized');
        */

    } catch (error) {
        console.error('Payment initialization error:', error);
        showPaymentError('Failed to initialize payment form. Please refresh and try again.');
    }
}

// Handle Payment
async function handlePayment() {
    const button = document.getElementById('card-button');
    const buttonText = document.getElementById('button-text');
    const buttonLoader = document.getElementById('button-loader');

    // Disable button and show loading
    button.disabled = true;
    buttonText.style.display = 'none';
    buttonLoader.style.display = 'inline-block';

    try {
        // Demo mode - validate demo fields
        const cardNumber = document.getElementById('demo-card').value;
        const expiry = document.getElementById('demo-expiry').value;
        const cvv = document.getElementById('demo-cvv').value;
        const name = document.getElementById('demo-name').value;

        if (!cardNumber || !expiry || !cvv || !name) {
            throw new Error('Please fill in all payment fields');
        }

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // For production Square integration, uncomment below:
        /*
        const result = await card.tokenize();

        if (result.status === 'OK') {
            const token = result.token;

            // Send payment to your backend
            const paymentResponse = await processPayment(token);

            if (paymentResponse.success) {
                completeOrder(paymentResponse.orderId);
            } else {
                throw new Error(paymentResponse.message || 'Payment failed');
            }
        } else {
            throw new Error('Card tokenization failed');
        }
        */

        // Demo: Complete the order
        completeOrder('DEMO-' + Date.now());

    } catch (error) {
        console.error('Payment error:', error);
        showPaymentError(error.message || 'Payment failed. Please try again.');

        // Re-enable button
        button.disabled = false;
        buttonText.style.display = 'inline';
        buttonLoader.style.display = 'none';
    }
}

// Process Payment (would call your backend)
async function processPayment(token) {
    // In production, send to your backend:
    /*
    const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: token,
            amount: Math.round(orderData.total * 100), // Convert to cents
            email: orderData.email,
            shipping: orderData.shipping
        })
    });

    return await response.json();
    */

    // Demo
    return { success: true, orderId: 'ORD-' + Date.now() };
}

// Complete Order
function completeOrder(orderId) {
    // Clear cart
    clearCart();

    // Update order details
    document.getElementById('order-number').textContent = orderId;
    document.getElementById('order-email').textContent = orderData.email;

    // Show success section
    goToStep('success');
}

// Navigation between steps
function goToStep(step) {
    // Hide all sections
    document.querySelectorAll('.checkout-section').forEach(section => {
        section.style.display = 'none';
    });

    // Remove active from all steps
    document.querySelectorAll('.step').forEach(s => {
        s.classList.remove('active');
    });

    // Show selected section and activate step
    if (step === 'account') {
        document.getElementById('account-section').style.display = 'block';
        document.querySelector('.step:nth-child(1)').classList.add('active');
    } else if (step === 'shipping') {
        document.getElementById('shipping-section').style.display = 'block';
        document.getElementById('step-shipping').classList.add('active');
    } else if (step === 'payment') {
        document.getElementById('payment-section').style.display = 'block';
        document.getElementById('step-payment').classList.add('active');
    } else if (step === 'success') {
        document.getElementById('success-section').style.display = 'block';
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show Payment Error
function showPaymentError(message) {
    const container = document.getElementById('payment-status-container');
    container.innerHTML = `<div class="payment-error">${message}</div>`;

    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

// Utility: Validate Email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add event listener to payment button
document.addEventListener('DOMContentLoaded', () => {
    const paymentButton = document.getElementById('card-button');
    if (paymentButton) {
        paymentButton.addEventListener('click', handlePayment);
    }
});

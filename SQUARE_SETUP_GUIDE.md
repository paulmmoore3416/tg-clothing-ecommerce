# Square Payment Integration Setup Guide

## Overview

Your checkout page is ready for Square payment integration. Currently running in **demo mode** with simulated payments.

## Current Status

✅ Checkout page created with 3-step process
✅ Sign In / Guest / Register options
✅ Shipping information form
✅ Payment section with Square placeholders
✅ Order confirmation page
✅ Demo mode functional

## To Enable Real Square Payments

### Step 1: Create Square Account

1. **Sign up for Square**
   - Visit: https://squareup.com/signup
   - Choose "Developer" account for testing
   - Complete registration

2. **Access Developer Dashboard**
   - Go to: https://developer.squareup.com/apps
   - Sign in with your Square credentials

### Step 2: Create Application

1. **Create New Application**
   - Click "Create Application" or "New Application"
   - Name it "TG Clothing Co" or similar
   - Save the application

2. **Get Credentials**
   - Click on your application
   - Go to "Credentials" tab
   - You'll see two sets of credentials:
     - **Sandbox** (for testing)
     - **Production** (for live payments)

3. **Copy Sandbox Credentials**
   ```
   Application ID: sandbox-sq0idb-XXXXXXXXXXXXXXXX
   Location ID: LXXXXXXXXXXXXXXX
   ```

### Step 3: Update Your Code

1. **Open checkout.js**
   ```bash
   nano js/checkout.js
   ```

2. **Replace Placeholder Credentials** (lines 4-5)
   ```javascript
   const SQUARE_APPLICATION_ID = 'sandbox-sq0idb-YOUR_ACTUAL_APP_ID';
   const SQUARE_LOCATION_ID = 'YOUR_ACTUAL_LOCATION_ID';
   ```

3. **Uncomment Production Code**

   Find this section (around line 225):
   ```javascript
   // For production Square integration, uncomment below:
   /*
   if (!window.Square) {
       throw new Error('Square.js failed to load properly');
   }

   payments = window.Square.payments(SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID);
   card = await payments.card();
   await card.attach('#card-container');
   */
   ```

   Remove the `/*` and `*/` to uncomment.

4. **Uncomment Payment Processing** (around line 350)
   ```javascript
   // For production Square integration, uncomment below:
   /*
   const result = await card.tokenize();
   ...
   */
   ```

   Remove the `/*` and `*/` to uncomment.

5. **Comment Out Demo Code**

   Comment out or remove the demo payment fields section (lines 210-243).

### Step 4: Set Up Backend Processing

Square payments require server-side processing. You need a backend to:

1. **Receive Payment Token** from frontend
2. **Call Square API** to process payment
3. **Return Result** to frontend

**Option A: Create Backend API**

```python
# Example Flask backend endpoint
@app.route('/api/process-payment', methods=['POST'])
def process_payment():
    data = request.json

    # Initialize Square Client
    client = Client(
        access_token=SQUARE_ACCESS_TOKEN,
        environment='sandbox'  # Use 'production' for live
    )

    # Create payment
    result = client.payments.create_payment(
        body={
            "source_id": data['token'],
            "idempotency_key": str(uuid.uuid4()),
            "amount_money": {
                "amount": data['amount'],  # in cents
                "currency": "USD"
            }
        }
    )

    if result.is_success():
        return jsonify({"success": True, "orderId": result.body['payment']['id']})
    else:
        return jsonify({"success": False, "message": "Payment failed"})
```

**Option B: Use Square's Web Payment Form Only**

For GitHub Pages (no backend), you can:
- Collect payment info
- Use Square's checkout redirect
- Process through Square directly

### Step 5: Testing

1. **Use Square Test Cards**
   ```
   Visa: 4111 1111 1111 1111
   Mastercard: 5105 1051 0510 5100
   Amex: 3782 822463 10005

   Expiry: Any future date (e.g., 12/25)
   CVV: Any 3-4 digits
   ZIP: Any 5 digits
   ```

2. **Test Flow**
   - Add items to cart
   - Proceed to checkout
   - Fill in shipping info
   - Enter test card details
   - Complete payment

3. **Verify in Square Dashboard**
   - Go to Square Developer Dashboard
   - Check "Transactions" or "Payments"
   - See test payment recorded

### Step 6: Go Live (Production)

1. **Switch to Production Credentials**
   ```javascript
   const SQUARE_APPLICATION_ID = 'sq0idp-YOUR_PRODUCTION_APP_ID';
   const SQUARE_LOCATION_ID = 'YOUR_PRODUCTION_LOCATION_ID';
   ```

2. **Update Square SDK URL** in checkout.html
   ```html
   <!-- Change from sandbox to production -->
   <script type="text/javascript" src="https://web.squarecdn.com/v1/square.js"></script>
   ```

3. **Update Backend Environment**
   ```python
   environment='production'  # Changed from 'sandbox'
   ```

4. **Complete Square Account Verification**
   - Provide business information
   - Connect bank account
   - Complete KYC requirements

## Current Demo Mode Features

### What Works Now (Demo Mode):

✅ **Account Step**
- Sign in (simulated)
- Guest checkout
- Create account (simulated)

✅ **Shipping Step**
- Full address form
- Phone number
- Form validation

✅ **Payment Step**
- Demo card input fields
- Card number, expiry, CVV
- Name on card

✅ **Order Confirmation**
- Success message
- Order number
- Email confirmation
- Clear cart

### Demo Test Flow:

1. Add products to cart
2. Go to checkout
3. Choose "Guest Checkout"
4. Enter email: test@example.com
5. Fill shipping info
6. Enter demo card: 4111 1111 1111 1111
7. Enter expiry: 12/25
8. Enter CVV: 123
9. Enter name: John Doe
10. Click "Complete Order"
11. See success page!

## Security Notes

⚠️ **Never expose these in client-side code:**
- Square Access Token
- Square Secret Key
- API credentials

✅ **Safe to use client-side:**
- Application ID
- Location ID

✅ **Always use:**
- HTTPS for production
- Server-side payment processing
- Secure token handling

## Resources

- **Square Developer Docs**: https://developer.squareup.com/docs
- **Web Payments SDK**: https://developer.squareup.com/docs/web-payments/overview
- **Payment API**: https://developer.squareup.com/docs/payments-api/overview
- **Testing Guide**: https://developer.squareup.com/docs/testing/test-values

## Support

For Square-specific issues:
- Square Developer Forums
- Square Support Chat
- Documentation at developer.squareup.com

For integration help:
- Check SQUARE_SETUP_GUIDE.md (this file)
- Review checkout.js comments
- Test in sandbox mode first

## Pricing

Square charges per transaction:
- **2.9% + $0.30** per online transaction
- No monthly fees
- No setup fees

## Next Steps

1. ✅ Demo mode is working
2. ⏳ Sign up for Square account
3. ⏳ Get sandbox credentials
4. ⏳ Update checkout.js
5. ⏳ Set up backend (if using server-side processing)
6. ⏳ Test with Square test cards
7. ⏳ Switch to production credentials

---

**Your checkout page is ready! Just add Square credentials to go live.** 🎉

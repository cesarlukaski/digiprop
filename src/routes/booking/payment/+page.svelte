<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // Payment method
    let paymentMethod = "Credit card";

    // Credit card form data
    let cardNumber = "4111 1111 1111 1111";
    let cardName = "John Smith";
    let expiryDate = "12/25";
    let securityCode = "123";

    // Form validation
    let formValid = false;

    // Order summary data (would come from a store in a real application)
    let orderAddress = "123 Family st SP4KO";
    let rooms = 10;
    let time = "11:30 AM - 12:30 AM";
    let totalAmount = 300;

    // Validate form
    function validateForm() {
        if (paymentMethod === "Credit card") {
            formValid =
                cardNumber.trim().length >= 16 &&
                cardName.trim() !== "" &&
                expiryDate.trim().length >= 5 &&
                securityCode.trim().length >= 3;
        } else {
            // For PayPal, we would redirect to PayPal so form is valid
            formValid = true;
        }
    }

    // Watch for changes to form fields
    $: {
        paymentMethod;
        cardNumber;
        cardName;
        expiryDate;
        securityCode;
        validateForm();
    }

    // Handle form submission
    function handleSubmit() {
        if (!formValid) {
            alert("Please fill in all required payment fields");
            return;
        }

        // In a real app, you would process the payment here
        console.log({
            paymentMethod,
            cardNumber,
            cardName,
            expiryDate,
            securityCode,
        });

        // Redirect to success page instead of showing an alert
        goto("/booking/success");
    }

    // Handle go back
    function goBack() {
        goto("/booking/address-details");
    }

    onMount(() => {
        // Check authentication
        authStore.init();

        if (!authStore.user) {
            goto("/login");
            return;
        }
    });
</script>

<div class="container">
    <header class="header">
        <div class="logo">
            <img src="/logo.png" alt="DigiProp Logo" />
            <span>DIGIPROP</span>
        </div>
        <div class="nav-links">
            <a href="/">Home</a>
            <a href="/topics">Topics</a>
            <a href="/mentors">Mentors</a>
            <a href="/pricing">Pricing</a>
        </div>
        <div class="auth-buttons">
            <button class="sign-in-btn">Sign In</button>
        </div>
    </header>

    <main class="content">
        <div class="payment-container">
            <div class="payment-form">
                <h2>Select payment method</h2>

                <div class="payment-option">
                    <label class="radio-container">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Credit card"
                            bind:group={paymentMethod}
                            checked
                        />
                        <span class="radio-checkmark"></span>
                        <span class="radio-label">Credit card</span>
                        <img
                            src="/credit-card-icon.png"
                            alt="Credit card"
                            class="payment-icon"
                        />
                    </label>

                    {#if paymentMethod === "Credit card"}
                        <div class="card-details">
                            <div class="form-group">
                                <label for="cardNumber">Card Number</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    placeholder="XXXX-XXXX-XXXX-XXXX"
                                    bind:value={cardNumber}
                                    maxlength="19"
                                />
                            </div>

                            <div class="form-group">
                                <label for="cardName">Name of the card</label>
                                <input
                                    type="text"
                                    id="cardName"
                                    placeholder="Name"
                                    bind:value={cardName}
                                />
                            </div>

                            <div class="card-extra-details">
                                <div class="form-group expiry-group">
                                    <label for="expiryDate"
                                        >Expiration date MM/YY</label
                                    >
                                    <input
                                        type="text"
                                        id="expiryDate"
                                        placeholder="MM/YY"
                                        bind:value={expiryDate}
                                        maxlength="5"
                                    />
                                </div>

                                <div class="form-group security-group">
                                    <label for="securityCode"
                                        >Security code</label
                                    >
                                    <div class="select-wrapper">
                                        <input
                                            type="password"
                                            id="securityCode"
                                            placeholder="•••"
                                            bind:value={securityCode}
                                            maxlength="4"
                                        />
                                        <div class="select-arrow"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>

                <div class="payment-option">
                    <label class="radio-container">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Paypal"
                            bind:group={paymentMethod}
                        />
                        <span class="radio-checkmark"></span>
                        <span class="radio-label">Paypal</span>
                        <img
                            src="/paypal-icon.png"
                            alt="PayPal"
                            class="payment-icon"
                        />
                    </label>
                </div>

                <div class="client-login">
                    <p>
                        Are you a client of Tougo? Already? <a
                            href="/login"
                            class="sign-in-link">click on sign in page</a
                        >
                    </p>
                </div>

                <button type="button" class="back-btn" on:click={goBack}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Go back
                </button>
            </div>

            <div class="order-summary">
                <h3>Order Summary</h3>

                <div class="summary-item">
                    <span class="item-label">Address:</span>
                    <span class="item-value">{orderAddress}</span>
                </div>

                <div class="summary-item">
                    <span class="item-label">Std rooms:</span>
                    <span class="item-value">{rooms}</span>
                </div>

                <div class="summary-item">
                    <span class="item-label">Time:</span>
                    <span class="item-value">{time}</span>
                </div>

                <div class="summary-total">
                    <h4>Total</h4>
                    <span class="total-amount">£ {totalAmount}</span>
                </div>

                <button
                    type="button"
                    class="book-now-btn"
                    on:click={handleSubmit}
                    disabled={!formValid}
                >
                    Book now
                </button>
            </div>
        </div>
    </main>
</div>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        font-family: "Arial", sans-serif;
        background-color: white;
    }

    /* Header styles */
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0;
        margin-bottom: 40px;
    }

    .logo {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 18px;
    }

    .logo img {
        width: 36px;
        margin-right: 8px;
    }

    .nav-links {
        display: flex;
        gap: 20px;
    }

    .nav-links a {
        text-decoration: none;
        color: #333;
        font-weight: 500;
        font-size: 14px;
    }

    .sign-in-btn {
        background-color: #000;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
        cursor: pointer;
        font-size: 14px;
    }

    /* Payment page styles */
    .content {
        max-width: 900px;
        margin: 0 auto;
    }

    .payment-container {
        display: flex;
        gap: 30px;
    }

    .payment-form {
        flex: 1;
    }

    .order-summary {
        width: 300px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        padding: 20px;
    }

    h2 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 24px;
        color: #333;
    }

    h3 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #333;
    }

    /* Payment options */
    .payment-option {
        margin-bottom: 24px;
    }

    .radio-container {
        display: flex;
        align-items: center;
        position: relative;
        padding-left: 30px;
        cursor: pointer;
        font-size: 16px;
        user-select: none;
    }

    .radio-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    .radio-checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #fff;
        border: 2px solid #ddd;
        border-radius: 50%;
    }

    .radio-container:hover input ~ .radio-checkmark {
        border-color: #ccc;
    }

    .radio-container input:checked ~ .radio-checkmark {
        background-color: #fff;
        border-color: #000;
    }

    .radio-checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .radio-container input:checked ~ .radio-checkmark:after {
        display: block;
    }

    .radio-container .radio-checkmark:after {
        top: 3px;
        left: 3px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #000;
    }

    .radio-label {
        margin-right: 10px;
    }

    .payment-icon {
        width: 24px;
        height: 24px;
        margin-left: auto;
    }

    /* Card details form */
    .card-details {
        margin-top: 16px;
        padding-left: 30px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        color: #333;
    }

    input[type="text"],
    input[type="password"] {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
    }

    .card-extra-details {
        display: flex;
        gap: 20px;
    }

    .expiry-group,
    .security-group {
        flex: 1;
    }

    .select-wrapper {
        position: relative;
    }

    .select-arrow {
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #333;
        pointer-events: none;
    }

    /* Client login section */
    .client-login {
        margin: 24px 0;
        font-size: 14px;
        color: #666;
    }

    .sign-in-link {
        color: #000;
        text-decoration: none;
        font-weight: 500;
    }

    /* Order summary styles */
    .summary-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        font-size: 14px;
    }

    .item-label {
        color: #666;
    }

    .item-value {
        font-weight: 500;
    }

    .summary-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        padding-top: 16px;
        border-top: 1px solid #eee;
    }

    .summary-total h4 {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
    }

    .total-amount {
        font-size: 18px;
        font-weight: 700;
    }

    /* Buttons */
    .back-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        background: none;
        border: none;
        color: #333;
        font-size: 14px;
        cursor: pointer;
        margin-top: 20px;
    }

    .book-now-btn {
        display: block;
        width: 100%;
        background-color: #000;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 14px 20px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        margin-top: 20px;
    }

    .book-now-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        .payment-container {
            flex-direction: column;
        }

        .order-summary {
            width: 100%;
        }

        .card-extra-details {
            flex-direction: column;
            gap: 0;
        }

        .header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
        }

        .nav-links {
            width: 100%;
            justify-content: space-between;
        }

        .auth-buttons {
            align-self: flex-end;
        }
    }
</style>

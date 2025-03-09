<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // Form data
    let postcode = "";
    let addressLine1 = "";
    let addressLine2 = "";
    let town = "";
    let county = "";
    let country = "";

    // Form validation
    let formValid = false;

    // Validate form
    function validateForm() {
        formValid =
            postcode.trim() !== "" &&
            addressLine1.trim() !== "" &&
            town.trim() !== "";
    }

    // Watch for changes to form fields
    $: {
        postcode;
        addressLine1;
        town;
        validateForm();
    }

    // Handle form submission
    function handleSubmit() {
        if (!formValid) {
            alert("Please fill in all required fields");
            return;
        }

        // In a real app, you would submit this data to your backend
        console.log({
            postcode,
            addressLine1,
            addressLine2,
            town,
            county,
            country,
        });

        // Redirect to payment page instead of completing the booking
        goto("/booking/payment");
    }

    // Handle go back
    function goBack() {
        goto("/booking/contact-details");
    }

    // Handle postcode lookup
    function lookupPostcode() {
        if (!postcode.trim()) {
            alert("Please enter a postcode to look up");
            return;
        }

        // This would typically call an address lookup API
        // For this example, we'll just simulate populating the fields
        addressLine1 = "123 Example Street";
        town = "London";
        county = "Greater London";
        country = "United Kingdom";

        validateForm();
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
        <form class="address-form">
            <h1>Additional Details</h1>

            <div class="form-group postcode-group">
                <label for="postcode">Postcode</label>
                <div class="postcode-input">
                    <input
                        type="text"
                        id="postcode"
                        placeholder="Search postcode"
                        bind:value={postcode}
                    />
                    <button
                        type="button"
                        class="search-btn"
                        on:click={lookupPostcode}
                    >
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
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="form-group">
                <label for="addressLine1">Address Line 1</label>
                <input
                    type="text"
                    id="addressLine1"
                    placeholder="Address 1"
                    bind:value={addressLine1}
                />
            </div>

            <div class="form-group">
                <label for="addressLine2">Address Line 2</label>
                <input
                    type="text"
                    id="addressLine2"
                    placeholder="Address 2"
                    bind:value={addressLine2}
                />
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="town">Town/ City</label>
                    <input
                        type="text"
                        id="town"
                        placeholder="City"
                        bind:value={town}
                    />
                </div>

                <div class="form-group">
                    <label for="county">County</label>
                    <input
                        type="text"
                        id="county"
                        placeholder="County"
                        bind:value={county}
                    />
                </div>
            </div>

            <div class="form-group">
                <label for="country">Country</label>
                <div class="select-wrapper">
                    <select id="country" bind:value={country}>
                        <option value="">Select country</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                        <option value="Spain">Spain</option>
                        <option value="Italy">Italy</option>
                    </select>
                    <div class="select-arrow"></div>
                </div>
            </div>

            <div class="thank-you-message">
                <p>Thank you for book us for the service</p>
            </div>

            <div class="form-actions">
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
                <button
                    type="button"
                    class="next-btn"
                    on:click={handleSubmit}
                    disabled={!formValid}>Next</button
                >
            </div>
        </form>
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

    /* Form styles */
    .content {
        max-width: 600px;
        margin: 0 auto;
    }

    .address-form h1 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 24px;
        color: #333;
    }

    .form-row {
        display: flex;
        gap: 20px;
    }

    .form-group {
        flex: 1;
        margin-bottom: 20px;
    }

    .postcode-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        color: #333;
    }

    input[type="text"] {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
    }

    .postcode-input {
        display: flex;
        gap: 10px;
    }

    .postcode-input input {
        flex: 1;
    }

    .search-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        background-color: #000;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .select-wrapper {
        position: relative;
    }

    select {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        appearance: none;
        background-color: #fff;
        font-size: 14px;
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

    input::placeholder,
    select::placeholder {
        color: #999;
    }

    .thank-you-message {
        margin: 24px 0;
        padding: 16px;
        border: 1px solid #e0f2f1;
        border-radius: 4px;
        background-color: #f0f9f8;
        text-align: center;
    }

    .thank-you-message p {
        color: #00897b;
        margin: 0;
        font-size: 14px;
    }

    .form-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
    }

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
    }

    .next-btn {
        background-color: #000;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
    }

    .next-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        .form-row {
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

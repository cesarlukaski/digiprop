<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // Form data
    let fullName = "";
    let email = "";
    let phone = "";
    let referrerCode = "";

    // Form validation
    let formValid = false;

    // Validate form
    function validateForm() {
        formValid =
            fullName.trim() !== "" &&
            email.trim() !== "" &&
            phone.trim() !== "";
    }

    // Watch for changes to form fields
    $: {
        fullName;
        email;
        phone;
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
            fullName,
            email,
            phone,
            referrerCode,
        });

        // Instead of going to available projects, redirect to address details page
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
        <form class="contact-form">
            <h1>Please Complete Your Contact Details</h1>

            <div class="form-group">
                <label for="fullName">Full name*</label>
                <input
                    type="text"
                    id="fullName"
                    placeholder="Full name"
                    bind:value={fullName}
                    required
                />
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="email">Email*</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="hello@gmail.com"
                        bind:value={email}
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="phone">Phone*</label>
                    <input
                        type="tel"
                        id="phone"
                        placeholder="Add your phone number"
                        bind:value={phone}
                        required
                    />
                </div>
            </div>

            <div class="form-group">
                <label for="referrerCode">Referrer code</label>
                <input
                    type="text"
                    id="referrerCode"
                    placeholder="Add code here"
                    bind:value={referrerCode}
                />
            </div>

            <div class="form-actions">
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

    .contact-form h1 {
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

    label {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        color: #333;
    }

    input[type="text"],
    input[type="email"],
    input[type="tel"] {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
    }

    input::placeholder {
        color: #999;
    }

    .form-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 24px;
    }

    .next-btn {
        background-color: #000;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
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

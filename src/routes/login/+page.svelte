<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { api, authStore } from "$lib/api";

    // Form state
    let email = "";
    let password = "";
    let loading = false;
    let error = "";
    let showPassword = false;

    // Check if already logged in
    onMount(() => {
        authStore.init();
        if (authStore.user) {
            goto("/properties");
        }
    });

    // Handle login form submission
    async function handleLogin() {
        if (!email || !password) {
            error = "Please enter both email and password";
            return;
        }

        loading = true;
        error = "";

        try {
            await api.login(email, password);
            goto("/properties");
        } catch (err: unknown) {
            error =
                err instanceof Error
                    ? err.message
                    : "Login failed. Please check your credentials.";
            loading = false;
        }
    }

    // Toggle password visibility
    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }

    // Handle social login
    function handleSocialLogin(provider: string) {
        // In a real app, this would redirect to the OAuth flow
        alert(`Login with ${provider} would happen here`);
    }

    // Navigate to register page
    function goToRegister() {
        goto("/register");
    }

    // Handle forgot password
    function handleForgotPassword() {
        goto("/forgot-password");
    }
</script>

<div class="login-container">
    <div class="login-form">
        <div class="logo">
            <img src="/digiprop-logo.svg" alt="DigiProp Logo" />
            <span>Digiprop</span>
        </div>

        <h1>Welcome back</h1>
        <p class="subtitle">Login to your account</p>

        {#if error}
            <div class="error-message">
                {error}
            </div>
        {/if}

        <!-- Login form -->
        <form on:submit|preventDefault={handleLogin}>
            <!-- Email input -->
            <div class="form-group">
                <input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    bind:value={email}
                    required
                />
            </div>

            <!-- Password input -->
            <div class="form-group">
                <div class="password-input-container">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        bind:value={password}
                        required
                    />
                    <button
                        type="button"
                        class="password-toggle"
                        on:click={togglePasswordVisibility}
                    >
                        {#if showPassword}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                                ></path>
                                <line x1="1" y1="1" x2="23" y2="23"></line>
                            </svg>
                        {:else}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                ></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        {/if}
                    </button>
                </div>
            </div>

            <!-- Forgot password link -->
            <div class="forgot-password">
                <button
                    type="button"
                    class="text-btn"
                    on:click={handleForgotPassword}
                >
                    Forgot Password ?
                </button>
            </div>

            <!-- Login button -->
            <button type="submit" class="primary-btn" disabled={loading}>
                {#if loading}
                    <span class="loading-icon">⟳</span>
                {/if}
                Log In
            </button>
        </form>

        <!-- OR divider -->
        <div class="divider">
            <div class="divider-line"></div>
            <div class="divider-text">OR</div>
            <div class="divider-line"></div>
        </div>

        <!-- Social login buttons -->
        <div class="social-login">
            <button
                class="social-btn google-btn"
                on:click={() => handleSocialLogin("Google")}
                aria-label="Log in with Google"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        fill="#4285F4"
                        d="M21.8,10.4h-9.8v3.9h5.7c-0.3,2.8-2.6,4.3-5.7,4.3c-3.4,0-6.3-2.8-6.3-6.3c0-3.5,2.9-6.3,6.3-6.3 c1.5,0,3,0.5,4.1,1.6l2.9-2.9C17.3,2.9,14.6,2,11.8,2C6.4,2,2,6.5,2,12c0,5.5,4.4,10,9.8,10c5.1,0,9.4-3.5,9.4-9.5 C21.2,11.7,21.1,11,21.8,10.4z"
                    />
                </svg>
            </button>
            <button
                class="social-btn facebook-btn"
                on:click={() => handleSocialLogin("Facebook")}
                aria-label="Log in with Facebook"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        fill="#1877F2"
                        d="M24,12c0-6.6-5.4-12-12-12S0,5.4,0,12c0,6,4.4,10.9,10.1,11.8v-8.4H7.1v-3.5h3v-2.6c0-3,1.8-4.6,4.5-4.6 c1.3,0,2.7,0.2,2.7,0.2v3h-1.5c-1.5,0-2,0.9-2,1.9v2.1h3.3l-0.5,3.5h-2.8v8.4C19.6,22.9,24,17.9,24,12z"
                    />
                </svg>
            </button>
            <button
                class="social-btn apple-btn"
                on:click={() => handleSocialLogin("Apple")}
                aria-label="Log in with Apple"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        fill="#000000"
                        d="M16.7,22.1c-0.9,0.9-1.9,0.8-2.8,0.3c-1-0.5-1.9-0.5-2.9,0c-1.3,0.6-2,0.4-2.8-0.3C3.6,17.5,4.2,9.4,9.2,9.1 c1.2,0.1,2.1,0.7,2.8,0.7c1.1-0.2,2.1-0.8,3.2-0.8c1.4,0.1,2.4,0.7,3.1,1.6c-2.8,1.7-2.2,5.4,0.4,6.5C18.1,18.8,17.6,21,16.7,22.1z M12.8,9c-0.1-2,1.5-3.7,3.4-3.8C16.5,7.3,14.1,9,12.8,9z"
                    />
                </svg>
            </button>
        </div>

        <!-- Register link -->
        <div class="alt-action">
            <span>Don't have an Account?</span>
            <button class="text-btn" on:click={goToRegister}
                >Create Account</button
            >
        </div>
    </div>
</div>

<style>
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
        background-color: #f8f9fa;
    }

    .login-form {
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        padding: 32px;
        width: 100%;
        max-width: 400px;
    }

    .logo {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
    }

    .logo img {
        height: 32px;
        margin-right: 8px;
    }

    .logo span {
        font-weight: 700;
        font-size: 18px;
        color: #333;
        letter-spacing: 0.5px;
    }

    h1 {
        font-size: 24px;
        font-weight: 600;
        color: #333;
        margin: 0 0 8px 0;
    }

    .subtitle {
        color: #6c757d;
        margin: 0 0 24px 0;
        font-size: 14px;
    }

    .error-message {
        background-color: rgba(239, 68, 68, 0.1);
        color: #ef4444;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 16px;
        font-size: 14px;
    }

    .form-group {
        margin-bottom: 16px;
    }

    input {
        width: 100%;
        padding: 12px 14px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 14px;
        transition: all 0.2s;
    }

    input:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        outline: none;
    }

    .password-input-container {
        position: relative;
    }

    .password-toggle {
        position: absolute;
        right: 14px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        color: #94a3b8;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    }

    .password-toggle:hover {
        color: #64748b;
    }

    .forgot-password {
        text-align: right;
        margin-bottom: 20px;
    }

    .text-btn {
        background: none;
        border: none;
        color: #3b82f6;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        padding: 0;
    }

    .text-btn:hover {
        text-decoration: underline;
        color: #2563eb;
    }

    .primary-btn {
        width: 100%;
        padding: 12px;
        background-color: #000;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .primary-btn:hover {
        background-color: #333;
    }

    .primary-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .loading-icon {
        display: inline-block;
        margin-right: 8px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .divider {
        display: flex;
        align-items: center;
        margin: 24px 0;
    }

    .divider-line {
        flex: 1;
        height: 1px;
        background-color: #e2e8f0;
    }

    .divider-text {
        padding: 0 12px;
        color: #94a3b8;
        font-size: 14px;
        text-transform: uppercase;
        font-size: 12px;
    }

    .social-login {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-bottom: 24px;
    }

    .social-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
        background-color: white;
        cursor: pointer;
        transition: all 0.2s;
        padding: 0;
    }

    .social-btn svg {
        width: 24px;
        height: 24px;
        display: block;
    }

    .social-btn:hover {
        background-color: #f8fafc;
        border-color: #cbd5e1;
    }

    .alt-action {
        text-align: center;
        font-size: 14px;
    }

    .alt-action span {
        color: #64748b;
    }
</style>

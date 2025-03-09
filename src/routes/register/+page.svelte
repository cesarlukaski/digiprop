<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { api, authStore } from "$lib/api";

    let fullName = "";
    let email = "";
    let password = "";
    let confirmPassword = "";
    let userType: "client" | "partner" = "client";
    let loading = false;
    let error = "";
    let showPassword = false;
    let showConfirmPassword = false;

    // Check if already logged in
    onMount(() => {
        authStore.init();
        if (authStore.user) {
            goto("/properties");
        }
    });

    // Switch between client and partner registration
    function setUserType(type: "client" | "partner") {
        userType = type;
    }

    // Toggle password visibility
    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }

    function toggleConfirmPasswordVisibility() {
        showConfirmPassword = !showConfirmPassword;
    }

    // Handle registration form submission
    async function handleRegister() {
        if (!fullName || !email || !password || !confirmPassword) {
            error = "Please fill in all fields";
            return;
        }

        if (password !== confirmPassword) {
            error = "Passwords do not match";
            return;
        }

        loading = true;
        error = "";

        try {
            // Register the user
            const result = await api.register(fullName, email, password, userType);
            
            // Set the authentication
            authStore.setAuth(result.user, result.token);
            
            // Redirect to expertise page
            goto("/register/expertise");
        } catch (err: unknown) {
            error =
                err instanceof Error
                    ? err.message
                    : "Registration failed. Please try again.";
            loading = false;
        }
    }

    // Navigate to login page
    function goToLogin() {
        goto("/login");
    }
</script>

<div class="register-container">
    <div class="register-form">
        <div class="logo">
            <img src="/digiprop-logo.svg" alt="DigiProp Logo" />
            <span>Digiprop</span>
        </div>

        <div class="user-type-toggle">
            <button
                class="toggle-btn"
                class:active={userType === "client"}
                on:click={() => setUserType("client")}
            >
                Register as Client
            </button>
            <button
                class="toggle-btn"
                class:active={userType === "partner"}
                on:click={() => setUserType("partner")}
            >
                Register as Partner
            </button>
        </div>

        <h1>Create your account</h1>

        {#if error}
            <div class="error-message">
                {error}
            </div>
        {/if}

        <form on:submit|preventDefault={handleRegister}>
            <div class="form-group">
                <input
                    id="fullName"
                    type="text"
                    placeholder={userType === "client"
                        ? "Organization name"
                        : "Full name"}
                    bind:value={fullName}
                    required
                />
            </div>

            <div class="form-group">
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    bind:value={email}
                    required
                />
            </div>

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

            <div class="form-group">
                <div class="password-input-container">
                    <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Repeat password"
                        bind:value={confirmPassword}
                        required
                    />
                    <button
                        type="button"
                        class="password-toggle"
                        on:click={toggleConfirmPasswordVisibility}
                    >
                        {#if showConfirmPassword}
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

            <button type="submit" class="register-btn" disabled={loading}>
                {#if loading}
                    <span class="loading-icon">⟳</span>
                {/if}
                Register
            </button>
        </form>

        <div class="login-link">
            <span>I have an Account?</span>
            <button class="text-btn" on:click={goToLogin}>Login</button>
        </div>
    </div>
</div>

<style>
    .register-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
        background-color: #f8f9fa;
    }

    .register-form {
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

    .user-type-toggle {
        display: flex;
        margin-bottom: 24px;
        border-radius: 8px;
        background-color: #f1f5f9;
        padding: 4px;
        width: 100%;
    }

    .toggle-btn {
        flex: 1;
        background: none;
        border: none;
        padding: 10px;
        font-size: 14px;
        cursor: pointer;
        border-radius: 6px;
        transition: all 0.2s;
        color: #64748b;
    }

    .toggle-btn.active {
        background-color: white;
        color: #333;
        font-weight: 500;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    h1 {
        font-size: 24px;
        font-weight: 600;
        color: #333;
        margin: 0 0 24px 0;
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

    .register-btn {
        width: 100%;
        padding: 12px;
        background-color: #000;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        margin-top: 8px;
        transition: background-color 0.2s;
    }

    .register-btn:hover {
        background-color: #333;
    }

    .register-btn:disabled {
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

    .login-link {
        text-align: center;
        font-size: 14px;
        margin-top: 24px;
    }

    .login-link span {
        color: #64748b;
    }

    .login-link button {
        background: none;
        border: none;
        color: #3b82f6;
        font-weight: 500;
        cursor: pointer;
        padding: 0;
        margin-left: 4px;
    }

    .login-link button:hover {
        text-decoration: underline;
        color: #2563eb;
    }
</style>

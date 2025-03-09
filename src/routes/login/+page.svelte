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

<div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4"
>
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <!-- Logo -->
        <div class="flex items-center justify-center mb-8">
            <div class="flex items-center">
                <div class="mr-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-black"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                        />
                    </svg>
                </div>
                <div>
                    <h1 class="text-lg font-bold uppercase">DIGIPROP</h1>
                    <p class="text-xs text-gray-500">
                        Digital Property Solutions
                    </p>
                </div>
            </div>
        </div>

        <!-- Welcome text -->
        <div class="text-center mb-8">
            <h2 class="text-2xl font-medium mb-1">Welcome back</h2>
            <p class="text-gray-600">Login to your account</p>
        </div>

        <!-- Login form -->
        <form on:submit|preventDefault={handleLogin} class="space-y-4">
            {#if error}
                <div class="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                    {error}
                </div>
            {/if}

            <!-- Email input -->
            <div>
                <input
                    type="email"
                    placeholder="Enter email"
                    bind:value={email}
                    class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
            </div>

            <!-- Password input -->
            <div class="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    bind:value={password}
                    class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <button
                    type="button"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    on:click={togglePasswordVisibility}
                >
                    {#if showPassword}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                clip-rule="evenodd"
                            />
                            <path
                                d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                            />
                        </svg>
                    {:else}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                                fill-rule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    {/if}
                </button>
            </div>

            <!-- Forgot password link -->
            <div class="flex justify-end">
                <button
                    type="button"
                    class="text-sm text-gray-600 hover:text-gray-900"
                    on:click={handleForgotPassword}
                >
                    Forgot Password?
                </button>
            </div>

            <!-- Login button -->
            <button
                type="submit"
                class="w-full bg-black text-white p-3 rounded font-medium hover:bg-gray-900 transition-colors"
                disabled={loading}
            >
                {#if loading}
                    <span class="inline-block animate-spin mr-2">⟳</span>
                {/if}
                Log In
            </button>
        </form>

        <!-- OR divider -->
        <div class="flex items-center my-6">
            <div class="flex-grow border-t border-gray-200"></div>
            <div class="px-4 text-sm text-gray-500">OR</div>
            <div class="flex-grow border-t border-gray-200"></div>
        </div>

        <!-- Social login buttons -->
        <div class="flex justify-center space-x-4">
            <button
                class="p-2 border border-gray-300 rounded-full hover:bg-gray-50"
                on:click={() => handleSocialLogin("Google")}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                        fill="#4285F4"
                    />
                </svg>
            </button>
            <button
                class="p-2 border border-gray-300 rounded-full hover:bg-gray-50"
                on:click={() => handleSocialLogin("Facebook")}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"
                        fill="#1877F2"
                    />
                </svg>
            </button>
            <button
                class="p-2 border border-gray-300 rounded-full hover:bg-gray-50"
                on:click={() => handleSocialLogin("Apple")}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                        fill="#000"
                    />
                </svg>
            </button>
        </div>

        <!-- Register link -->
        <div class="mt-8 text-center">
            <span class="text-sm text-gray-600">Don't have an Account?</span>
            <button
                class="text-sm text-blue-600 font-medium ml-1 hover:text-blue-800"
                on:click={goToRegister}
            >
                Create Account
            </button>
        </div>
    </div>
</div>

<style>
    /* Add any custom styles here */
    button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
</style>

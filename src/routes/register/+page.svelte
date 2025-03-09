<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { api, authStore } from "$lib/api";

    let name = "";
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

    // Handle registration form submission
    async function handleRegister() {
        if (!name || !email || !password || !confirmPassword) {
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
            await api.register(name, email, password, userType);
            goto("/register/personal-details");
        } catch (err: unknown) {
            error =
                err instanceof Error
                    ? err.message
                    : "Registration failed. Please try again.";
            loading = false;
        }
    }

    // Toggle password visibility
    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }

    // Toggle confirm password visibility
    function toggleConfirmPasswordVisibility() {
        showConfirmPassword = !showConfirmPassword;
    }

    // Navigate to login page
    function goToLogin() {
        goto("/login");
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
            <h2 class="text-2xl font-medium mb-1">Create an account</h2>
            <p class="text-gray-600">Join DIGIPROP today</p>
        </div>

        <!-- Registration form -->
        <form on:submit|preventDefault={handleRegister} class="space-y-4">
            {#if error}
                <div class="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                    {error}
                </div>
            {/if}

            <!-- Name input -->
            <div>
                <input
                    type="text"
                    placeholder="Full Name"
                    bind:value={name}
                    class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
            </div>

            <!-- Email input -->
            <div>
                <input
                    type="email"
                    placeholder="Email Address"
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

            <!-- Confirm Password input -->
            <div class="relative">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    bind:value={confirmPassword}
                    class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <button
                    type="button"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    on:click={toggleConfirmPasswordVisibility}
                >
                    {#if showConfirmPassword}
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

            <!-- User type selection -->
            <div class="flex space-x-4">
                <label class="flex items-center">
                    <input
                        type="radio"
                        name="userType"
                        value="client"
                        bind:group={userType}
                        class="h-4 w-4 text-black border-gray-300 focus:ring-0"
                    />
                    <span class="ml-2 text-sm text-gray-700">Client</span>
                </label>
                <label class="flex items-center">
                    <input
                        type="radio"
                        name="userType"
                        value="partner"
                        bind:group={userType}
                        class="h-4 w-4 text-black border-gray-300 focus:ring-0"
                    />
                    <span class="ml-2 text-sm text-gray-700">Partner</span>
                </label>
            </div>

            <!-- Register button -->
            <button
                type="submit"
                class="w-full bg-black text-white p-3 rounded font-medium hover:bg-gray-900 transition-colors"
                disabled={loading}
            >
                {#if loading}
                    <span class="inline-block animate-spin mr-2">⟳</span>
                {/if}
                Create Account
            </button>
        </form>

        <!-- Login link -->
        <div class="mt-8 text-center">
            <span class="text-sm text-gray-600">Already have an account?</span>
            <button
                class="text-sm text-blue-600 font-medium ml-1 hover:text-blue-800"
                on:click={goToLogin}
            >
                Log In
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

    /* Custom radio button styling */
    input[type="radio"] {
        appearance: none;
        -webkit-appearance: none;
        height: 16px;
        width: 16px;
        background-color: #fff;
        border: 1px solid #d1d5db;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    input[type="radio"]:checked {
        background-color: #000;
        border-color: #000;
    }

    input[type="radio"]:checked::after {
        content: "";
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: white;
    }

    input[type="radio"]:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
</style>

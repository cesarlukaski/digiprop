<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    let tokenInLocalStorage = false;
    let tokenInAuthStore = false;

    function checkTokens() {
        tokenInLocalStorage = !!localStorage.getItem("digiprop_token");
        tokenInAuthStore = !!authStore.token;
    }

    // Set a test token
    function setTestToken() {
        const testUser = {
            id: "test-123",
            email: "test@example.com",
            name: "Test User",
            userType: "client",
        };

        localStorage.setItem("digiprop_token", "test-token-123");
        localStorage.setItem("digiprop_user", JSON.stringify(testUser));
        authStore.init();
        checkTokens();
    }

    // Clear token
    function clearToken() {
        localStorage.removeItem("digiprop_token");
        localStorage.removeItem("digiprop_user");
        authStore.clearAuth();
        checkTokens();
    }

    onMount(() => {
        checkTokens();
    });
</script>

<div class="test-container">
    <h1>Token Test Page</h1>

    <div class="status-card">
        <h2>Authentication Status</h2>
        <div class="status-item">
            <span class="label">Token in localStorage:</span>
            <span class="value {tokenInLocalStorage ? 'success' : 'error'}">
                {tokenInLocalStorage ? "Yes" : "No"}
            </span>
        </div>
        <div class="status-item">
            <span class="label">Token in authStore:</span>
            <span class="value {tokenInAuthStore ? 'success' : 'error'}">
                {tokenInAuthStore ? "Yes" : "No"}
            </span>
        </div>
    </div>

    <div class="actions">
        <button class="action-btn success" on:click={setTestToken}
            >Set Test Token</button
        >
        <button class="action-btn error" on:click={clearToken}
            >Clear Token</button
        >
        <button class="action-btn" on:click={checkTokens}>Refresh Status</button
        >
    </div>

    <div class="navigation">
        <a href="/" class="nav-link">Home</a>
        <a href="/properties" class="nav-link">Properties</a>
        <a href="/login" class="nav-link">Login</a>
    </div>
</div>

<style>
    .test-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
        font-family: Arial, sans-serif;
    }

    h1 {
        font-size: 1.75rem;
        margin-bottom: 1.5rem;
        color: #333;
    }

    h2 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
        color: #444;
    }

    .status-card {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
        margin-bottom: 2rem;
    }

    .status-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 0;
        border-bottom: 1px solid #eee;
    }

    .status-item:last-child {
        border-bottom: none;
    }

    .label {
        font-weight: 500;
        color: #666;
    }

    .value {
        font-weight: 600;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
    }

    .success {
        background-color: #d1fae5;
        color: #047857;
    }

    .error {
        background-color: #fee2e2;
        color: #b91c1c;
    }

    .actions {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    }

    .action-btn {
        padding: 0.75rem 1.25rem;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: opacity 0.2s;
    }

    .action-btn:hover {
        opacity: 0.9;
    }

    .action-btn.success {
        background-color: #10b981;
        color: white;
    }

    .action-btn.error {
        background-color: #ef4444;
        color: white;
    }

    .navigation {
        display: flex;
        gap: 1rem;
    }

    .nav-link {
        padding: 0.5rem 1rem;
        background-color: #f3f4f6;
        color: #4b5563;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 500;
        transition: background-color 0.2s;
    }

    .nav-link:hover {
        background-color: #e5e7eb;
    }
</style>

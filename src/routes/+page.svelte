<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    onMount(() => {
        authStore.init();

        // Redirect based on authentication status
        if (authStore.user) {
            goto("/properties");
        } else {
            goto("/login");
        }
    });
</script>

<div class="loading-container">
    <div class="logo">
        <h1>DIGIPROP</h1>
        <p>Property Solutions</p>
    </div>

    <div class="spinner"></div>
    <p>Loading application...</p>
</div>

<style>
    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
    }

    .logo {
        text-align: center;
        margin-bottom: 2rem;
    }

    .logo h1 {
        margin: 0;
        color: #0f172a;
        font-size: 2rem;
    }

    .logo p {
        margin: 0;
        color: #64748b;
        font-size: 1rem;
    }

    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: #38bdf8;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    p {
        color: #64748b;
    }
</style>

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

<div>
    <div>
        <h1>DIGIPROP</h1>
        <p>Property Solutions</p>
    </div>

    <div></div>
    <p>Loading application...</p>
</div>

<style>
    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: var(--spacing-xl);
        background-color: var(--neutral-50);
    }

    .logo {
        text-align: center;
        margin-bottom: var(--spacing-xl);
    }

    .logo h1 {
        margin: 0;
        color: var(--primary-dark);
        font-size: 2.5rem;
        font-weight: 700;
    }

    .logo p {
        margin: 0;
        color: var(--neutral-500);
        font-size: 1rem;
    }

    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: var(--primary-blue);
        border-radius: var(--radius-full);
        animation: spin 1s linear infinite;
        margin-bottom: var(--spacing-md);
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    p {
        color: var(--neutral-500);
        font-size: 1rem;
    }
</style>

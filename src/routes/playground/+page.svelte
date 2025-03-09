<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    onMount(() => {
        authStore.init();

        if (!authStore.user) {
            goto("/login");
        }
    });
</script>

<div class="placeholder-container">
    <div class="placeholder-content">
        <div class="placeholder-icon">🎮</div>
        <h1>Playground</h1>
        <p>
            This feature is coming soon! Check back later for exciting new tools
            and features.
        </p>
        <a href="/properties" class="back-button">Back to Properties</a>
    </div>
</div>

<style>
    .placeholder-container {
        padding: 4rem 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80vh;
    }

    .placeholder-content {
        max-width: 600px;
        text-align: center;
        background-color: white;
        padding: 3rem;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .placeholder-icon {
        font-size: 4rem;
        margin-bottom: 1.5rem;
    }

    h1 {
        color: #0f172a;
        margin: 0 0 1rem 0;
    }

    p {
        color: #64748b;
        margin: 0 0 2rem 0;
        font-size: 1.1rem;
        line-height: 1.6;
    }

    .back-button {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background-color: #38bdf8;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 500;
        transition: background-color 0.2s;
    }

    .back-button:hover {
        background-color: #0ea5e9;
    }
</style>

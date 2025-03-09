<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // Check if user is authenticated
    onMount(() => {
        authStore.init();
    });

    // Handle logout
    function handleLogout() {
        authStore.clearAuth();
        goto("/login");
    }

    // Navigation items
    const navItems = [
        { label: "All Properties", path: "/properties", icon: "📊" },
        { label: "Playground", path: "/playground", icon: "🎮" },
        { label: "Diary", path: "/diary", icon: "📝" },
        { label: "Valuation", path: "/valuation", icon: "💰" },
        { label: "Settings", path: "/settings", icon: "⚙️" },
    ];

    $: user = authStore.user;
    $: isAuthenticated = !!user;
    $: currentPath = $page.url.pathname;
</script>

<div class="app-container">
    {#if isAuthenticated}
        <aside class="sidebar">
            <div class="logo">
                <h2>DIGIPROP</h2>
                <p>Property Solutions</p>
            </div>

            <nav>
                <ul>
                    {#each navItems as item}
                        <li class:active={currentPath === item.path}>
                            <a href={item.path}>
                                <span class="icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>

            <div class="user-menu">
                <div class="user-info" on:click={() => goto("/profile")}>
                    <div class="avatar">
                        {#if user?.avatar}
                            <img src={user.avatar} alt={user.name} />
                        {:else}
                            <div class="avatar-placeholder">
                                {user?.name.charAt(0) || "?"}
                            </div>
                        {/if}
                    </div>
                    <div class="user-details">
                        <p class="user-name">{user?.name || "User"}</p>
                        <p class="user-type">{user?.userType || "User"}</p>
                    </div>
                </div>
                <button class="logout-btn" on:click={handleLogout}
                    >Logout</button
                >
            </div>
        </aside>
    {/if}

    <main class="content" class:with-sidebar={isAuthenticated}>
        <slot />
    </main>
</div>

<style>
    .app-container {
        display: flex;
        min-height: 100vh;
    }

    .sidebar {
        width: 250px;
        background-color: #1e293b;
        color: #f8fafc;
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 10;
    }

    .logo {
        padding: 1.5rem;
        border-bottom: 1px solid #334155;
    }

    .logo h2 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 700;
        color: #38bdf8;
    }

    .logo p {
        margin: 0;
        font-size: 0.8rem;
        color: #94a3b8;
    }

    nav {
        flex: 1;
        padding: 1rem 0;
    }

    nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    nav li {
        margin: 0;
    }

    nav li a {
        display: flex;
        align-items: center;
        padding: 0.75rem 1.5rem;
        color: #cbd5e1;
        text-decoration: none;
        transition: all 0.2s;
    }

    nav li a:hover {
        background-color: #334155;
        color: #f8fafc;
    }

    nav li.active a {
        background-color: #0f172a;
        color: #38bdf8;
        border-left: 3px solid #38bdf8;
    }

    .icon {
        margin-right: 0.75rem;
        font-size: 1.2rem;
    }

    .user-menu {
        padding: 1rem 1.5rem;
        border-top: 1px solid #334155;
    }

    .user-info {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 0.5rem;
        transition: background-color 0.2s;
    }

    .user-info:hover {
        background-color: #334155;
    }

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 0.75rem;
    }

    .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .avatar-placeholder {
        width: 100%;
        height: 100%;
        background-color: #38bdf8;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 1.2rem;
    }

    .user-details {
        overflow: hidden;
    }

    .user-name,
    .user-type {
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .user-name {
        font-weight: 500;
    }

    .user-type {
        font-size: 0.8rem;
        color: #94a3b8;
        text-transform: capitalize;
    }

    .logout-btn {
        display: block;
        width: 100%;
        padding: 0.6rem;
        background-color: #475569;
        color: #f8fafc;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: background-color 0.2s;
        font-size: 0.9rem;
    }

    .logout-btn:hover {
        background-color: #64748b;
    }

    .content {
        flex: 1;
        background-color: #f1f5f9;
    }

    .content.with-sidebar {
        margin-left: 250px;
    }

    @media (max-width: 768px) {
        .sidebar {
            width: 80px;
        }

        .logo p,
        .user-details,
        nav li a span:not(.icon) {
            display: none;
        }

        .content.with-sidebar {
            margin-left: 80px;
        }

        .user-menu {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .logout-btn {
            padding: 0.5rem;
            font-size: 0.8rem;
        }
    }
</style>

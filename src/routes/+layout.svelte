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
        { label: "All Property", path: "/properties", icon: "home" },
        { label: "Permission", path: "/permission", icon: "permissions" },
        { label: "Diary", path: "/diary", icon: "diary" },
        { label: "Payment", path: "/payment", icon: "payment" },
        { label: "Settings", path: "/settings", icon: "settings" },
        {
            label: "Dashboard",
            path: "/admin/dashboard",
            icon: "dashboard",
        },
    ];

    $: user = authStore.user;
    $: isAuthenticated = !!user;
    $: currentPath = $page.url.pathname;

    // Function to render the right icon based on name
    function getIcon(iconName: string) {
        switch (iconName) {
            case "home":
                return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
            case "permissions":
                return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19 15V14C19 13.4 18.6 13 18 13H17M5 15V14C5 13.4 5.4 13 6 13H7M7 9H6C5.4 9 5 9.6 5 10V11M17 9H18C18.6 9 19 9.6 19 10V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
            case "diary":
                return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.05 11C3.27151 8.68261 4.51919 6.56128 6.45681 5.16237C8.39443 3.76345 10.8638 3.2204 13.223 3.67033C15.5821 4.12025 17.6395 5.51917 18.8551 7.52635C20.0706 9.53353 20.3347 11.9506 19.5788 14.1561C18.8229 16.3616 17.1295 18.1057 14.9517 18.9196C12.774 19.7334 10.3234 19.54 8.30884 18.3815C6.29432 17.2229 4.90606 15.2088 4.5287 12.9253C4.15135 10.6419 4.82503 8.32606 6.3 6.6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
            case "payment":
                return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="7" y1="15" x2="7" y2="15.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="11" y1="15" x2="13" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
            case "settings":
                return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
            case "chat":
                return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92176 4.44061 8.37485 5.27072 7.03255C6.10083 5.69025 7.28825 4.6056 8.7 3.9C9.87812 3.30493 11.1801 2.99656 12.5 3H13C15.0843 3.11499 17.053 3.99476 18.5291 5.47086C20.0052 6.94696 20.885 8.91566 21 11V11.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
            case "dashboard":
                return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="3" width="7" height="9" rx="1" stroke="currentColor" stroke-width="2" />
                    <rect x="15" y="3" width="7" height="5" rx="1" stroke="currentColor" stroke-width="2" />
                    <rect x="15" y="12" width="7" height="9" rx="1" stroke="currentColor" stroke-width="2" />
                    <rect x="2" y="16" width="7" height="5" rx="1" stroke="currentColor" stroke-width="2" />
                </svg>`;
            default:
                return "";
        }
    }
</script>

<div class="app-container">
    <aside class="sidebar">
        <div class="logo">
            <img src="/digiprop-logo.svg" alt="DigiProp Logo" />
            <span>Digiprop</span>
        </div>

        <nav>
            <ul>
                {#each navItems as item}
                    <li class:active={currentPath.startsWith(item.path)}>
                        <a href={item.path}>
                            <span class="icon">{@html getIcon(item.icon)}</span>
                            <span class="nav-text">{item.label}</span>
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>

        <div class="user-menu">
            <div class="user-actions">
                <!-- Chat Icon -->
                <a href="/chat" class="action-icon" title="Chat">
                    <!-- Directly embed SVG for chat icon to ensure it renders -->
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92176 4.44061 8.37485 5.27072 7.03255C6.10083 5.69025 7.28825 4.6056 8.7 3.9C9.87812 3.30493 11.1801 2.99656 12.5 3H13C15.0843 3.11499 17.053 3.99476 18.5291 5.47086C20.0052 6.94696 20.885 8.91566 21 11V11.5Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </a>
            </div>

            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="user-info" on:click={() => goto("/profile")}>
                <div class="avatar">
                    <!-- Always show placeholder for consistency, since avatar images may be missing -->
                    <div class="avatar-placeholder">
                        {user?.name?.charAt(0) || "A"}
                    </div>
                </div>
                <div class="user-details">
                    <p class="user-name">Aktons</p>
                </div>
            </div>
        </div>
    </aside>
    <div class="content with-sidebar">
        <slot />
    </div>
</div>

<style>
    .app-container {
        min-height: 100vh;
        display: flex;
    }

    .sidebar {
        position: fixed;
        width: 250px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: white;
        color: #6c757d;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        z-index: 10;
        overflow-y: auto;
    }

    .logo {
        display: flex;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #f1f3f5;
    }

    .logo img {
        height: 32px;
        margin-right: 10px;
    }

    .logo span {
        font-weight: 700;
        font-size: 18px;
        color: #333;
    }

    nav {
        flex: 1;
        padding: 20px 0;
    }

    nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    nav li {
        margin: 8px 0;
    }

    nav li a {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        color: #6c757d;
        text-decoration: none;
        transition: all 0.2s;
        border-radius: 8px;
        margin: 0 8px;
    }

    nav li a:hover {
        background-color: #f8f9fa;
        color: #495057;
    }

    nav li.active a {
        background-color: #f1f3f5;
        color: #212529;
        font-weight: 500;
    }

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        margin-right: 12px;
    }

    .nav-text {
        font-size: 14px;
    }

    .user-menu {
        padding: 16px;
        border-top: 1px solid #f1f3f5;
        margin-top: auto;
    }

    .user-actions {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    }

    .action-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6c757d;
        background-color: #f8f9fa;
        text-decoration: none;
        margin-left: auto;
        transition: background-color 0.2s;
    }

    .action-icon:hover {
        background-color: #e9ecef;
        color: #495057;
    }

    .action-icon svg {
        width: 20px;
        height: 20px;
        color: inherit;
    }

    .user-info {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;
        transition: background-color 0.2s;
    }

    .user-info:hover {
        background-color: #f8f9fa;
    }

    .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 12px;
    }

    .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .avatar-placeholder {
        width: 100%;
        height: 100%;
        background-color: #4263eb;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 16px;
    }

    .user-details {
        overflow: hidden;
    }

    .user-name {
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 500;
        color: #212529;
    }

    .content {
        flex: 1;
        background-color: #f8f9fa;
        min-height: 100vh;
    }

    .content.with-sidebar {
        margin-left: 250px;
    }

    @media (max-width: 768px) {
        .sidebar {
            width: 70px;
        }

        .logo span,
        .user-details,
        .nav-text {
            display: none;
        }

        .logo {
            justify-content: center;
            padding: 16px 0;
        }

        .logo img {
            margin-right: 0;
        }

        nav li a {
            justify-content: center;
            padding: 12px;
            margin: 0 4px;
        }

        .icon {
            margin-right: 0;
        }

        .user-info {
            justify-content: center;
        }

        .avatar {
            margin-right: 0;
        }

        .content.with-sidebar {
            margin-left: 70px;
        }

        .user-actions {
            justify-content: center;
        }
    }
</style>

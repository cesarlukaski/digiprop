<script lang="ts">
    import { goto } from "$app/navigation";

    function handleOkClick() {
        // Redirect to the homepage
        goto("/");
    }
</script>

<div class="container">
    <header class="header">
        <div class="logo-section">
            <a href="/" class="logo">
                <img src="/logo.png" alt="DigiProp Logo" class="logo-image" />
                <span class="logo-text">DIGIPROP</span>
                <span class="logo-tagline">Real Estate Photography</span>
            </a>
        </div>

        <nav class="navigation">
            <ul class="nav-list">
                <li><a href="/">Home</a></li>
                <li><a href="/progress">Progress</a></li>
                <li><a href="/package">Package</a></li>
                <li><a href="/products">Products</a></li>
                <li class="dropdown">
                    <a href="/service">Service</a>
                </li>
                <li class="dropdown">
                    <a href="/about-us">About us</a>
                </li>
            </ul>
        </nav>

        <div class="user-profile">
            <a href="/profile" class="profile-link">
                Pathum Bandara
                <div class="profile-avatar">
                    <img src="/avatar.png" alt="Profile" />
                </div>
            </a>
        </div>
    </header>

    <main class="content">
        <div class="success-card">
            <div class="success-message">
                <h1>Thank You!</h1>
                <h2>Your Request Has Been Submitted</h2>

                <p class="message-text">
                    Thank you for booking your service with DigiProp! We
                    appreciate your choice and are excited to assist you. You
                    will soon receive an email from <strong
                        >booking@digiprop.co.uk</strong
                    >
                    detailing the price and confirming your order. If you have any
                    questions in the meantime, feel free to reach out to us at
                    <strong>support@digiprop.co.uk</strong>
                </p>

                <div class="success-icon">
                    <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="12" cy="12" r="10" fill="black" />
                        <path
                            d="M8 12L10.5 14.5L16 9"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>

                <button class="ok-button" on:click={handleOkClick}> OK </button>
            </div>
        </div>
    </main>
</div>

<style>
    .container {
        font-family: "Arial", sans-serif;
        max-width: 1200px;
        margin: 0 auto;
        background-color: white;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0;
        border-bottom: 1px solid #eee;
    }

    .logo {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #000;
    }

    .logo-image {
        height: 40px;
        margin-right: 8px;
    }

    .logo-text {
        font-weight: bold;
        font-size: 18px;
    }

    .logo-tagline {
        font-size: 10px;
        margin-left: 8px;
        color: #666;
    }

    .navigation {
        display: flex;
    }

    .nav-list {
        display: flex;
        list-style: none;
        gap: 24px;
        margin: 0;
        padding: 0;
    }

    .nav-list li a {
        text-decoration: none;
        color: #333;
        font-size: 14px;
        font-weight: 500;
    }

    .user-profile {
        display: flex;
        align-items: center;
    }

    .profile-link {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #333;
        font-size: 14px;
        gap: 8px;
    }

    .profile-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #eee;
    }

    .profile-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px 20px;
    }

    .success-card {
        max-width: 600px;
        width: 100%;
        text-align: center;
    }

    .success-message h1 {
        font-size: 28px;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: #333;
    }

    .success-message h2 {
        font-size: 20px;
        font-weight: 500;
        margin: 0 0 24px 0;
        color: #666;
    }

    .message-text {
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 32px;
        color: #555;
    }

    .success-icon {
        margin: 24px auto;
    }

    .ok-button {
        background-color: #000;
        color: white;
        border: none;
        padding: 12px 48px;
        font-size: 16px;
        font-weight: 500;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .ok-button:hover {
        background-color: #333;
    }

    @media (max-width: 768px) {
        .header {
            flex-direction: column;
            align-items: flex-start;
            padding: 16px;
        }

        .nav-list {
            flex-wrap: wrap;
            gap: 16px;
            margin-top: 16px;
        }

        .user-profile {
            margin-top: 16px;
            align-self: flex-end;
        }

        .success-message h1 {
            font-size: 24px;
        }

        .success-message h2 {
            font-size: 18px;
        }
    }
</style>

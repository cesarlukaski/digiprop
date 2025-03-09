<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    let name = "";
    let email = "";
    let userType = "";
    let loading = false;
    let saveSuccess = false;
    let formError = "";

    // Check if user is authenticated
    onMount(() => {
        authStore.init();

        if (!authStore.user) {
            goto("/login");
            return;
        }

        // Initialize form with user data
        name = authStore.user.name;
        email = authStore.user.email;
        userType = authStore.user.userType;
    });

    function handleSubmit() {
        // Reset messages
        formError = "";
        saveSuccess = false;
        loading = true;

        // Simulate API call
        setTimeout(() => {
            // In a real app, we would update the user profile via API
            // and then update the authStore

            if (authStore.user) {
                authStore.user.name = name;
                // We would normally update more fields here

                // Update local storage
                localStorage.setItem(
                    "digiprop_user",
                    JSON.stringify(authStore.user),
                );

                saveSuccess = true;
            } else {
                formError = "Failed to save profile. Please try again.";
            }

            loading = false;
        }, 800);
    }
</script>

<div class="profile-container">
    <div class="page-header">
        <h1>Your Profile</h1>
        <p>Manage your personal information and account settings</p>
    </div>

    <div class="profile-content">
        <div class="profile-sidebar">
            <div class="user-avatar">
                {#if authStore.user?.avatar}
                    <img src={authStore.user.avatar} alt="User avatar" />
                {:else}
                    <div class="avatar-placeholder">
                        {name ? name.charAt(0).toUpperCase() : "?"}
                    </div>
                {/if}
                <button class="change-avatar-button">Change</button>
            </div>

            <div class="user-info">
                <h3>{name || "User"}</h3>
                <p class="user-type">{userType} Account</p>
            </div>

            <nav class="profile-nav">
                <ul>
                    <li class="active">
                        <a href="/profile">Personal Information</a>
                    </li>
                    <li><a href="/profile/security">Security Settings</a></li>
                    <li><a href="/profile/preferences">Preferences</a></li>
                    <li><a href="/profile/notifications">Notifications</a></li>
                </ul>
            </nav>
        </div>

        <div class="profile-form-container">
            {#if saveSuccess}
                <div class="success-message">Profile updated successfully!</div>
            {/if}

            {#if formError}
                <div class="error-message">
                    {formError}
                </div>
            {/if}

            <form on:submit|preventDefault={handleSubmit}>
                <div class="form-section">
                    <h2>Personal Information</h2>

                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            bind:value={name}
                            placeholder="Your full name"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            bind:value={email}
                            placeholder="your@email.com"
                            required
                            disabled={true}
                        />
                        <p class="field-note">Email cannot be changed</p>
                    </div>

                    <div class="form-group">
                        <label for="account-type">Account Type</label>
                        <input
                            type="text"
                            id="account-type"
                            value={userType}
                            disabled={true}
                        />
                    </div>
                </div>

                <div class="form-section">
                    <h2>Contact Information</h2>

                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            placeholder="Your phone number"
                            disabled={loading}
                        />
                    </div>

                    <div class="form-group">
                        <label for="address">Address</label>
                        <textarea
                            id="address"
                            placeholder="Your address"
                            rows="3"
                            disabled={loading}
                        ></textarea>
                    </div>
                </div>

                <div class="form-actions">
                    <button
                        type="submit"
                        class="save-button"
                        disabled={loading}
                    >
                        {#if loading}
                            Saving...
                        {:else}
                            Save Changes
                        {/if}
                    </button>
                    <button
                        type="button"
                        class="cancel-button"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    .profile-container {
        padding: 2rem;
    }

    .page-header {
        margin-bottom: 2rem;
    }

    .page-header h1 {
        margin: 0 0 0.5rem 0;
        color: #0f172a;
        font-size: 1.75rem;
    }

    .page-header p {
        margin: 0;
        color: #64748b;
    }

    .profile-content {
        display: flex;
        gap: 2rem;
    }

    .profile-sidebar {
        width: 250px;
        flex-shrink: 0;
    }

    .user-avatar {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .avatar-placeholder {
        width: 100px;
        height: 100px;
        background-color: #38bdf8;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
    }

    .user-avatar img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 0.75rem;
    }

    .change-avatar-button {
        background: none;
        border: none;
        color: #38bdf8;
        cursor: pointer;
        font-size: 0.875rem;
    }

    .change-avatar-button:hover {
        text-decoration: underline;
    }

    .user-info {
        text-align: center;
        margin-bottom: 1.5rem;
    }

    .user-info h3 {
        margin: 0 0 0.25rem 0;
        color: #0f172a;
    }

    .user-type {
        margin: 0;
        color: #64748b;
        font-size: 0.875rem;
        text-transform: capitalize;
    }

    .profile-nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        background-color: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .profile-nav li {
        margin: 0;
    }

    .profile-nav a {
        display: block;
        padding: 0.75rem 1rem;
        color: #475569;
        text-decoration: none;
        border-left: 3px solid transparent;
    }

    .profile-nav li.active a {
        background-color: #f1f5f9;
        color: #0f172a;
        border-left-color: #38bdf8;
        font-weight: 500;
    }

    .profile-nav a:hover {
        background-color: #f8fafc;
    }

    .profile-form-container {
        flex: 1;
        background-color: white;
        border-radius: 8px;
        padding: 2rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .form-section {
        margin-bottom: 2rem;
    }

    .form-section h2 {
        font-size: 1.25rem;
        color: #0f172a;
        margin: 0 0 1.5rem 0;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid #e2e8f0;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        color: #475569;
        font-weight: 500;
    }

    input,
    textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #cbd5e1;
        border-radius: 4px;
        font-size: 1rem;
    }

    input:focus,
    textarea:focus {
        border-color: #38bdf8;
        outline: none;
        box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
    }

    input:disabled,
    textarea:disabled {
        background-color: #f1f5f9;
        cursor: not-allowed;
    }

    .field-note {
        margin: 0.25rem 0 0 0;
        font-size: 0.75rem;
        color: #94a3b8;
    }

    .form-actions {
        display: flex;
        gap: 1rem;
    }

    .save-button {
        padding: 0.75rem 1.5rem;
        background-color: #38bdf8;
        color: white;
        border: none;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
    }

    .save-button:hover {
        background-color: #0ea5e9;
    }

    .save-button:disabled {
        background-color: #94a3b8;
        cursor: not-allowed;
    }

    .cancel-button {
        padding: 0.75rem 1.5rem;
        background-color: white;
        color: #475569;
        border: 1px solid #cbd5e1;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
    }

    .cancel-button:hover {
        background-color: #f1f5f9;
    }

    .cancel-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .success-message {
        background-color: #dcfce7;
        color: #166534;
        padding: 0.75rem;
        border-radius: 4px;
        margin-bottom: 1.5rem;
    }

    .error-message {
        background-color: #fee2e2;
        color: #b91c1c;
        padding: 0.75rem;
        border-radius: 4px;
        margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
        .profile-content {
            flex-direction: column;
        }

        .profile-sidebar {
            width: 100%;
            margin-bottom: 1.5rem;
        }

        .user-avatar {
            flex-direction: row;
            align-items: center;
            gap: 1rem;
        }

        .avatar-placeholder,
        .user-avatar img {
            margin-bottom: 0;
        }

        .user-info {
            flex: 1;
            text-align: left;
            margin-bottom: 0;
        }

        .profile-nav ul {
            display: flex;
            overflow-x: auto;
        }

        .profile-nav li {
            flex-shrink: 0;
        }
    }
</style>

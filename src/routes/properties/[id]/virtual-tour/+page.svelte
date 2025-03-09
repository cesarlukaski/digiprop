<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { authStore } from "$lib/api";

    // Property data
    const propertyAddress = "78 Court Street, Tonypandy, CF 28L 0B";
    const propertyId = $page.params.id;

    // Property image for the virtual tour
    const propertyImage =
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80";

    // Virtual tour URL
    const tourUrl = window.location.href;

    // State for fullscreen mode
    let isFullscreen = false;

    // Toggle fullscreen mode
    function toggleFullscreen() {
        isFullscreen = !isFullscreen;

        if (isFullscreen) {
            const elem = document.querySelector(".tour-view");
            if (elem?.requestFullscreen) {
                elem.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    // Copy tour link
    function copyTourLink() {
        navigator.clipboard.writeText(tourUrl);
        alert("Tour link copied to clipboard!");
    }

    // Share tour
    function shareTour() {
        // This would typically open a share dialog
        alert("Share functionality would open here");
    }

    // Return to property details
    function goBack() {
        goto(`/properties/${propertyId}`);
    }

    onMount(() => {
        // Check authentication
        authStore.init();

        if (!authStore.user) {
            goto("/login");
            return;
        }

        // Listen for fullscreen change
        document.addEventListener("fullscreenchange", () => {
            isFullscreen = !!document.fullscreenElement;
        });
    });
</script>

<div class="tour-container">
    <div class="breadcrumb">
        <p>Dashboard / Client</p>
    </div>

    <div class="tour-content">
        <!-- Header with property overview -->
        <div class="page-header">
            <div class="header-title">
                <h1>Virtual Tour</h1>
                <p class="header-address">{propertyAddress}</p>
            </div>
            <div class="header-actions">
                <button class="action-btn secondary-btn" on:click={goBack}
                    >Back</button
                >
                <button class="action-btn copy-btn" on:click={copyTourLink}>
                    Copy Link
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"
                        ></rect>
                        <path
                            d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                        ></path>
                    </svg>
                </button>
                <button class="action-btn primary-btn" on:click={shareTour}>
                    Share
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Virtual tour view -->
        <div class="tour-view-container">
            <div class="tour-view">
                <img src={propertyImage} alt="Property virtual tour" />

                <!-- Tour controls overlay -->
                <div class="tour-controls">
                    <button
                        class="tour-control-btn fullscreen-btn"
                        on:click={toggleFullscreen}
                    >
                        {#if isFullscreen}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"
                                ></path>
                            </svg>
                        {:else}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                                ></path>
                            </svg>
                        {/if}
                    </button>
                    <button class="tour-control-btn play-btn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="10 8 16 12 10 16 10 8"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .tour-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .breadcrumb {
        font-size: 12px;
        color: #6c757d;
        margin-bottom: 20px;
    }

    .tour-content {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #f1f3f5;
    }

    .header-title h1 {
        font-size: 24px;
        font-weight: 600;
        margin: 0 0 4px 0;
    }

    .header-address {
        font-size: 14px;
        color: #6c757d;
        margin: 0;
    }

    .header-actions {
        display: flex;
        gap: 12px;
    }

    .tour-view-container {
        padding: 0;
        position: relative;
    }

    .tour-view {
        width: 100%;
        height: 0;
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
        position: relative;
        overflow: hidden;
    }

    .tour-view img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .tour-controls {
        position: absolute;
        bottom: 20px;
        right: 20px;
        display: flex;
        gap: 10px;
    }

    .tour-control-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.6);
        border: none;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .tour-control-btn:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }

    .play-btn {
        background-color: rgba(66, 99, 235, 0.8);
    }

    .play-btn:hover {
        background-color: rgba(66, 99, 235, 1);
    }

    .action-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
    }

    .primary-btn {
        background-color: #000;
        color: white;
        border: none;
    }

    .primary-btn:hover {
        background-color: #212529;
    }

    .copy-btn {
        background-color: #000;
        color: white;
        border: none;
    }

    .copy-btn:hover {
        background-color: #212529;
    }

    .secondary-btn {
        background-color: white;
        color: #212529;
        border: 1px solid #dee2e6;
    }

    .secondary-btn:hover {
        background-color: #f8f9fa;
    }

    @media (max-width: 768px) {
        .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
        }

        .header-actions {
            width: 100%;
        }
    }
</style>

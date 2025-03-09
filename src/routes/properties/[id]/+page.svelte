<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // Property details interface
    interface PropertyDetail {
        id: string;
        address: string;
        fullAddress: string;
        client: string;
        paymentStatus: string;
        type: string;
        deadline: string;
        virtualTour: {
            available: boolean;
            url: string;
        };
        photos2D: {
            available: boolean;
            count: number;
        };
        floorplans: {
            available: boolean;
        };
        inventoryReport: {
            available: boolean;
        };
    }

    let loading = true;
    let property: PropertyDetail | null = null;
    let error = "";

    // Sample property data for demonstration
    const sampleProperty: PropertyDetail = {
        id: "1",
        address: "78 Court Street",
        fullAddress: "78 Court Street, Tonypandy, CF 28L 0B",
        client: "Aktons",
        paymentStatus: "Completed",
        type: "Inventory",
        deadline: "2024 / 03 / 29",
        virtualTour: {
            available: true,
            url: "https://example.com/tour/1",
        },
        photos2D: {
            available: true,
            count: 20,
        },
        floorplans: {
            available: true,
        },
        inventoryReport: {
            available: true,
        },
    };

    // Get property ID from the URL
    const propertyId = $page.params.id;

    onMount(async () => {
        // Authentication check
        authStore.init();

        if (!authStore.user) {
            goto("/login");
            return;
        }

        try {
            // In a real app, you would fetch the property details from an API
            // const response = await api.getPropertyDetails(propertyId);
            // property = response;

            // For demonstration, use sample data
            property = sampleProperty;
        } catch (err) {
            error = (err as Error).message || "Failed to load property details";
        } finally {
            loading = false;
        }
    });

    function goBack() {
        goto("/properties");
    }

    function viewTour() {
        // Navigate to virtual tour page
        goto(`/properties/${propertyId}/virtual-tour`);
    }

    function copyTourLink() {
        // Copy tour link to clipboard
        if (property?.virtualTour.url) {
            navigator.clipboard.writeText(property.virtualTour.url);
            alert("Tour link copied to clipboard!");
        }
    }

    function viewImages() {
        // Navigate to photos/2D images page
        goto(`/properties/${propertyId}/photos`);
    }

    function downloadImages() {
        // In a real app, this would trigger a download
        alert("Downloading images...");
    }

    function viewFloorplans() {
        // Navigate to floorplans page
        goto(`/properties/${propertyId}/floorplans`);
    }

    function downloadFloorplans() {
        // In a real app, this would trigger a download
        alert("Downloading floorplans...");
    }

    function viewReport() {
        // Navigate to inventory report page
        goto(`/properties/${propertyId}/inventory`);
    }

    function downloadReport() {
        // In a real app, this would trigger a download
        alert("Downloading report...");
    }
</script>

<div class="property-details-container">
    {#if loading}
        <div class="loading-container">
            <div class="loading-spinner"></div>
        </div>
    {:else if error}
        <div class="error-message">
            <p>{error}</p>
        </div>
    {:else if property}
        <div class="breadcrumb">
            <p>Dashboard / Client</p>
        </div>

        <!-- Header with Project Overview -->
        <div class="project-header">
            <div class="project-title">
                <h1>Project Overview</h1>
                <p class="subtitle">View project details and deliverables</p>
            </div>
            <div class="client-info">
                <span class="client-name">{property.client}</span>
                <div class="client-avatar">
                    <div class="avatar-placeholder">
                        {property.client.charAt(0)}
                    </div>
                </div>
            </div>
        </div>

        <!-- Main content sections -->
        <div class="property-content">
        <!-- Property Address Section -->
            <div class="address-section">
                <div class="section-header">
                    <h2>Address</h2>
                    <p>{property.fullAddress}</p>
                </div>
                <button class="view-tour-btn" on:click={viewTour}
                    >View Tour</button
                >
        </div>

        <!-- Property Info Section -->
            <div class="property-info-grid">
                <div class="info-card">
                <h3>Payment status</h3>
                    <p class="status-value">{property.paymentStatus}</p>
            </div>
                <div class="info-card">
                <h3>Type</h3>
                    <p class="type-value">{property.type}</p>
            </div>
                <div class="info-card">
                <h3>Deadline</h3>
                    <p class="deadline-value">{property.deadline}</p>
            </div>
        </div>

            <!-- Deliverables Sections -->
            <div class="deliverables-section">
        <!-- Virtual Tour Section -->
                <div class="deliverable-card">
            <h3>Virtual Tour</h3>
                    <div class="action-buttons">
                        <button
                            class="action-btn preview-btn"
                            on:click={viewTour}>Watch Preview</button
                        >
                        <button
                            class="action-btn copy-btn"
                            on:click={copyTourLink}
                        >
                    Copy
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
                                <rect
                                    x="9"
                                    y="9"
                                    width="13"
                                    height="13"
                                    rx="2"
                                    ry="2"
                                ></rect>
                        <path
                                    d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                ></path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- 2D Photo Enhancement Section -->
                <div class="deliverable-card">
            <h3>2D Photo Enhancement</h3>
                    <div class="action-buttons">
                        <button
                            class="action-btn preview-btn"
                            on:click={viewImages}>View 2D images</button
                        >
                        <button
                            class="action-btn download-btn"
                            on:click={downloadImages}
                        >
                    Download
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
                        <path
                                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                                ></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Floorplans Section -->
                <div class="deliverable-card">
            <h3>Floorplans</h3>
                    <div class="action-buttons">
                        <button
                            class="action-btn preview-btn"
                            on:click={viewFloorplans}>View floorplans</button
                        >
                        <button
                            class="action-btn download-btn"
                            on:click={downloadFloorplans}
                        >
                    Download
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
                        <path
                                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                                ></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Inventory Report Section -->
                <div class="deliverable-card">
            <h3>Inventory Report</h3>
                    <div class="action-buttons">
                        <button
                            class="action-btn preview-btn"
                            on:click={viewReport}>View report</button
                        >
                        <button
                            class="action-btn download-btn"
                            on:click={downloadReport}
                        >
                    Download
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
                        <path
                                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                                ></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </button>
            </div>
        </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .property-details-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .breadcrumb {
        font-size: 12px;
        color: #6c757d;
        margin-bottom: 20px;
    }

    .project-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .project-title h1 {
        font-size: 24px;
        font-weight: 600;
        margin: 0 0 4px 0;
        color: #212529;
    }

    .subtitle {
        font-size: 14px;
        color: #6c757d;
        margin: 0;
    }

    .client-info {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .client-name {
        font-size: 14px;
        font-weight: 500;
    }

    .client-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
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

    .property-content {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .address-section {
        background-color: white;
        border-radius: 8px;
        padding: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .section-header h2 {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: #212529;
    }

    .section-header p {
        font-size: 14px;
        margin: 0;
        color: #495057;
    }

    .view-tour-btn {
        background-color: #000;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .view-tour-btn:hover {
        background-color: #212529;
    }

    .property-info-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }

    .info-card {
        background-color: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .info-card h3 {
        font-size: 16px;
        font-weight: 500;
        margin: 0 0 16px 0;
        color: #212529;
    }

    .info-card p {
        margin: 0;
        font-size: 14px;
        font-weight: 500;
        color: #212529;
    }

    .status-value {
        color: #28a745;
    }

    .deliverables-section {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .deliverable-card {
        background-color: white;
        border-radius: 8px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .deliverable-card h3 {
        font-size: 16px;
        font-weight: 500;
        margin: 0;
        color: #212529;
    }

    .action-buttons {
        display: flex;
        gap: 12px;
    }

    .action-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
    }

    .preview-btn {
        background-color: white;
        color: #212529;
        border: 1px solid #dee2e6;
    }

    .preview-btn:hover {
        background-color: #f8f9fa;
    }

    .download-btn,
    .copy-btn {
        background-color: #000;
        color: white;
        border: none;
    }

    .download-btn:hover,
    .copy-btn:hover {
        background-color: #212529;
    }

    .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
    }

    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .error-message {
        color: #dc3545;
        text-align: center;
        padding: 20px;
    }

    @media (max-width: 768px) {
        .property-info-grid {
            grid-template-columns: 1fr;
        }

        .address-section,
        .deliverable-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
        }

        .action-buttons {
            width: 100%;
        }
    }
</style>

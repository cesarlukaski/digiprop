<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { authStore } from "$lib/api";

    // Property data
    const propertyAddress = "78 Court Street, Tonypandy, CF 28L 0B";
    const propertyId = $page.params.id;

    // Floor plans data
    interface FloorPlan {
        id: string;
        title: string;
        image: string;
        dimensions: string;
    }

    // Simplified floorplans for cleaner UI
    const floorPlans: FloorPlan[] = [
        {
            id: "ground-floor",
            title: "Ground Floor",
            image: "https://images.unsplash.com/photo-1582037928769-383b5a8f6597?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            dimensions: "4.5m x 3.2m",
        },
        {
            id: "first-floor",
            title: "First Floor",
            image: "https://images.unsplash.com/photo-1558442074-3c19857bc1dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            dimensions: "5.8m x 4.2m",
        },
        {
            id: "second-floor",
            title: "Second Floor",
            image: "https://images.unsplash.com/photo-1595526051245-4506e0005bd0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            dimensions: "4.0m x 3.5m",
        },
    ];

    let selectedFloorPlan: FloorPlan | null = null;

    // View floor plan details
    function viewFloorPlan(floorPlan: FloorPlan) {
        selectedFloorPlan = floorPlan;
    }

    // Close floor plan details
    function closeFloorPlanDetails() {
        selectedFloorPlan = null;
    }

    // Download floor plan
    function downloadFloorPlan(floorPlan: FloorPlan) {
        alert(`Downloading floorplan: ${floorPlan.title}`);
    }

    // Download all floor plans
    function downloadAllFloorPlans() {
        alert("Downloading all floor plans");
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
    });
</script>

<div class="floorplans-container">
    <div class="breadcrumb">
        <p>Dashboard / Client</p>
    </div>

    <div class="floorplans-content">
        <!-- Header with property overview -->
        <div class="page-header">
            <div class="header-title">
                <h1>Floorplans</h1>
                <p class="header-address">{propertyAddress}</p>
            </div>
            <div class="header-actions">
                <button class="action-btn secondary-btn" on:click={goBack}
                    >Back</button
                >
                <button
                    class="action-btn primary-btn"
                    on:click={downloadAllFloorPlans}
                >
                    Download All
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
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                        ></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Floor plans display -->
        <div class="floorplans-grid">
            {#each floorPlans as plan}
                <div class="floorplan-card">
                    <div class="floorplan-image">
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                        <img
                            src={plan.image}
                            alt={plan.title}
                            on:click={() => viewFloorPlan(plan)}
                        />
                    </div>
                    <div class="floorplan-details">
                        <h3 class="floorplan-title">{plan.title}</h3>
                        <p class="floorplan-dimensions">{plan.dimensions}</p>
                        <div class="floorplan-actions">
                            <button
                                class="action-btn secondary-btn"
                                on:click={() => viewFloorPlan(plan)}
                            >
                                View Details
                            </button>
                            <button
                                class="action-btn primary-btn"
                                on:click={() => downloadFloorPlan(plan)}
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
                                    <polyline points="7 10 12 15 17 10"
                                    ></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<!-- Floor plan details modal -->
{#if selectedFloorPlan}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal-overlay" on:click={closeFloorPlanDetails}>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div class="modal-content" on:click|stopPropagation>
            <button class="modal-close" on:click={closeFloorPlanDetails}>
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
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            <div class="modal-body">
                <div class="modal-image">
                    <img
                        src={selectedFloorPlan.image}
                        alt={selectedFloorPlan.title}
                    />
                </div>
                <div class="modal-details">
                    <h2 class="modal-title">{selectedFloorPlan.title}</h2>
                    <p class="modal-dimensions">
                        Dimensions: {selectedFloorPlan.dimensions}
                    </p>
                    <div class="modal-actions">
                        <button
                            class="action-btn primary-btn"
                            on:click={() => {
                                if (selectedFloorPlan) {
                                    downloadFloorPlan(selectedFloorPlan);
                                }
                            }}
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
    </div>
{/if}

<style>
    .floorplans-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .breadcrumb {
        font-size: 12px;
        color: #6c757d;
        margin-bottom: 20px;
    }

    .floorplans-content {
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

    .floorplans-grid {
        display: flex;
        padding: 20px;
        gap: 20px;
        justify-content: center;
    }

    .floorplan-card {
        width: 300px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        overflow: hidden;
    }

    .floorplan-image {
        width: 100%;
        height: 200px;
        overflow: hidden;
        cursor: pointer;
    }

    .floorplan-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .floorplan-image img:hover {
        transform: scale(1.05);
    }

    .floorplan-details {
        padding: 16px;
    }

    .floorplan-title {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 4px 0;
    }

    .floorplan-dimensions {
        font-size: 14px;
        color: #6c757d;
        margin: 0 0 16px 0;
    }

    .floorplan-actions {
        display: flex;
        gap: 8px;
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

    .secondary-btn {
        background-color: white;
        color: #212529;
        border: 1px solid #dee2e6;
    }

    .secondary-btn:hover {
        background-color: #f8f9fa;
    }

    /* Modal styles */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        padding: 20px;
    }

    .modal-content {
        background-color: white;
        border-radius: 8px;
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    }

    .modal-close {
        position: absolute;
        top: 16px;
        right: 16px;
        background: none;
        border: none;
        cursor: pointer;
        color: #6c757d;
        z-index: 1;
    }

    .modal-body {
        display: flex;
        flex-direction: column;
    }

    .modal-image {
        width: 100%;
        height: 400px;
        overflow: hidden;
    }

    .modal-image img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .modal-details {
        padding: 20px;
    }

    .modal-title {
        font-size: 24px;
        font-weight: 600;
        margin: 0 0 8px 0;
    }

    .modal-dimensions {
        font-size: 16px;
        color: #6c757d;
        margin: 0 0 20px 0;
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
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

        .floorplans-grid {
            flex-direction: column;
            align-items: center;
        }

        .floorplan-card {
            width: 100%;
            max-width: 400px;
        }

        .modal-body {
            flex-direction: column;
        }

        .modal-image {
            height: 250px;
        }
    }
</style>

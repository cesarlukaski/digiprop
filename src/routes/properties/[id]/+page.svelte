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
        fullAddress: "78 Court Street Tonypandy, CF 2RL 0B",
        client: "Aktons",
        paymentStatus: "Completed",
        type: "Directory",
        deadline: "2024 / 03 / 29",
        virtualTour: {
            available: true,
            url: "https://example.com/tour/1",
        },
        photos2D: {
            available: true,
            count: 12,
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
        // Open virtual tour in a new tab
        if (property?.virtualTour.url) {
            window.open(property.virtualTour.url, "_blank");
        }
    }

    function copyTourLink() {
        // Copy tour link to clipboard
        if (property?.virtualTour.url) {
            navigator.clipboard.writeText(property.virtualTour.url);
            alert("Tour link copied to clipboard!");
        }
    }

    function viewImages() {
        // Navigate to 2D images page
        goto(`/properties/${propertyId}/images`);
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
        // Navigate to report page
        goto(`/properties/${propertyId}/report`);
    }

    function downloadReport() {
        // In a real app, this would trigger a download
        alert("Downloading report...");
    }
</script>

<div class="p-6 bg-white">
    {#if loading}
        <div class="flex justify-center items-center h-64">
            <div
                class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"
            ></div>
        </div>
    {:else if error}
        <div
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
        >
            <p>{error}</p>
        </div>
    {:else if property}
        <!-- Header with Project Overview -->
        <div class="flex justify-between items-start mb-8">
            <div>
                <h1 class="text-xl font-semibold">Project Overview</h1>
                <p class="text-sm text-gray-500">
                    View project details and deliverables
                </p>
            </div>
            <div class="flex items-center">
                <span class="mr-2 text-sm">{property.client}</span>
                <div
                    class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
            </div>
        </div>

        <!-- Property Address Section -->
        <div class="mb-8">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-base font-medium mb-2">Address</h2>
                    <p class="text-sm text-gray-700">{property.fullAddress}</p>
                </div>
                <button
                    on:click={viewTour}
                    class="bg-black text-white px-4 py-2 rounded text-sm"
                >
                    View Tour
                </button>
            </div>
        </div>

        <!-- Property Info Section -->
        <div class="grid grid-cols-3 gap-8 mb-10">
            <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">
                    Payment status
                </h3>
                <p class="text-sm font-medium text-green-600">
                    {property.paymentStatus}
                </p>
            </div>
            <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">Type</h3>
                <p class="text-sm">{property.type}</p>
            </div>
            <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">Deadline</h3>
                <p class="text-sm">{property.deadline}</p>
            </div>
        </div>

        <!-- Virtual Tour Section -->
        <div
            class="flex justify-between items-center py-4 border-b border-gray-200"
        >
            <h3 class="text-base font-medium">Virtual Tour</h3>
            <div class="flex gap-2">
                <button
                    on:click={viewTour}
                    class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm"
                >
                    Watch Preview
                </button>
                <button
                    on:click={copyTourLink}
                    class="bg-black text-white px-4 py-2 rounded text-sm flex items-center"
                >
                    Copy
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                        />
                        <path
                            d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
                        />
                    </svg>
                </button>
            </div>
        </div>

        <!-- 2D Photo Enhancement Section -->
        <div
            class="flex justify-between items-center py-4 border-b border-gray-200"
        >
            <h3 class="text-base font-medium">2D Photo Enhancement</h3>
            <div class="flex gap-2">
                <button
                    on:click={viewImages}
                    class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm"
                >
                    View 2D images
                </button>
                <button
                    on:click={downloadImages}
                    class="bg-black text-white px-4 py-2 rounded text-sm flex items-center"
                >
                    Download
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Floorplans Section -->
        <div
            class="flex justify-between items-center py-4 border-b border-gray-200"
        >
            <h3 class="text-base font-medium">Floorplans</h3>
            <div class="flex gap-2">
                <button
                    on:click={viewFloorplans}
                    class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm"
                >
                    View floorplans
                </button>
                <button
                    on:click={downloadFloorplans}
                    class="bg-black text-white px-4 py-2 rounded text-sm flex items-center"
                >
                    Download
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Inventory Report Section -->
        <div
            class="flex justify-between items-center py-4 border-b border-gray-200"
        >
            <h3 class="text-base font-medium">Inventory Report</h3>
            <div class="flex gap-2">
                <button
                    on:click={viewReport}
                    class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm"
                >
                    View report
                </button>
                <button
                    on:click={downloadReport}
                    class="bg-black text-white px-4 py-2 rounded text-sm flex items-center"
                >
                    Download
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Back button -->
        <div class="mt-8">
            <button on:click={goBack} class="flex items-center text-gray-700">
                <svg
                    class="w-4 h-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    ></path>
                </svg>
                Back to properties
            </button>
        </div>
    {/if}
</div>

<style>
    /* Add any additional styles here */
</style>

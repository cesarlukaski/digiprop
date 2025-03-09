<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { authStore } from "$lib/api";

    // Property data
    const propertyAddress = "78 Court Street Tonypandy, CF 2RL 0B";
    const propertyId = $page.params.id;

    // Form and submission state
    let additionalInfo = "";
    let requestSent = false;
    let loading = false;

    // Handle form submission
    function sendRequest() {
        loading = true;

        // Simulate API call
        setTimeout(() => {
            requestSent = true;
            loading = false;
        }, 1000);
    }

    // Return to property details
    function goBack() {
        goto(`/properties/${propertyId}`);
    }

    // Copy tour link
    function copyTourLink() {
        const link = window.location.href;
        navigator.clipboard.writeText(link);
        alert("Tour link copied to clipboard!");
    }

    // Share tour
    function shareTour() {
        // This would typically open a share dialog
        alert("Share functionality would open here");
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

<div class="bg-white min-h-screen">
    <!-- Breadcrumb and navigation -->
    <div class="bg-gray-100 py-2 px-4">
        <div class="max-w-7xl mx-auto flex items-center text-sm text-gray-600">
            <a href="/properties" class="hover:text-gray-900">Dashboard</a>
            <span class="mx-2">/</span>
            <span>Virtual tour</span>
        </div>
    </div>

    <div class="max-w-7xl mx-auto py-6 px-4">
        <!-- Header section with property info and actions -->
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-xl font-medium">Virtual tour</h1>
                <p class="text-sm text-gray-500">Address: {propertyAddress}</p>
            </div>
            <div class="flex gap-2">
                <button
                    class="px-4 py-2 bg-black text-white rounded text-sm"
                    on:click={() =>
                        window.open("/virtual-tour-fullscreen", "_blank")}
                >
                    View Tour
                </button>
                <button
                    class="px-4 py-2 bg-gray-100 rounded text-sm flex items-center"
                    on:click={copyTourLink}
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
                <button
                    class="px-4 py-2 bg-gray-100 rounded text-sm flex items-center"
                    on:click={shareTour}
                >
                    Share
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
                        />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Virtual tour preview -->
        <div
            class="relative w-full h-96 bg-gray-200 rounded overflow-hidden mb-8"
        >
            <!-- Placeholder 3D tour interface -->
            <div class="absolute inset-0 flex items-center justify-center">
                <img
                    src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Property exterior"
                    class="w-full h-full object-cover"
                />

                <!-- Tour controls overlay -->
                <div
                    class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
                >
                    <div class="bg-white rounded-full p-4 shadow-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-10 w-10 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                </div>

                <!-- Mini floor plan -->
                <div
                    class="absolute top-4 right-4 w-32 h-32 bg-white rounded shadow-md p-2"
                >
                    <div class="text-xs text-gray-700 mb-1">Second Floor</div>
                    <div class="w-full h-24 bg-gray-100 relative">
                        <!-- Simple floor plan representation -->
                        <div
                            class="absolute inset-2 border border-gray-400"
                        ></div>
                        <div
                            class="absolute top-4 left-4 w-4 h-4 bg-blue-500 rounded-full"
                        ></div>
                    </div>
                </div>

                <!-- Tour navigation controls -->
                <div
                    class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4"
                >
                    <button
                        class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Request form or success message -->
        {#if requestSent}
            <div
                class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8"
            >
                <div class="flex items-center mb-4">
                    <svg
                        class="w-8 h-8 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                    <h3 class="text-xl font-bold text-green-800">
                        Request Sent Successfully!
                    </h3>
                </div>
                <p class="text-green-700 mb-4">
                    Your request has been sent. We'll get back to you shortly
                    with more information about this virtual tour.
                </p>
                <button
                    on:click={goBack}
                    class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Back to Property Details
                </button>
            </div>
        {:else}
            <div class="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-8">
                <h2 class="text-lg font-medium mb-4">Additional Information</h2>
                <p class="text-sm text-gray-600 mb-4">
                    Add about your agency or specific needs that would help us
                    serve you better (Optional)
                </p>

                <div class="mb-4">
                    <textarea
                        bind:value={additionalInfo}
                        rows="4"
                        class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Type your message here..."
                    ></textarea>
                </div>

                <div class="flex justify-end gap-3">
                    <button
                        on:click={goBack}
                        class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        on:click={sendRequest}
                        class="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                        disabled={loading}
                    >
                        {#if loading}
                            <span class="inline-block animate-spin mr-2">⟳</span
                            >
                        {/if}
                        Send Request
                    </button>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    /* Add any component-specific styles here */
    button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
</style>

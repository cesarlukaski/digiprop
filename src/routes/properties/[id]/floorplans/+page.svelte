<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { authStore } from "$lib/api";

    // Property data
    const propertyAddress = "78 Court Street Tonypandy, CF 2RL 0B";
    const propertyId = $page.params.id;

    // Floor plans data with accordion structure
    interface FloorPlan {
        id: string;
        title: string;
        image: string;
        description: string;
        dimensions: string;
    }

    const floorPlans: Record<string, FloorPlan[]> = {
        "Ground Floor": [
            {
                id: "kitchen",
                title: "Kitchen",
                image: "https://images.unsplash.com/photo-1582037928769-383b5a8f6597?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                description:
                    "Open concept kitchen with island and breakfast nook",
                dimensions: "4.5m x 3.2m",
            },
            {
                id: "living-room",
                title: "Living Room",
                image: "https://images.unsplash.com/photo-1558442074-3c19857bc1dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                description:
                    "Spacious living room with bay window and fireplace",
                dimensions: "5.8m x 4.2m",
            },
            {
                id: "dining-room",
                title: "Dining Room",
                image: "https://images.unsplash.com/photo-1595526051245-4506e0005bd0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                description: "Elegant dining room with built-in cabinets",
                dimensions: "4.0m x 3.5m",
            },
        ],
        "First Floor": [
            {
                id: "master-bedroom",
                title: "Master Bedroom",
                image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                description:
                    "Luxurious master bedroom with en-suite bathroom and walk-in closet",
                dimensions: "4.8m x 4.2m",
            },
            {
                id: "bedroom-2",
                title: "Bedroom 2",
                image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                description: "Cozy second bedroom with built-in storage",
                dimensions: "3.6m x 3.2m",
            },
            {
                id: "bathroom",
                title: "Main Bathroom",
                image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                description: "Modern bathroom with shower/tub combination",
                dimensions: "2.5m x 2.2m",
            },
        ],
        "Second Floor": [
            {
                id: "loft",
                title: "Loft",
                image: "https://images.unsplash.com/photo-1560440021-33f9b867899d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                description:
                    "Versatile loft space that can be used as office or additional bedroom",
                dimensions: "4.5m x 3.8m",
            },
            {
                id: "storage",
                title: "Storage Room",
                image: "https://images.unsplash.com/photo-1620332372374-f108c53d145c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                description: "Ample storage space with shelving",
                dimensions: "2.4m x 2.0m",
            },
        ],
    };

    // Accordion state
    let expandedSection: string | null = "Ground Floor";
    let selectedFloorPlan: FloorPlan | null = null;

    // Toggle accordion section
    function toggleSection(section: string) {
        expandedSection = expandedSection === section ? null : section;
    }

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
        const link = document.createElement("a");
        link.href = floorPlan.image;
        link.download = `floor-plan-${propertyId}-${floorPlan.title.toLowerCase().replace(/\s+/g, "-")}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Download all floor plans
    function downloadAllFloorPlans() {
        alert(
            "Downloading all floor plans (in a real app, this would create a zip file)",
        );
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

<div class="bg-white min-h-screen">
    <!-- Breadcrumb and navigation -->
    <div class="bg-gray-100 py-2 px-4">
        <div class="max-w-7xl mx-auto flex items-center text-sm text-gray-600">
            <a href="/properties" class="hover:text-gray-900">Dashboard</a>
            <span class="mx-2">/</span>
            <a href={`/properties/${propertyId}`} class="hover:text-gray-900"
                >Property Details</a
            >
            <span class="mx-2">/</span>
            <span>Floor Plans</span>
        </div>
    </div>

    <div class="max-w-7xl mx-auto py-6 px-4">
        <!-- Header section with property info and actions -->
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-xl font-medium">Floor Plans</h1>
                <p class="text-sm text-gray-500">Address: {propertyAddress}</p>
            </div>
            <div class="flex gap-2">
                <button
                    on:click={goBack}
                    class="px-4 py-2 border border-gray-300 rounded text-sm"
                >
                    Back
                </button>
                <button
                    on:click={downloadAllFloorPlans}
                    class="px-4 py-2 bg-black text-white rounded text-sm flex items-center"
                >
                    Download All
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

        <!-- Floor plans accordion -->
        <div
            class="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200 mb-8"
        >
            {#each Object.entries(floorPlans) as [section, plans]}
                <div class="floor-section">
                    <button
                        class="w-full flex justify-between items-center p-5 font-medium text-left focus:outline-none"
                        on:click={() => toggleSection(section)}
                    >
                        <span class="text-gray-900">{section}</span>
                        <svg
                            class="w-5 h-5 transform transition-transform duration-200 {expandedSection ===
                            section
                                ? 'rotate-180'
                                : ''}"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {#if expandedSection === section}
                        <div class="p-5 pt-0 bg-gray-50">
                            <div
                                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                            >
                                {#each plans as plan}
                                    <div
                                        class="bg-white rounded-lg shadow overflow-hidden"
                                    >
                                        <div
                                            class="aspect-w-16 aspect-h-9 bg-gray-200"
                                        >
                                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                                            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                                            <img
                                                src={plan.image}
                                                alt={plan.title}
                                                class="w-full h-full object-cover"
                                                on:click={() =>
                                                    viewFloorPlan(plan)}
                                            />
                                        </div>
                                        <div class="p-4">
                                            <h3
                                                class="text-lg font-medium text-gray-900 mb-1"
                                            >
                                                {plan.title}
                                            </h3>
                                            <p
                                                class="text-sm text-gray-500 mb-2"
                                            >
                                                {plan.dimensions}
                                            </p>
                                            <div class="flex justify-between">
                                                <button
                                                    class="text-sm text-blue-600 hover:text-blue-800"
                                                    on:click={() =>
                                                        viewFloorPlan(plan)}
                                                >
                                                    View Details
                                                </button>
                                                <button
                                                    class="text-sm text-gray-600 hover:text-gray-800 flex items-center"
                                                    on:click={() =>
                                                        downloadFloorPlan(plan)}
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
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>

<!-- Floor plan details modal -->
{#if selectedFloorPlan}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 transition-opacity"
        on:click={closeFloorPlanDetails}
    >
        <div
            class="relative max-w-5xl max-h-full bg-white rounded-lg shadow-xl overflow-hidden"
            on:click|stopPropagation
        >
            <!-- Close button -->
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button
                class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                on:click={closeFloorPlanDetails}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <div class="grid grid-cols-1 md:grid-cols-2">
                <!-- Image -->
                <div class="bg-gray-100 flex items-center justify-center">
                    <img
                        src={selectedFloorPlan.image}
                        alt={selectedFloorPlan.title}
                        class="max-w-full max-h-[70vh] object-contain"
                    />
                </div>

                <!-- Details -->
                <div class="p-6">
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">
                        {selectedFloorPlan.title}
                    </h2>
                    <p class="text-gray-500 mb-4">
                        Dimensions: {selectedFloorPlan.dimensions}
                    </p>

                    <div class="border-t border-gray-200 py-4">
                        <h3 class="text-lg font-medium text-gray-900 mb-2">
                            Description
                        </h3>
                        <p class="text-gray-600">
                            {selectedFloorPlan.description}
                        </p>
                    </div>

                    <div class="mt-6">
                        <button
                            class="px-4 py-2 bg-black text-white rounded text-sm flex items-center"
                            on:click={() => {
                                if (selectedFloorPlan) {
                                    downloadFloorPlan(selectedFloorPlan);
                                }
                            }}
                        >
                            Download Floor Plan
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
            </div>
        </div>
    </div>
{/if}

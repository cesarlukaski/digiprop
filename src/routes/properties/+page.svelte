<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { api, authStore } from "$lib/api";

    // Define custom property interface for our sample data
    interface PropertyItem {
        id: number;
        address: string;
        fullAddress: string;
        client: string;
        city: string;
        status: string;
        payment: string;
    }

    let properties: PropertyItem[] = [];
    let filteredProperties: PropertyItem[] = [];
    let loading = true;
    let error = "";
    let searchQuery = "";
    let currentPage = 1;
    let itemsPerPage = 8;
    let totalPages = 1;

    // Sample properties data for demonstration
    const sampleProperties: PropertyItem[] = [
        {
            id: 1,
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 2RL 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Completed",
            payment: "Paid",
        },
        {
            id: 2,
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 2RL 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Pending",
            payment: "Pending",
        },
        {
            id: 3,
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 2RL 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Completed",
            payment: "Paid",
        },
        {
            id: 4,
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 2RL 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Completed",
            payment: "Paid",
        },
        {
            id: 5,
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 2RL 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Completed",
            payment: "Paid",
        },
        {
            id: 6,
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 2RL 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Completed",
            payment: "Paid",
        },
        {
            id: 7,
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 2RL 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Completed",
            payment: "Paid",
        },
        {
            id: 8,
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 2RL 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Completed",
            payment: "Paid",
        },
    ];

    // Check if user is authenticated
    onMount(async () => {
        authStore.init();

        if (!authStore.user) {
            goto("/login");
            return;
        }

        try {
            // Instead of API call, use sample data
            // properties = await api.getProperties();
            properties = sampleProperties;
            filteredProperties = [...properties];
            calculatePagination();
        } catch (err) {
            error = (err as Error).message || "Failed to load properties";
        } finally {
            loading = false;
        }
    });

    // Handle search
    function handleSearch() {
        filterProperties();
        currentPage = 1;
        calculatePagination();
    }

    // Filter properties based on search query
    function filterProperties() {
        if (!searchQuery.trim()) {
            filteredProperties = [...properties];
        } else {
            const query = searchQuery.toLowerCase();
            filteredProperties = properties.filter(
                (property) =>
                    property.address.toLowerCase().includes(query) ||
                    property.client.toLowerCase().includes(query) ||
                    property.city.toLowerCase().includes(query),
            );
        }
    }

    // Calculate pagination
    function calculatePagination() {
        totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    }

    // Get current page items
    $: paginatedProperties = filteredProperties.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    // Navigation functions
    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
        }
    }

    function previousPage() {
        if (currentPage > 1) {
            currentPage--;
        }
    }

    function bookProject() {
        goto("/new-project");
    }

    function viewPropertyDetails(id: number) {
        goto(`/properties/${id}`);
    }
</script>

<div class="p-6 bg-white">
    <div class="flex justify-between items-center mb-6">
        <div>
            <h1 class="text-xl font-semibold">All Property</h1>
            <p class="text-sm text-gray-500">View property listings</p>
        </div>
        <div class="flex items-center gap-4">
            <div class="relative">
                <input
                    type="text"
                    placeholder="Search"
                    bind:value={searchQuery}
                    on:input={handleSearch}
                    class="py-2 px-4 pr-10 rounded border border-gray-300 w-64 focus:outline-none"
                />
                <svg
                    class="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                </svg>
            </div>
            <button
                on:click={bookProject}
                class="bg-black text-white px-4 py-2 rounded font-medium text-sm"
            >
                Book A Project
            </button>
        </div>
    </div>

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
    {:else}
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                            <div class="flex items-center">
                                Address
                                <svg
                                    class="w-4 h-4 ml-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                            <div class="flex items-center">
                                Client
                                <svg
                                    class="w-4 h-4 ml-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                            <div class="flex items-center">
                                City
                                <svg
                                    class="w-4 h-4 ml-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                            <div class="flex items-center">
                                Payments
                                <svg
                                    class="w-4 h-4 ml-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                            <div class="flex items-center">
                                Status
                                <svg
                                    class="w-4 h-4 ml-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {#each paginatedProperties as property}
                        <tr
                            class="hover:bg-gray-50 cursor-pointer"
                            on:click={() => viewPropertyDetails(property.id)}
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">
                                    {property.address}
                                </div>
                                <div class="text-sm text-gray-500">
                                    {property.fullAddress}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">
                                    {property.client}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">
                                    {property.city}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    class={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${property.payment === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                                >
                                    {property.payment}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    class={`text-sm 
                                    ${property.status === "Completed" ? "text-green-600" : "text-red-600"}`}
                                >
                                    {property.status}
                                </span>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-5 px-2">
            <button
                on:click={previousPage}
                class="px-3 py-1 border border-gray-300 rounded text-sm"
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <div class="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
            </div>
            <button
                on:click={nextPage}
                class="px-3 py-1 border border-gray-300 rounded text-sm"
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    {/if}
</div>

<style>
    /* Add any styles if needed */
</style>

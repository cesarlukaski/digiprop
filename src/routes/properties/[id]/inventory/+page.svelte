<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { authStore } from "$lib/api";

    // Property data
    const propertyAddress = "78 Court Street Tonypandy, CF 2RL 0B";
    const propertyId = $page.params.id;

    // Inventory files data
    interface InventoryFile {
        id: string;
        name: string;
        description: string;
        type: "pdf" | "doc" | "xls" | "jpg";
        size: string;
        date: string;
    }

    const inventoryFiles: InventoryFile[] = [
        {
            id: "inventory-1",
            name: "Property Condition Report.pdf",
            description:
                "Detailed assessment of the property's condition including fixtures, fittings, and structural elements",
            type: "pdf",
            size: "2.3 MB",
            date: "2023-12-15",
        },
        {
            id: "inventory-2",
            name: "Room Measurements.xls",
            description:
                "Spreadsheet with detailed room dimensions and square footage calculations",
            type: "xls",
            size: "1.1 MB",
            date: "2023-12-14",
        },
        {
            id: "inventory-3",
            name: "Electrical Inspection Certificate.pdf",
            description:
                "Electrical safety certification document for the property",
            type: "pdf",
            size: "1.8 MB",
            date: "2023-11-30",
        },
        {
            id: "inventory-4",
            name: "Plumbing System Report.doc",
            description:
                "Assessment of the plumbing system condition and recommendations",
            type: "doc",
            size: "3.5 MB",
            date: "2023-11-25",
        },
        {
            id: "inventory-5",
            name: "Appliance Documentation.pdf",
            description:
                "Manuals and warranty information for all included appliances",
            type: "pdf",
            size: "4.2 MB",
            date: "2023-11-22",
        },
        {
            id: "inventory-6",
            name: "Furniture Inventory.jpg",
            description:
                "Photos and list of all included furniture with condition notes",
            type: "jpg",
            size: "3.7 MB",
            date: "2023-11-20",
        },
    ];

    // UI state
    let searchQuery = "";
    let selectedFile: InventoryFile | null = null;
    let filteredFiles = [...inventoryFiles];

    // Filter files based on search query
    function filterFiles() {
        if (!searchQuery.trim()) {
            filteredFiles = [...inventoryFiles];
            return;
        }

        const query = searchQuery.toLowerCase();
        filteredFiles = inventoryFiles.filter(
            (file) =>
                file.name.toLowerCase().includes(query) ||
                file.description.toLowerCase().includes(query),
        );
    }

    // View file details
    function viewFile(file: InventoryFile) {
        selectedFile = file;
    }

    // Close file details
    function closeFileDetails() {
        selectedFile = null;
    }

    // Download file
    function downloadFile(file: InventoryFile) {
        // In a real app, this would download the actual file
        alert(`Downloading ${file.name}...`);
    }

    // Download all files as zip
    function downloadAllFiles() {
        alert(
            "Downloading all inventory files (in a real app, this would create a zip file)",
        );
    }

    // Return to property details
    function goBack() {
        goto(`/properties/${propertyId}`);
    }

    // Get file icon based on type
    function getFileIcon(fileType: string): string {
        switch (fileType) {
            case "pdf":
                return `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                        </svg>`;
            case "doc":
                return `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                        </svg>`;
            case "xls":
                return `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                        </svg>`;
            case "jpg":
                return `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                        </svg>`;
            default:
                return `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                        </svg>`;
        }
    }

    // Format date
    function formatDate(dateString: string): string {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString("en-US", options);
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
            <span>Inventory Report</span>
        </div>
    </div>

    <div class="max-w-7xl mx-auto py-6 px-4">
        <!-- Header section with property info and actions -->
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-xl font-medium">Inventory Report</h1>
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
                    on:click={downloadAllFiles}
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

        <!-- Search and filter -->
        <div class="mb-6">
            <div class="relative">
                <input
                    type="text"
                    placeholder="Search files..."
                    bind:value={searchQuery}
                    on:input={filterFiles}
                    class="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                    class="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
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
        </div>

        <!-- Files list -->
        <div class="bg-white rounded-lg border border-gray-200 mb-8">
            <div
                class="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 font-medium text-gray-500 text-sm"
            >
                <div class="col-span-6">Name</div>
                <div class="col-span-2">Size</div>
                <div class="col-span-2">Date</div>
                <div class="col-span-2 text-right">Actions</div>
            </div>

            {#if filteredFiles.length === 0}
                <div class="py-16 text-center text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-12 w-12 mx-auto mb-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                        />
                    </svg>
                    <p class="text-lg">No files found</p>
                    <p class="text-sm">Try adjusting your search criteria</p>
                </div>
            {:else}
                {#each filteredFiles as file}
                    <div
                        class="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50"
                    >
                        <div class="col-span-6 flex items-center">
                            <div class="mr-3">
                                {@html getFileIcon(file.type)}
                            </div>
                            <div>
                                <button
                                    class="text-blue-600 hover:text-blue-800 font-medium block"
                                    on:click={() => viewFile(file)}
                                >
                                    {file.name}
                                </button>
                                <p class="text-sm text-gray-500">
                                    {file.description}
                                </p>
                            </div>
                        </div>
                        <div
                            class="col-span-2 flex items-center text-sm text-gray-600"
                        >
                            {file.size}
                        </div>
                        <div
                            class="col-span-2 flex items-center text-sm text-gray-600"
                        >
                            {formatDate(file.date)}
                        </div>
                        <div class="col-span-2 flex items-center justify-end">
                            <button
                                class="text-gray-600 hover:text-gray-900 p-2"
                                on:click={() => viewFile(file)}
                                title="View"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </button>
                            <button
                                class="text-gray-600 hover:text-gray-900 p-2"
                                on:click={() => downloadFile(file)}
                                title="Download"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>

<!-- File details modal -->
{#if selectedFile}
    <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 transition-opacity"
        on:click={closeFileDetails}
    >
        <div
            class="relative max-w-2xl w-full bg-white rounded-lg shadow-xl overflow-hidden"
            on:click|stopPropagation
        >
            <!-- Close button -->
            <button
                class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                on:click={closeFileDetails}
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

            <!-- Header -->
            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center">
                    <div class="mr-4">
                        {@html getFileIcon(selectedFile.type)}
                    </div>
                    <div>
                        <h2 class="text-xl font-bold text-gray-900">
                            {selectedFile.name}
                        </h2>
                        <p class="text-sm text-gray-500">
                            {selectedFile.size} • Last modified: {formatDate(
                                selectedFile.date,
                            )}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Content -->
            <div class="p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-2">
                    Description
                </h3>
                <p class="text-gray-600 mb-6">{selectedFile.description}</p>

                <!-- File preview placeholder -->
                <div class="bg-gray-100 rounded-lg p-8 text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-16 w-16 mx-auto text-gray-400 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <p class="text-gray-500">File preview not available</p>
                    <p class="text-sm text-gray-400 mt-1">
                        Download the file to view its contents
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <div class="border-t border-gray-200 p-4 flex justify-end">
                <button
                    class="px-4 py-2 bg-black text-white rounded text-sm flex items-center"
                    on:click={() => {
                        if (selectedFile) {
                            downloadFile(selectedFile);
                        }
                    }}
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
{/if}

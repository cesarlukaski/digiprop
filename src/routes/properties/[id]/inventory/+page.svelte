<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { authStore } from "$lib/api";

    // Property data
    const propertyAddress = "78 Court Street, Tonypandy, CF 28L 0B";
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
    function downloadFile(file: InventoryFile | null) {
        if (!file) return;
        // In a real app, this would download the actual file
        alert(`Downloading ${file.name}...`);
    }

    // Download all files as zip
    function downloadAllFiles() {
        alert("Downloading all inventory files");
    }

    // Return to property details
    function goBack() {
        goto(`/properties/${propertyId}`);
    }

    // Get file icon based on type
    function getFileIcon(fileType: string) {
        switch (fileType) {
            case "pdf":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <path d="M9 15L12 12 15 15M12 12V18"></path>
                        </svg>`;
            case "doc":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>`;
            case "xls":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>`;
            case "jpg":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>`;
            default:
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
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

<div class="inventory-container">
    <div class="breadcrumb">
        <p>Dashboard / Client</p>
    </div>

    <div class="inventory-content">
        <!-- Header with property overview -->
        <div class="page-header">
            <div class="header-title">
                <h1>Inventory Report</h1>
                <p class="header-address">{propertyAddress}</p>
            </div>
            <div class="header-actions">
                <button class="action-btn secondary-btn" on:click={goBack}
                    >Back</button
                >
                <button
                    class="action-btn primary-btn"
                    on:click={downloadAllFiles}
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

        <!-- Search and filter -->
        <div class="search-container">
            <div class="search-box">
                <input
                    type="text"
                    placeholder="Search files..."
                    bind:value={searchQuery}
                    on:input={filterFiles}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
        </div>

        <!-- Files list -->
        <div class="files-container">
            <table class="files-table">
                <thead>
                    <tr>
                        <th class="name-column">Name</th>
                        <th>Size</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#if filteredFiles.length === 0}
                        <tr>
                            <td colspan="4" class="no-results"
                                >No files found</td
                            >
                        </tr>
                    {:else}
                        {#each filteredFiles as file}
                            <tr>
                                <td class="file-name-cell">
                                    <div
                                        class="file-icon"
                                        on:click={() => viewFile(file)}
                                    >
                                        {@html getFileIcon(file.type)}
                                    </div>
                                    <div class="file-info">
                                        <button
                                            class="file-name-btn"
                                            on:click={() => viewFile(file)}
                                        >
                                            {file.name}
                                        </button>
                                        <p class="file-description">
                                            {file.description}
                                        </p>
                                    </div>
                                </td>
                                <td class="file-size">{file.size}</td>
                                <td class="file-date"
                                    >{formatDate(file.date)}</td
                                >
                                <td class="file-actions">
                                    <button
                                        class="icon-btn"
                                        on:click={() => viewFile(file)}
                                        title="View"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path
                                                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                            ></path>
                                            <circle cx="12" cy="12" r="3"
                                            ></circle>
                                        </svg>
                                    </button>
                                    <button
                                        class="icon-btn"
                                        on:click={() => downloadFile(file)}
                                        title="Download"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
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
                                            <line x1="12" y1="15" x2="12" y2="3"
                                            ></line>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- File details modal -->
{#if selectedFile}
    <div class="modal-overlay" on:click={closeFileDetails}>
        <div class="modal-content" on:click|stopPropagation>
            <button class="modal-close" on:click={closeFileDetails}>
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
                <div class="modal-header">
                    <div class="modal-file-icon">
                        {@html getFileIcon(selectedFile.type)}
                    </div>
                    <div class="modal-file-info">
                        <h2 class="modal-title">{selectedFile.name}</h2>
                        <p class="modal-metadata">
                            {selectedFile.size} • Last modified: {formatDate(
                                selectedFile.date,
                            )}
                        </p>
                    </div>
                </div>

                <div class="modal-content-body">
                    <h3 class="modal-section-title">Description</h3>
                    <p class="modal-description">{selectedFile.description}</p>

                    <!-- File preview placeholder -->
                    <div class="file-preview">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path
                                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                            ></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        <p class="preview-title">File preview not available</p>
                        <p class="preview-subtitle">
                            Download the file to view its contents
                        </p>
                    </div>

                    <div class="modal-actions">
                        <button
                            class="action-btn primary-btn"
                            on:click={() => downloadFile(selectedFile)}
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
    .inventory-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .breadcrumb {
        font-size: 12px;
        color: #6c757d;
        margin-bottom: 20px;
    }

    .inventory-content {
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

    .search-container {
        padding: 16px 20px;
        border-bottom: 1px solid #f1f3f5;
    }

    .search-box {
        position: relative;
        max-width: 400px;
    }

    .search-box input {
        width: 100%;
        padding: 10px 16px 10px 40px;
        border-radius: 4px;
        border: 1px solid #dee2e6;
        font-size: 14px;
    }

    .search-box svg {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #6c757d;
    }

    .files-container {
        padding: 0;
    }

    .files-table {
        width: 100%;
        border-collapse: collapse;
    }

    .files-table th {
        text-align: left;
        padding: 12px 20px;
        font-size: 14px;
        font-weight: 600;
        color: #6c757d;
        border-bottom: 1px solid #f1f3f5;
    }

    .files-table td {
        padding: 12px 20px;
        border-bottom: 1px solid #f1f3f5;
        font-size: 14px;
    }

    .name-column {
        width: 50%;
    }

    .file-name-cell {
        display: flex;
        align-items: flex-start;
        gap: 12px;
    }

    .file-icon {
        color: #6c757d;
        cursor: pointer;
        flex-shrink: 0;
    }

    .file-info {
        display: flex;
        flex-direction: column;
    }

    .file-name-btn {
        background: none;
        border: none;
        padding: 0;
        font-size: 14px;
        font-weight: 500;
        color: #212529;
        text-align: left;
        cursor: pointer;
        margin-bottom: 4px;
    }

    .file-name-btn:hover {
        color: #000;
        text-decoration: underline;
    }

    .file-description {
        font-size: 12px;
        color: #6c757d;
        margin: 0;
        line-height: 1.4;
    }

    .file-size,
    .file-date {
        color: #6c757d;
    }

    .file-actions {
        display: flex;
        gap: 8px;
    }

    .icon-btn {
        background: none;
        border: none;
        padding: 4px;
        color: #6c757d;
        cursor: pointer;
        border-radius: 4px;
    }

    .icon-btn:hover {
        background-color: #f8f9fa;
        color: #000;
    }

    .no-results {
        text-align: center;
        color: #6c757d;
        padding: 24px;
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

    .modal-header {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 24px;
        border-bottom: 1px solid #f1f3f5;
    }

    .modal-file-icon {
        color: #4263eb;
        background-color: rgba(66, 99, 235, 0.1);
        width: 48px;
        height: 48px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-file-info {
        flex: 1;
    }

    .modal-title {
        font-size: 20px;
        font-weight: 600;
        margin: 0 0 4px 0;
    }

    .modal-metadata {
        font-size: 14px;
        color: #6c757d;
        margin: 0;
    }

    .modal-content-body {
        padding: 24px;
    }

    .modal-section-title {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 12px 0;
    }

    .modal-description {
        font-size: 14px;
        line-height: 1.5;
        color: #212529;
        margin: 0 0 24px 0;
    }

    .file-preview {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 40px;
        margin-bottom: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #6c757d;
    }

    .preview-title {
        font-size: 16px;
        font-weight: 500;
        margin: 16px 0 4px 0;
    }

    .preview-subtitle {
        font-size: 14px;
        margin: 0;
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
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

        .files-table th:not(.name-column),
        .files-table td:not(.file-name-cell) {
            display: none;
        }

        .files-table,
        .files-table tbody,
        .files-table tr,
        .files-table td {
            display: block;
            width: 100%;
        }

        .file-name-cell {
            padding: 16px;
        }

        .modal-header {
            padding: 16px;
        }

        .modal-content-body {
            padding: 16px;
        }
    }
</style>

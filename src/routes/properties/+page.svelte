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
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Completed",
            payment: "Paid",
        },
        {
            id: 2,
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Pending",
            payment: "Pending",
        },
        {
            id: 3,
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Completed",
            payment: "Paid",
        },
        {
            id: 4,
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Completed",
            payment: "Paid",
        },
        {
            id: 5,
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Pending",
            payment: "Pending",
        },
        {
            id: 6,
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Completed",
            payment: "Paid",
        },
        {
            id: 7,
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Completed",
            payment: "Paid",
        },
        {
            id: 8,
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Completed",
            payment: "Paid",
        },
        {
            id: 9,
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Completed",
            payment: "Paid",
        },
        {
            id: 10,
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            status: "Completed",
            payment: "Paid",
        },
    ];

    // Sorting variables
    let sortColumn: keyof PropertyItem | null = null;
    let sortDirection: "asc" | "desc" = "asc";

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
            properties = [...sampleProperties];
            filterProperties();
        } catch (err) {
            error = (err as Error).message || "Failed to load properties";
        } finally {
            loading = false;
        }
    });

    // Filter properties based on search query
    function filterProperties() {
        if (!searchQuery) {
            filteredProperties = [...properties];
        } else {
            const query = searchQuery.toLowerCase();
            filteredProperties = properties.filter(
                (property) =>
                    property.address.toLowerCase().includes(query) ||
                    property.client.toLowerCase().includes(query) ||
                    property.city.toLowerCase().includes(query) ||
                    property.status.toLowerCase().includes(query),
            );
        }
        totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
        if (currentPage > totalPages) {
            currentPage = 1;
        }
    }

    // Sort properties
    function sortProperties(column: keyof PropertyItem) {
        if (sortColumn === column) {
            sortDirection = sortDirection === "asc" ? "desc" : "asc";
        } else {
            sortColumn = column;
            sortDirection = "asc";
        }

        filteredProperties = [...filteredProperties].sort((a, b) => {
            const valueA = String(a[column] || "").toLowerCase();
            const valueB = String(b[column] || "").toLowerCase();

            if (sortDirection === "asc") {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        });
    }

    // Handle search
    function handleSearch() {
        filterProperties();
    }

    // Get current page items
    $: {
        if (searchQuery !== undefined) {
            filterProperties();
        }
    }

    $: currentItems = filteredProperties.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    // Navigation functions
    function goToPage(page: number) {
        currentPage = page;
    }

    function goToNextPage() {
        if (currentPage < totalPages) {
            currentPage++;
        }
    }

    function goToPreviousPage() {
        if (currentPage > 1) {
            currentPage--;
        }
    }

    function bookProject() {
        goto("/booking");
    }

    function viewProperty(id: number) {
        goto(`/properties/${id}`);
    }
</script>

<div class="properties-container">
    <div class="header-container">
        <div class="title-container">
            <h1>All Property</h1>
            <p class="title-description">All properties assigned</p>
        </div>

        <div class="actions-container">
            <div class="search-box">
                <input
                    type="text"
                    placeholder="Search"
                    bind:value={searchQuery}
                    on:input={handleSearch}
                />
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
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
            <button class="book-project-btn" on:click={bookProject}
                >Book A Project</button
            >
        </div>
    </div>

    {#if loading}
        <div class="loading">Loading properties...</div>
    {:else if error}
        <div class="error-message">{error}</div>
    {:else}
        <div class="properties-table-container">
            <table class="properties-table">
                <thead>
                    <tr>
                        <th
                            on:click={() => sortProperties("address")}
                            class:active={sortColumn === "address"}
                        >
                            Address
                            <span class="sort-icon">•</span>
                        </th>
                        <th
                            on:click={() => sortProperties("client")}
                            class:active={sortColumn === "client"}
                        >
                            Client
                            <span class="sort-icon">•</span>
                        </th>
                        <th
                            on:click={() => sortProperties("city")}
                            class:active={sortColumn === "city"}
                        >
                            City
                            <span class="sort-icon">•</span>
                        </th>
                        <th
                            on:click={() => sortProperties("payment")}
                            class:active={sortColumn === "payment"}
                        >
                            Payments
                            <span class="sort-icon">•</span>
                        </th>
                        <th
                            on:click={() => sortProperties("status")}
                            class:active={sortColumn === "status"}
                        >
                            Status
                            <span class="sort-icon">•</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {#each currentItems as property (property.id)}
                        <tr on:click={() => viewProperty(property.id)}>
                            <td class="address-cell">
                                <div>{property.address}</div>
                                <div class="full-address">
                                    {property.fullAddress}
                                </div>
                            </td>
                            <td>{property.client}</td>
                            <td>{property.city}</td>
                            <td>
                                <span
                                    class="payment-status {property.payment.toLowerCase()}"
                                >
                                    {property.payment}
                                </span>
                            </td>
                            <td>
                                <span
                                    class="status-badge {property.status.toLowerCase()}"
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
        {#if totalPages > 1}
            <div class="pagination">
                <button
                    class="pagination-btn"
                    disabled={currentPage === 1}
                    on:click={goToPreviousPage}
                >
                    Previous
                </button>
                <div class="page-numbers">
                    {#each Array(totalPages) as _, i}
                        <button
                            class="page-number {currentPage === i + 1
                                ? 'active'
                                : ''}"
                            on:click={() => goToPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    {/each}
                </div>
                <button
                    class="pagination-btn"
                    disabled={currentPage === totalPages}
                    on:click={goToNextPage}
                >
                    Next
                </button>
            </div>
        {/if}
    {/if}
</div>

<style>
    .properties-container {
        padding: 24px;
        max-width: 100%;
    }

    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .title-container h1 {
        font-size: 24px;
        font-weight: 600;
        margin: 0;
        color: #333;
    }

    .title-description {
        font-size: 14px;
        color: #666;
        margin: 4px 0 0 0;
    }

    .actions-container {
        display: flex;
        gap: 16px;
    }

    .search-box {
        position: relative;
    }

    .search-box input {
        padding: 8px 12px;
        padding-right: 32px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        font-size: 14px;
        width: 200px;
    }

    .search-box svg {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
    }

    .book-project-btn {
        background-color: #000;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        font-weight: 500;
    }

    .properties-table-container {
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        overflow: hidden;
        background-color: white;
    }

    .properties-table {
        width: 100%;
        border-collapse: collapse;
    }

    .properties-table th {
        background-color: #f9f9f9;
        border-bottom: 1px solid #e0e0e0;
        padding: 12px 16px;
        text-align: left;
        font-weight: 500;
        color: #333;
        cursor: pointer;
        position: relative;
    }

    .properties-table th.active {
        font-weight: 600;
    }

    .sort-icon {
        font-size: 16px;
        margin-left: 4px;
        color: #ccc;
    }

    .properties-table td {
        padding: 16px;
        border-bottom: 1px solid #f0f0f0;
        color: #333;
    }

    .properties-table tr:hover {
        background-color: #f9f9f9;
        cursor: pointer;
    }

    .address-cell {
        font-weight: 500;
    }

    .full-address {
        font-size: 12px;
        color: #666;
        margin-top: 4px;
        font-weight: normal;
    }

    .status-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        text-align: center;
    }

    .status-badge.completed {
        background-color: #e6f7ed;
        color: #2e7d32;
    }

    .status-badge.pending {
        background-color: #fff8e1;
        color: #f57c00;
    }

    .payment-status {
        font-weight: 500;
        font-size: 14px;
    }

    .payment-status.paid {
        color: #2e7d32;
    }

    .payment-status.pending {
        color: #f57c00;
    }

    .loading,
    .error-message {
        text-align: center;
        padding: 24px;
        color: #666;
    }

    .error-message {
        color: #d32f2f;
    }

    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 24px;
        gap: 8px;
    }

    .pagination-btn {
        background: none;
        border: 1px solid #e0e0e0;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
    }

    .pagination-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .page-numbers {
        display: flex;
        gap: 8px;
    }

    .page-number {
        background: none;
        border: 1px solid #e0e0e0;
        width: 32px;
        height: 32px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        cursor: pointer;
    }

    .page-number.active {
        background-color: #000;
        color: white;
        border-color: #000;
    }
</style>

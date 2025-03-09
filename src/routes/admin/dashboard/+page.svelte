<script context="module">
    // Helper functions for chart colors
    function getColorForService(service: string): string {
        const colorMap = {
            "Virtual Tour": "#FFD66B",
            "360 Inspections": "#FF6B6B",
            "2D Catalogue": "#6BCB77",
            Inventory: "#4D96FF",
            Valuation: "#D99BFF",
        } as const;
        return colorMap[service as keyof typeof colorMap] || "#ccc";
    }

    function getColorForProjectType(type: string): string {
        const colorMap = {
            "Virtual Tours": "#FF6B6B",
            "RCVT Report": "#4D96FF",
            Inventories: "#6BCB77",
        };
        return colorMap[type as keyof typeof colorMap] || "#ccc";
    }
</script>

<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // Mock data for dashboard
    const summaryData = {
        totalProperties: 1235,
        totalRevenue: 2220.42,
        properties: 2220,
    };

    const revenueData = {
        weekly: {
            "Virtual Tour": 221,
            "360 Inspections": 123,
            "2D Catalogue": 95,
            Inventory: 43,
            Valuation: 64,
        },
        monthly: {
            "Virtual Tour": 850,
            "360 Inspections": 520,
            "2D Catalogue": 320,
            Inventory: 180,
            Valuation: 290,
        },
        yearly: {
            "Virtual Tour": 9800,
            "360 Inspections": 6100,
            "2D Catalogue": 3850,
            Inventory: 2200,
            Valuation: 3400,
        },
    };

    const projectsData = {
        weekly: {
            "Virtual Tours": 221,
            "RCVT Report": 123,
            Inventories: 25,
        },
        monthly: {
            "Virtual Tours": 850,
            "RCVT Report": 520,
            Inventories: 89,
        },
        yearly: {
            "Virtual Tours": 9800,
            "RCVT Report": 6100,
            Inventories: 1050,
        },
    };

    const inventoryData = [
        { id: 1, city: "City 1", count: 123 },
        { id: 2, city: "City 2", count: 105 },
        { id: 3, city: "City 3", count: 92 },
        { id: 4, city: "City 4", count: 40 },
    ];

    const categoryData = [
        { id: 1, name: "Houses", count: 450, totalProjects: 450 },
        { id: 2, name: "Offices", count: 320, totalProjects: 320 },
        { id: 3, name: "Properties", count: 510, totalProjects: 510 },
        { id: 4, name: "Heritage 1", count: 45, totalProjects: 45 },
    ];

    // State for selected time periods
    let revenueTimePeriod = "weekly";
    let projectsTimePeriod = "weekly";
    // Selected data for charts
    $: selectedRevenueData =
        revenueData[revenueTimePeriod as keyof typeof revenueData];
    $: selectedProjectsData =
        projectsData[projectsTimePeriod as keyof typeof projectsData];

    // Total calculations
    $: totalRevenue = Object.values(selectedRevenueData).reduce(
        (acc, val) => acc + val,
        0,
    );
    $: totalProjects = Object.values(selectedProjectsData).reduce(
        (acc, val) => acc + val,
        0,
    );

    // Admin navigation
    const adminNavItems = [
        {
            label: "Dashboard",
            path: "/admin/dashboard",
            icon: "dashboard",
            active: true,
        },
        { label: "All Property", path: "/admin/properties", icon: "property" },
        {
            label: "Permissions",
            path: "/admin/permissions",
            icon: "permissions",
        },
        { label: "Diary", path: "/admin/diary", icon: "diary" },
        { label: "Payments", path: "/admin/payments", icon: "payments" },
        { label: "Settings", path: "/admin/settings", icon: "settings" },
    ];

    onMount(() => {
        // Check authentication
        authStore.init();

        if (!authStore.user) {
            goto("/login");
            return;
        }

        // Initialize charts
        renderRevenueChart();
        renderProjectsChart();
    });

    function renderRevenueChart() {
        // In a real implementation, we would use a charting library like Chart.js
        // For this demo, we're using static charts with CSS
    }

    function renderProjectsChart() {
        // Same as above, static chart representation
    }

    function setRevenueTimePeriod(period: "weekly" | "monthly" | "yearly") {
        revenueTimePeriod = period;
    }

    function setProjectsTimePeriod(period: "weekly" | "monthly" | "yearly") {
        projectsTimePeriod = period;
    }

    function viewAll() {
        // In a real app, this would navigate to a detailed view
        console.log("View all clicked");
    }

    function navigateTo(path: string) {
        goto(path);
    }
</script>

<div class="admin-layout">
    <!-- Main Content - Removed sidebar and updated to full width -->
    <div class="admin-content">
        <div class="admin-header">
            <div class="header-title">
                <h1>Admin Dashboard</h1>
            </div>
            <div class="header-actions">
                <div class="notifications">
                    <button class="icon-button">
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
                                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                            ></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                    </button>
                </div>
                <div class="messages">
                    <button class="icon-button">
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
                                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                            ></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                    </button>
                </div>
                <div class="user-profile">
                    <span>Pathum Bandara</span>
                    <div class="avatar">
                        <img src="/avatar.png" alt="User avatar" />
                    </div>
                </div>
            </div>
        </div>

        <section class="summary-section">
            <div class="summary-card property-performance">
                <h2>Property Performance Summary</h2>
                <div class="summary-cards">
                    <div class="metric-card">
                        <h3>Properties</h3>
                        <div class="metric-value">
                            {summaryData.totalProperties}
                        </div>
                        <div class="period">Including all properties</div>
                    </div>

                    <div class="metric-card">
                        <h3>Total Revenue</h3>
                        <div class="metric-value">
                            £ {summaryData.totalRevenue.toFixed(2)}
                        </div>
                        <div class="period">Including all properties</div>
                    </div>

                    <div class="metric-card">
                        <h3>Properties</h3>
                        <div class="metric-value">{summaryData.properties}</div>
                        <div class="period">Including all properties</div>
                    </div>
                </div>
            </div>
        </section>

        <section class="charts-section">
            <div class="chart-card">
                <div class="card-header">
                    <h3>Total Revenue</h3>
                    <div class="time-filters">
                        <button
                            class:active={revenueTimePeriod === "weekly"}
                            on:click={() => setRevenueTimePeriod("weekly")}
                            >Weekly</button
                        >
                        <button
                            class:active={revenueTimePeriod === "monthly"}
                            on:click={() => setRevenueTimePeriod("monthly")}
                            >Monthly</button
                        >
                        <button
                            class:active={revenueTimePeriod === "yearly"}
                            on:click={() => setRevenueTimePeriod("yearly")}
                            >Yearly</button
                        >
                    </div>
                    <button class="view-all" on:click={viewAll}>View All</button
                    >
                </div>

                <div class="chart-data">
                    <div class="chart-legend">
                        {#each Object.entries(selectedRevenueData) as [key, value]}
                            <div class="legend-item">
                                <div
                                    class="legend-color"
                                    style="background-color: {getColorForService(
                                        key,
                                    )};"
                                ></div>
                                <div class="legend-label">{key}</div>
                                <div class="legend-value">{value}</div>
                            </div>
                        {/each}
                    </div>

                    <div class="pie-chart revenue-chart">
                        <!-- This would be replaced with an actual chart in a real implementation -->
                        <div
                            class="pie-segment"
                            style="--segment-size: 35%; --segment-color: #FFD66B;"
                        ></div>
                        <div
                            class="pie-segment"
                            style="--segment-size: 25%; --segment-color: #FF6B6B;"
                        ></div>
                        <div
                            class="pie-segment"
                            style="--segment-size: 20%; --segment-color: #6BCB77;"
                        ></div>
                        <div
                            class="pie-segment"
                            style="--segment-size: 10%; --segment-color: #4D96FF;"
                        ></div>
                        <div
                            class="pie-segment"
                            style="--segment-size: 10%; --segment-color: #D99BFF;"
                        ></div>
                    </div>
                </div>
            </div>

            <div class="chart-card">
                <div class="card-header">
                    <h3>Total number of Projects</h3>
                    <div class="time-filters">
                        <button
                            class:active={projectsTimePeriod === "weekly"}
                            on:click={() => setProjectsTimePeriod("weekly")}
                            >Weekly</button
                        >
                        <button
                            class:active={projectsTimePeriod === "monthly"}
                            on:click={() => setProjectsTimePeriod("monthly")}
                            >Monthly</button
                        >
                        <button
                            class:active={projectsTimePeriod === "yearly"}
                            on:click={() => setProjectsTimePeriod("yearly")}
                            >Yearly</button
                        >
                    </div>
                    <button class="view-all" on:click={viewAll}>View All</button
                    >
                </div>

                <div class="chart-data">
                    <div class="chart-legend">
                        {#each Object.entries(selectedProjectsData) as [key, value]}
                            <div class="legend-item">
                                <div
                                    class="legend-color"
                                    style="background-color: {getColorForProjectType(
                                        key,
                                    )};"
                                ></div>
                                <div class="legend-label">{key}</div>
                                <div class="legend-value">{value}</div>
                            </div>
                        {/each}
                    </div>

                    <div class="pie-chart projects-chart">
                        <!-- This would be replaced with an actual chart in a real implementation -->
                        <div
                            class="pie-segment"
                            style="--segment-size: 60%; --segment-color: #FF6B6B;"
                        ></div>
                        <div
                            class="pie-segment"
                            style="--segment-size: 30%; --segment-color: #4D96FF;"
                        ></div>
                        <div
                            class="pie-segment"
                            style="--segment-size: 10%; --segment-color: #6BCB77;"
                        ></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="tables-section">
            <div class="table-card">
                <div class="card-header with-actions">
                    <h3>360 Inventories</h3>
                    <button class="view-all" on:click={viewAll}>View All</button
                    >
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>City</th>
                            <th class="numeric">Total Projects</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each inventoryData as item}
                            <tr>
                                <td>City {item.id}</td>
                                <td class="numeric">{item.count}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>

            <div class="table-card">
                <div class="card-header with-actions">
                    <h3>Categories</h3>
                    <button class="view-all" on:click={viewAll}>View All</button
                    >
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th class="numeric">Total Projects</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each categoryData as item}
                            <tr>
                                <td>{item.name}</td>
                                <td class="numeric">{item.totalProjects}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</div>

<style>
    .admin-layout {
        min-height: 100vh;
        background-color: #f5f7fa;
        font-family: Arial, sans-serif;
    }

    /* Admin Content - Updated to remove sidebar references */
    .admin-content {
        padding: 0 24px 24px;
    }

    .admin-header {
        padding: 16px 0;
        border-bottom: 1px solid #e5e5e5;
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header-title h1 {
        font-size: 24px;
        font-weight: 600;
        margin: 0;
        color: #333;
    }

    .header-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 16px;
    }

    .icon-button {
        background: none;
        border: none;
        cursor: pointer;
        color: #666;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
    }

    .icon-button:hover {
        background-color: #f0f0f0;
    }

    .user-profile {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
    }

    .user-profile span {
        font-size: 14px;
        font-weight: 500;
    }

    .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
    }

    .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* Summary section */
    .summary-section {
        margin-bottom: 24px;
    }

    .summary-card {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        padding: 20px;
    }

    .summary-card h2 {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 16px 0;
        color: #333;
    }

    .summary-cards {
        display: flex;
        gap: 24px;
    }

    .metric-card {
        flex: 1;
        padding: 16px;
        border-radius: 8px;
        background-color: #f8f9fa;
        position: relative;
    }

    .metric-card h3 {
        font-size: 14px;
        font-weight: 500;
        color: #666;
        margin: 0 0 12px 0;
    }

    .metric-value {
        font-size: 24px;
        font-weight: 700;
        color: #333;
        margin-bottom: 8px;
    }

    .period {
        font-size: 12px;
        color: #999;
    }

    /* Chart section */
    .charts-section {
        display: flex;
        gap: 24px;
        margin-bottom: 24px;
    }

    .chart-card {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        padding: 20px;
        flex: 1;
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    .card-header h3 {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
        color: #333;
    }

    .time-filters {
        display: flex;
        gap: 8px;
    }

    .time-filters button {
        background: none;
        border: none;
        padding: 4px 8px;
        font-size: 12px;
        color: #666;
        cursor: pointer;
        border-radius: 4px;
    }

    .time-filters button.active {
        background-color: #f0f0f0;
        font-weight: 500;
        color: #333;
    }

    .view-all {
        background: none;
        border: none;
        color: #3182ce;
        font-size: 12px;
        cursor: pointer;
        padding: 0;
    }

    .chart-data {
        display: flex;
        gap: 16px;
    }

    .chart-legend {
        flex: 1;
    }

    .legend-item {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
    }

    .legend-color {
        width: 16px;
        height: 16px;
        border-radius: 4px;
        margin-right: 8px;
    }

    .legend-label {
        flex: 1;
        font-size: 14px;
        color: #333;
    }

    .legend-value {
        font-weight: 500;
        color: #333;
    }

    .pie-chart {
        width: 180px;
        height: 180px;
        position: relative;
        border-radius: 50%;
        overflow: hidden;
        background-color: #f0f0f0;
    }

    .pie-segment {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: var(--segment-color);
        clip-path: polygon(
            50% 50%,
            50% 0%,
            calc(50% + 50% * var(--segment-size)) 0%
        );
        transform: rotate(calc(360deg * var(--segment-size) * 0.5));
    }

    /* Tables section */
    .tables-section {
        display: flex;
        gap: 24px;
    }

    .table-card {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        padding: 20px;
        flex: 1;
    }

    .card-header.with-actions {
        margin-bottom: 16px;
    }

    .data-table {
        width: 100%;
        border-collapse: collapse;
    }

    .data-table th,
    .data-table td {
        padding: 12px 8px;
        text-align: left;
        border-bottom: 1px solid #f0f0f0;
        font-size: 14px;
    }

    .data-table th {
        color: #666;
        font-weight: 500;
    }

    .data-table th.numeric,
    .data-table td.numeric {
        text-align: right;
    }

    .data-table tbody tr:last-child td {
        border-bottom: none;
    }

    /* Helper function for charts - implementation would be in JavaScript */
    :global(html) {
        --color-virtual-tour: #ffd66b;
        --color-inspections: #ff6b6b;
        --color-catalogue: #6bcb77;
        --color-inventory: #4d96ff;
        --color-valuation: #d99bff;
    }
</style>

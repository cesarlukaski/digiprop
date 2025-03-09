<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    interface Project {
        id: string;
        projectName: string;
        address: string;
        client: string;
        city: string;
        status: string;
        deadline: string;
        assigned: string;
        payment: string;
    }

    interface StaffMember {
        id: number;
        name: string;
    }

    // Mock data for projects
    const projects: Project[] = [
        {
            id: "PRJ-001",
            projectName: "360 Virtual Tour - White House",
            address: "76 Court Street, Temporarily, CF_09",
            client: "Aktions",
            city: "London",
            status: "Ongoing",
            deadline: "2024-12-12",
            assigned: "David Parker",
            payment: "£ 250",
        },
        {
            id: "PRJ-002",
            projectName: "Property Valuation - Greenview Apartments",
            address: "76 Court Street, Temporarily, CF_09",
            client: "Aktions",
            city: "Manchester",
            status: "Completed",
            deadline: "2024-12-12",
            assigned: "",
            payment: "£ 250",
        },
        {
            id: "PRJ-003",
            projectName: "Full Inventory - Riverside Mansions",
            address: "76 Court Street, Temporarily, CF_09",
            client: "Aktions",
            city: "Birmingham",
            status: "Pending Review",
            deadline: "2024-12-12",
            assigned: "Pingueen",
            payment: "£ 250",
        },
        {
            id: "PRJ-004",
            projectName: "2D Floor Plan - Oakwood Heights",
            address: "76 Court Street, Temporarily, CF_09",
            client: "Aktions",
            city: "Liverpool",
            status: "Ongoing",
            deadline: "2024-12-12",
            assigned: "",
            payment: "£ 250",
        },
        {
            id: "PRJ-005",
            projectName: "360 Virtual Tour - Meadow View Estate",
            address: "76 Court Street, Temporarily, CF_09",
            client: "Aktions",
            city: "Glasgow",
            status: "Completed",
            deadline: "2024-12-12",
            assigned: "Pingueen",
            payment: "£ 250",
        },
        {
            id: "PRJ-006",
            projectName: "Property Inspection - Cedar Apartments",
            address: "76 Court Street, Temporarily, CF_09",
            client: "Aktions",
            city: "Edinburgh",
            status: "Pending Review",
            deadline: "2024-12-12",
            assigned: "",
            payment: "£ 250",
        },
        {
            id: "PRJ-007",
            projectName: "Full Inventory - Bluebell Cottages",
            address: "76 Court Street, Temporarily, CF_09",
            client: "Aktions",
            city: "Bristol",
            status: "Ongoing",
            deadline: "2024-12-12",
            assigned: "Pingueen",
            payment: "£ 250",
        },
    ];

    // Staff users who can be assigned to projects
    const staffMembers: StaffMember[] = [
        { id: 1, name: "Pathum" },
        { id: 2, name: "Charmode" },
        { id: 3, name: "Pingueen" },
        { id: 4, name: "Joe" },
        { id: 5, name: "Anne" },
        { id: 6, name: "Jhone" },
    ];

    // Assignment dropdown state
    let showAssignmentDropdown = false;
    let currentProjectId: string | null = null;
    let dropdownPosition = { top: 0, left: 0 };
    
    // Filter state for staff type
    let activeTab = "Photographers";

    // Search and filter state
    let searchQuery = "";
    let filteredProjects = projects;
    let statusFilter = "all";
    let sortField = "deadline";
    let sortOrder = "asc";

    // Filter and sort projects
    $: {
        filteredProjects = projects.filter((project) => {
            const matchesSearch =
                searchQuery === "" ||
                project.projectName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                project.client
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                project.city.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus =
                statusFilter === "all" ||
                project.status.toLowerCase() === statusFilter.toLowerCase();

            return matchesSearch && matchesStatus;
        });

        // Sort projects
        filteredProjects = filteredProjects.sort((a, b) => {
            const fieldA = a[sortField as keyof Project];
            const fieldB = b[sortField as keyof Project];

            if (sortOrder === "asc") {
                return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
            } else {
                return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
            }
        });
    }

    // Handle sorting
    function handleSort(field: string): void {
        if (sortField === field) {
            sortOrder = sortOrder === "asc" ? "desc" : "asc";
        } else {
            sortField = field;
            sortOrder = "asc";
        }
    }

    // Get status class for styling
    function getStatusClass(status: string): string {
        switch (status.toLowerCase()) {
            case "completed":
                return "status-completed";
            case "ongoing":
                return "status-ongoing";
            case "pending review":
                return "status-pending";
            default:
                return "";
        }
    }

    // View project details
    function viewProject(id: string): void {
        // TODO: Navigate to project details
        console.log(`Viewing project ${id}`);
    }

    // Open assignment dropdown
    function openAssignmentDropdown(event: MouseEvent, projectId: string): void {
        const target = event.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        dropdownPosition = {
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX
        };
        currentProjectId = projectId;
        showAssignmentDropdown = true;
    }

    // Close assignment dropdown
    function closeAssignmentDropdown(): void {
        showAssignmentDropdown = false;
        currentProjectId = null;
    }

    // Assign staff to project
    function assignStaffToProject(staffName: string): void {
        if (currentProjectId) {
            const projectIndex = projects.findIndex(p => p.id === currentProjectId);
            if (projectIndex !== -1) {
                projects[projectIndex].assigned = staffName;
                closeAssignmentDropdown();
            }
        }
    }

    // Click outside to close dropdown
    function handleClickOutside(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        if (showAssignmentDropdown && 
            !target.closest('.assignment-dropdown') && 
            !target.classList.contains('assignee-cell')) {
            closeAssignmentDropdown();
        }
    }

    // Set active tab
    function setActiveTab(tab: string): void {
        activeTab = tab;
    }

    onMount(() => {
        authStore.init();

        if (!authStore.user) {
            goto("/login");
        }

        // Add event listener for click outside
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
</script>

<div class="project-management-container">
    <div class="page-header">
        <h1>Permission</h1>
    </div>

    <!-- Staff Type Tabs -->
    <div class="staff-tabs">
        <button 
            class="tab-btn {activeTab === 'Photographers' ? 'active' : ''}" 
            on:click={() => setActiveTab('Photographers')}
        >
            Photographers
        </button>
        <button 
            class="tab-btn {activeTab === 'Designers' ? 'active' : ''}" 
            on:click={() => setActiveTab('Designers')}
        >
            Designers
        </button>
        <button 
            class="tab-btn {activeTab === 'Inventory Clerk' ? 'active' : ''}" 
            on:click={() => setActiveTab('Inventory Clerk')}
        >
            Inventory Clerk
        </button>
        <button 
            class="tab-btn {activeTab === 'RICS Surveyor/Valuer' ? 'active' : ''}" 
            on:click={() => setActiveTab('RICS Surveyor/Valuer')}
        >
            RICS Surveyor/Valuer
        </button>
    </div>

    <div class="project-list">
        <table>
            <thead>
                <tr>
                    <th on:click={() => handleSort("address")}>
                        Address
                        {#if sortField === "address"}
                            <span class="sort-icon"
                                >{sortOrder === "asc" ? "↑" : "↓"}</span
                            >
                        {/if}
                    </th>
                    <th on:click={() => handleSort("client")}>
                        Client
                        {#if sortField === "client"}
                            <span class="sort-icon"
                                >{sortOrder === "asc" ? "↑" : "↓"}</span
                            >
                        {/if}
                    </th>
                    <th on:click={() => handleSort("assigned")}>
                        Assignee
                        {#if sortField === "assigned"}
                            <span class="sort-icon"
                                >{sortOrder === "asc" ? "↑" : "↓"}</span
                            >
                        {/if}
                    </th>
                    <th on:click={() => handleSort("payment")}>
                        Total payment
                        {#if sortField === "payment"}
                            <span class="sort-icon"
                                >{sortOrder === "asc" ? "↑" : "↓"}</span
                            >
                        {/if}
                    </th>
                    <th on:click={() => handleSort("deadline")}>
                        Deadline
                        {#if sortField === "deadline"}
                            <span class="sort-icon"
                                >{sortOrder === "asc" ? "↑" : "↓"}</span
                            >
                        {/if}
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each filteredProjects as project}
                    <tr class={!project.assigned ? 'unassigned-row' : ''}>
                        <td class="address-cell">
                            <div>{project.address}</div>
                        </td>
                        <td>{project.client}</td>
                        <td 
                            class="assignee-cell {!project.assigned ? 'unassigned' : ''}"
                            on:click={(e) => !project.assigned && openAssignmentDropdown(e, project.id)}
                        >
                            {#if project.assigned}
                                {project.assigned}
                            {:else}
                                <span class="assign-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="8.5" cy="7" r="4"></circle>
                                        <line x1="20" y1="8" x2="20" y2="14"></line>
                                        <line x1="23" y1="11" x2="17" y2="11"></line>
                                    </svg>
                                    Assign
                                </span>
                            {/if}
                        </td>
                        <td>{project.payment}</td>
                        <td>{project.deadline}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <!-- Assignment Dropdown -->
    {#if showAssignmentDropdown}
        <div 
            class="assignment-dropdown"
            style="top: {dropdownPosition.top}px; left: {dropdownPosition.left}px;"
        >
            {#each staffMembers as staff}
                <div 
                    class="dropdown-item"
                    on:click={() => assignStaffToProject(staff.name)}
                >
                    {staff.name}
                </div>
            {/each}
            <div class="dropdown-item cancel" on:click={closeAssignmentDropdown}>
                Cancel
            </div>
        </div>
    {/if}

    <div class="pagination">
        <span class="page-info">Page 1 of 10</span>
        <div class="page-controls">
            <button class="page-btn prev">
                Previous
            </button>
            <button class="page-btn next">
                Next
            </button>
        </div>
    </div>
</div>

<style>
    .project-management-container {
        padding: 1.5rem;
        background-color: #f0f2f5;
        min-height: calc(100vh - 3rem);
    }

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    h1 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #212529;
        margin: 0;
    }

    /* Staff Type Tabs */
    .staff-tabs {
        display: flex;
        margin-bottom: 1.5rem;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .tab-btn {
        padding: 0.5rem 1rem;
        background-color: #f1f3f5;
        color: #595959;
        border: none;
        border-radius: 4px;
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .tab-btn.active {
        background-color: #e9ecef;
        color: #212529;
        font-weight: 500;
    }

    .tab-btn:hover {
        background-color: #e9ecef;
    }

    .project-list {
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        overflow-x: auto;
        margin-bottom: 1.5rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
        padding: 0.75rem 1rem;
        text-align: left;
        border-bottom: 1px solid #e9ecef;
        font-size: 0.875rem;
        color: #2c3e50;
    }

    th {
        font-weight: 600;
        color: #495057;
        background-color: white;
        cursor: pointer;
        user-select: none;
        position: relative;
        border-bottom: 1px solid #dee2e6;
    }

    th:hover {
        background-color: #f8f9fa;
    }

    .sort-icon {
        margin-left: 0.25rem;
        color: #6c757d;
    }

    .address-cell {
        font-weight: 500;
        color: #212529;
    }

    .unassigned-row td {
        background-color: #fafafa;
    }

    .assignee-cell {
        position: relative;
    }

    .assignee-cell.unassigned {
        cursor: pointer;
    }

    .assign-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        color: #2c73dd;
        font-size: 0.75rem;
        cursor: pointer;
    }

    .assign-btn svg {
        width: 14px;
        height: 14px;
    }

    /* Assignment Dropdown */
    .assignment-dropdown {
        position: absolute;
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        z-index: 100;
        min-width: 150px;
        overflow: hidden;
    }

    .dropdown-item {
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: background-color 0.2s;
        font-size: 0.875rem;
    }

    .dropdown-item:hover {
        background-color: #f8f9fa;
    }

    .dropdown-item.cancel {
        border-top: 1px solid #e9ecef;
        color: #6c757d;
    }

    .pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.875rem;
        color: #6c757d;
    }

    .page-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .page-btn {
        padding: 0.5rem 1rem;
        background-color: white;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        font-size: 0.75rem;
        color: #495057;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .page-btn:hover {
        background-color: #f8f9fa;
    }

    @media (max-width: 768px) {
        .page-header {
            flex-direction: column;
            align-items: flex-start;
        }

        .pagination {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
        }
    }
</style>

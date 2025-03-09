<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // Project type interface
    interface Project {
        id: string;
        address: string;
        fullAddress: string;
        client: string;
        city: string;
        totalPayment: number;
        deadline: string;
        category: "Photography" | "Field Assessor";
        status: "Available" | "In Progress" | "Completed" | "Uploaded";
        projectType?: string;
        paymentStatus?: "Paid" | "Pending" | "Partial";
        addedFeatures?: boolean;
        description: string;
        images: string[];
        files: {
            name: string;
            type: string;
            size: string;
            url: string;
        }[];
    }

    // Sample projects data
    let projects: Project[] = [
        {
            id: "1",
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            totalPayment: 250,
            deadline: "2024 - 12 - 12",
            category: "Photography",
            status: "Available",
            description:
                "Property photography needed for a 4-bedroom house. Must include exterior shots, all rooms, and garden area.",
            images: [
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            ],
            files: [
                {
                    name: "Project Brief.pdf",
                    type: "pdf",
                    size: "1.2 MB",
                    url: "#",
                },
                {
                    name: "Property Details.docx",
                    type: "docx",
                    size: "842 KB",
                    url: "#",
                },
            ],
        },
        {
            id: "2",
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            totalPayment: 250,
            deadline: "2024 - 12 - 12",
            category: "Photography",
            status: "Available",
            description:
                "Property photography needed for a 3-bedroom house. Must include exterior shots, all rooms, and kitchen area.",
            images: [
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            ],
            files: [
                {
                    name: "Project Brief.pdf",
                    type: "pdf",
                    size: "1.5 MB",
                    url: "#",
                },
            ],
        },
        {
            id: "3",
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            totalPayment: 250,
            deadline: "2024 - 12 - 12",
            category: "Photography",
            status: "Available",
            description:
                "Property photography needed for a 2-bedroom apartment. Must include all rooms and building entrance.",
            images: [
                "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            ],
            files: [
                {
                    name: "Project Brief.pdf",
                    type: "pdf",
                    size: "1.1 MB",
                    url: "#",
                },
            ],
        },
        {
            id: "4",
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            totalPayment: 250,
            deadline: "2024 - 12 - 12",
            category: "Photography",
            status: "Available",
            description:
                "Property photography needed for a 5-bedroom house. Must include all rooms, garden, and exterior shots.",
            images: [
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            ],
            files: [
                {
                    name: "Project Brief.pdf",
                    type: "pdf",
                    size: "1.7 MB",
                    url: "#",
                },
            ],
        },
        {
            id: "5",
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            totalPayment: 250,
            deadline: "2024 - 12 - 12",
            category: "Field Assessor",
            status: "Uploaded",
            projectType: "Edit",
            paymentStatus: "Paid",
            addedFeatures: true,
            description:
                "Property assessment needed for a 4-bedroom house. Must include measurements of all rooms and assessment of property condition.",
            images: [
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            ],
            files: [
                {
                    name: "Assessment Template.pdf",
                    type: "pdf",
                    size: "2.1 MB",
                    url: "#",
                },
            ],
        },
        {
            id: "6",
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            totalPayment: 250,
            deadline: "2024 - 12 - 12",
            category: "Field Assessor",
            status: "Available",
            projectType: "Edit",
            paymentStatus: "Pending",
            addedFeatures: false,
            description:
                "Property assessment needed for a 3-bedroom house. Must include measurements and condition assessment.",
            images: [
                "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            ],
            files: [
                {
                    name: "Assessment Template.pdf",
                    type: "pdf",
                    size: "1.8 MB",
                    url: "#",
                },
            ],
        },
        {
            id: "7",
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            totalPayment: 250,
            deadline: "2024 - 12 - 12",
            category: "Field Assessor",
            status: "Uploaded",
            projectType: "Edit",
            paymentStatus: "Paid",
            addedFeatures: false,
            description:
                "Property assessment needed for a 2-bedroom apartment. Must include measurements and condition assessment.",
            images: [
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            ],
            files: [
                {
                    name: "Assessment Template.pdf",
                    type: "pdf",
                    size: "1.6 MB",
                    url: "#",
                },
            ],
        },
        {
            id: "8",
            address: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            client: "Aktons",
            city: "Birmingham",
            totalPayment: 250,
            deadline: "2024 - 12 - 12",
            category: "Field Assessor",
            status: "Uploaded",
            projectType: "Edit",
            paymentStatus: "Paid",
            addedFeatures: false,
            description:
                "Property assessment needed for a 4-bedroom house. Must include detailed room measurements and condition report.",
            images: [
                "https://images.unsplash.com/photo-1603460217557-74442ead12dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            ],
            files: [
                {
                    name: "Assessment Template.pdf",
                    type: "pdf",
                    size: "2.2 MB",
                    url: "#",
                },
            ],
        },
    ];

    // UI State
    let selectedCategory: "Photography" | "Field Assessor" = "Photography";
    let filteredProjects: Project[] = [];
    let selectedProject: Project | null = null;
    let showProjectDetails = false;
    let showAcceptanceAgreement = false;
    let agreementAccepted = false;
    let searchQuery = "";

    // Pagination
    let currentPage = 1;
    let itemsPerPage = 10;
    let totalPages = 1;

    // Sorting
    type SortField =
        | "address"
        | "client"
        | "city"
        | "totalPayment"
        | "deadline";
    let sortField: SortField = "address";
    let sortDirection: "asc" | "desc" = "asc";

    // Filter projects by category and search
    function filterProjects() {
        let filtered = projects.filter((p) => p.category === selectedCategory);

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.address.toLowerCase().includes(query) ||
                    p.client.toLowerCase().includes(query) ||
                    p.city.toLowerCase().includes(query),
            );
        }

        return sortProjects(filtered);
    }

    // Sort projects
    function sortProjects(projects: Project[]) {
        return [...projects].sort((a, b) => {
            let valueA = a[sortField];
            let valueB = b[sortField];

            // Convert to comparable values
            if (typeof valueA === "string") valueA = valueA.toLowerCase();
            if (typeof valueB === "string") valueB = valueB.toLowerCase();

            if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
            if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }

    // Update displayed projects
    function updateDisplayedProjects() {
        filteredProjects = filterProjects();
        totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

        // Adjust current page if needed
        if (currentPage > totalPages) {
            currentPage = Math.max(1, totalPages);
        }

        // Slice for pagination
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(
            startIndex + itemsPerPage,
            filteredProjects.length,
        );
        filteredProjects = filteredProjects.slice(startIndex, endIndex);
    }

    // Change category
    function changeCategory(category: "Photography" | "Field Assessor") {
        selectedCategory = category;
        currentPage = 1;
        updateDisplayedProjects();
    }

    // Toggle sort direction for a field
    function toggleSort(field: SortField) {
        if (sortField === field) {
            sortDirection = sortDirection === "asc" ? "desc" : "asc";
        } else {
            sortField = field;
            sortDirection = "asc";
        }
        updateDisplayedProjects();
    }

    // View project details
    function viewProjectDetails(project: Project) {
        selectedProject = project;
        showProjectDetails = true;
    }

    // Close project details
    function closeProjectDetails() {
        showProjectDetails = false;
    }

    // Book a new project
    function bookNewProject() {
        goto("/booking");
    }

    // Show acceptance agreement
    function showAgreement() {
        if (selectedProject) {
            showAcceptanceAgreement = true;
            agreementAccepted = false;
        }
    }

    // Close acceptance agreement
    function closeAgreement() {
        showAcceptanceAgreement = false;
    }

    // Accept project after agreement
    function acceptProject() {
        if (!agreementAccepted) {
            alert(
                "Please confirm that you accept the terms by checking the box.",
            );
            return;
        }

        alert(
            `You have successfully accepted the project: ${selectedProject?.address}`,
        );
        closeAgreement();
        closeProjectDetails();
        // Here you would typically update the project status in your database
    }

    // Download file
    function downloadFile(file: { name: string; url: string }) {
        alert(`Downloading ${file.name}...`);
    }

    // Format currency
    function formatCurrency(amount: number) {
        return `£ ${amount}`;
    }

    // Pagination functions
    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
            updateDisplayedProjects();
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            updateDisplayedProjects();
        }
    }

    // Add feature to project
    function addFeature(projectId: string, event: Event) {
        event.stopPropagation();
        const project = projects.find((p) => p.id === projectId);
        if (project) {
            project.addedFeatures = true;
            alert("Feature has been added to the project.");
            // Update the UI to reflect the change
            updateDisplayedProjects();
        }
    }

    // Handle edit button click
    function handleEditClick(projectId: string, event: Event) {
        event.stopPropagation();
        alert(`Editing project ${projectId}`);
        // In a real application, this might navigate to an edit page
        // goto(`/projects/edit/${projectId}`);
    }

    // Handle status change
    function handleStatusChange(
        projectId: string,
        status: string,
        event: Event,
    ) {
        event.stopPropagation();
        const project = projects.find((p) => p.id === projectId);
        if (project) {
            project.status = status as any;
            alert(`Project status updated to: ${status}`);
            // Update the UI to reflect the change
            updateDisplayedProjects();
        }
    }

    onMount(() => {
        // Check authentication
        authStore.init();

        if (!authStore.user) {
            goto("/login");
            return;
        }

        updateDisplayedProjects();
    });
</script>

<div class="projects-container">
    <div class="header-container">
        <div class="page-header">
            <h1>All Available Projects</h1>
            <p class="subtitle">View project by category</p>
        </div>

        <div class="user-profile">
            <div class="profile-info">
                <span>Pathum Bandara</span>
                <span class="user-role">Photographer</span>
            </div>
            <div class="profile-avatar">
                <div class="avatar-placeholder">PB</div>
            </div>
        </div>
    </div>

    <!-- Category tabs -->
    <div class="category-tabs">
        <button
            class="category-tab {selectedCategory === 'Photography'
                ? 'active'
                : ''}"
            on:click={() => changeCategory("Photography")}
        >
            Photography
        </button>
        <button
            class="category-tab {selectedCategory === 'Field Assessor'
                ? 'active'
                : ''}"
            on:click={() => changeCategory("Field Assessor")}
        >
            Field Assessor
        </button>
    </div>

    <!-- Search bar -->
    <div class="search-container">
        <div class="search-box">
            <input
                type="text"
                placeholder="Search projects..."
                bind:value={searchQuery}
                on:input={updateDisplayedProjects}
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
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        </div>
    </div>

    <!-- Projects table -->
    <div class="projects-table-container">
        {#if filteredProjects.length > 0}
            <table class="projects-table">
                <thead>
                    <tr>
                        <th on:click={() => toggleSort("address")}>
                            Address
                            <span class="sort-icon"
                                >{sortField === "address"
                                    ? sortDirection === "asc"
                                        ? "↑"
                                        : "↓"
                                    : ""}</span
                            >
                        </th>
                        <th on:click={() => toggleSort("client")}>
                            Client
                            <span class="sort-icon"
                                >{sortField === "client"
                                    ? sortDirection === "asc"
                                        ? "↑"
                                        : "↓"
                                    : ""}</span
                            >
                        </th>
                        {#if selectedCategory === "Field Assessor"}
                            <th> Project Type </th>
                            <th> Payments </th>
                            <th> Status </th>
                        {:else}
                            <th on:click={() => toggleSort("city")}>
                                City
                                <span class="sort-icon"
                                    >{sortField === "city"
                                        ? sortDirection === "asc"
                                            ? "↑"
                                            : "↓"
                                        : ""}</span
                                >
                            </th>
                            <th on:click={() => toggleSort("totalPayment")}>
                                Total payment
                                <span class="sort-icon"
                                    >{sortField === "totalPayment"
                                        ? sortDirection === "asc"
                                            ? "↑"
                                            : "↓"
                                        : ""}</span
                                >
                            </th>
                            <th on:click={() => toggleSort("deadline")}>
                                Deadline
                                <span class="sort-icon"
                                    >{sortField === "deadline"
                                        ? sortDirection === "asc"
                                            ? "↑"
                                            : "↓"
                                        : ""}</span
                                >
                            </th>
                        {/if}
                    </tr>
                </thead>
                <tbody>
                    {#each filteredProjects as project}
                        <tr on:click={() => viewProjectDetails(project)}>
                            <td>
                                <div class="address-cell">
                                    <div class="main-address">
                                        {project.address}
                                    </div>
                                    <div class="full-address">
                                        {project.fullAddress}
                                    </div>
                                </div>
                            </td>
                            <td>{project.client}</td>

                            {#if selectedCategory === "Field Assessor"}
                                <td>
                                    <button
                                        class="edit-button"
                                        on:click={(e) =>
                                            handleEditClick(project.id, e)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <div
                                        class="payment-status {project.paymentStatus?.toLowerCase()}"
                                    >
                                        {project.paymentStatus}
                                    </div>
                                </td>
                                <td>
                                    <div class="status-cell">
                                        <div class="status-dropdown">
                                            <div
                                                class="status-indicator {project.status.toLowerCase()}"
                                            >
                                                {project.status}
                                            </div>
                                            <div class="dropdown-content">
                                                <div
                                                    class="dropdown-item"
                                                    on:click={(e) =>
                                                        handleStatusChange(
                                                            project.id,
                                                            "Available",
                                                            e,
                                                        )}
                                                >
                                                    Available
                                                </div>
                                                <div
                                                    class="dropdown-item"
                                                    on:click={(e) =>
                                                        handleStatusChange(
                                                            project.id,
                                                            "In Progress",
                                                            e,
                                                        )}
                                                >
                                                    In Progress
                                                </div>
                                                <div
                                                    class="dropdown-item"
                                                    on:click={(e) =>
                                                        handleStatusChange(
                                                            project.id,
                                                            "Uploaded",
                                                            e,
                                                        )}
                                                >
                                                    Uploaded
                                                </div>
                                                <div
                                                    class="dropdown-item"
                                                    on:click={(e) =>
                                                        handleStatusChange(
                                                            project.id,
                                                            "Completed",
                                                            e,
                                                        )}
                                                >
                                                    Completed
                                                </div>
                                            </div>
                                        </div>

                                        {#if !project.addedFeatures}
                                            <button
                                                class="feature-button"
                                                on:click={(e) =>
                                                    addFeature(project.id, e)}
                                            >
                                                Add/Buy Feature
                                            </button>
                                        {/if}
                                    </div>
                                </td>
                            {:else}
                                <td>{project.city}</td>
                                <td>{formatCurrency(project.totalPayment)}</td>
                                <td>{project.deadline}</td>
                            {/if}
                        </tr>
                    {/each}
                </tbody>
            </table>
        {:else}
            <div class="no-projects">
                <p>No projects found for the selected category.</p>
            </div>
        {/if}
    </div>

    <!-- Pagination -->
    <div class="pagination">
        <button
            class="pagination-btn prev-btn"
            disabled={currentPage === 1}
            on:click={prevPage}
        >
            Previous
        </button>
        <div class="page-info">
            Page {currentPage} of {totalPages}
        </div>
        <button
            class="pagination-btn next-btn"
            disabled={currentPage === totalPages}
            on:click={nextPage}
        >
            Next
        </button>
    </div>
</div>

<!-- Project details modal -->
{#if showProjectDetails && selectedProject}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal-overlay" on:click={closeProjectDetails}>
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="modal-content" on:click|stopPropagation>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="close-btn" on:click={closeProjectDetails}>
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
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            <div class="project-header">
                <h2>{selectedProject.address}</h2>
                <p class="full-address">{selectedProject.fullAddress}</p>
                <span class="project-category">{selectedProject.category}</span>
            </div>

            <div class="project-details">
                <div class="detail-row">
                    <div class="detail-item">
                        <span class="label">Client</span>
                        <span class="value">{selectedProject.client}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">City</span>
                        <span class="value">{selectedProject.city}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Payment</span>
                        <span class="value"
                            >{formatCurrency(
                                selectedProject.totalPayment,
                            )}</span
                        >
                    </div>
                    <div class="detail-item">
                        <span class="label">Deadline</span>
                        <span class="value">{selectedProject.deadline}</span>
                    </div>
                </div>
            </div>

            <div class="project-description">
                <h3>Project Description</h3>
                <p>{selectedProject.description}</p>
            </div>

            {#if selectedProject.images.length > 0}
                <div class="project-images">
                    <h3>Property Images</h3>
                    <div class="image-grid">
                        {#each selectedProject.images as image}
                            <div class="image-container">
                                <!-- svelte-ignore a11y_img_redundant_alt -->
                                <img src={image} alt="Property image" />
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}

            {#if selectedProject.files.length > 0}
                <div class="project-files">
                    <h3>Project Files</h3>
                    <div class="files-list">
                        {#each selectedProject.files as file}
                            <!-- svelte-ignore a11y_consider_explicit_label -->
                            <div class="file-item">
                                <div class="file-icon">
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
                                        <path
                                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                        />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                </div>
                                <div class="file-details">
                                    <div class="file-name">{file.name}</div>
                                    <div class="file-meta">
                                        {file.type.toUpperCase()} • {file.size}
                                    </div>
                                </div>
                                <button
                                    class="download-btn"
                                    on:click={() => downloadFile(file)}
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
                                        />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                </button>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}

            <div class="modal-actions">
                <button class="book-btn" on:click={bookNewProject}
                    >Book a Project</button
                >
                <button class="accept-btn" on:click={showAgreement}
                    >Accept Project</button
                >
            </div>
        </div>
    </div>
{/if}

<!-- Project Acceptance Agreement Modal -->
{#if showAcceptanceAgreement && selectedProject}
    <div class="modal-overlay" on:click|stopPropagation>
        <div class="agreement-modal">
            <h3>Project Acceptance Agreement</h3>

            <div class="agreement-content">
                <p>
                    By clicking "Accept", you confirm that you understand and
                    agree to the terms outlined below. Failure to adhere to
                    these commitments may result in penalties or removal from
                    future projects.
                </p>

                <p>
                    By accepting this project, you agree to comply with all
                    Digiprop policies regarding project delivery. Please read
                    the following statements and check box to confirm your
                    commitment:
                </p>

                <ol class="terms-list">
                    <li>
                        I will be on time for the appointment scheduled for this
                        project.
                    </li>
                    <li>
                        I will notify Digiprop if I have exceptional
                        circumstances that prevent me from attending the
                        scheduled appointment.
                    </li>
                    <li>
                        I will submit all required photos to the Digiprop portal
                        within the 24-hour time frame as required.
                    </li>
                    <li>
                        I will not share any confidential Digiprop details about
                        the client or customer with any third party.
                    </li>
                    <li>
                        I will act professionally in all interactions and
                        deliverables related to this project.
                    </li>
                </ol>

                <div class="agreement-checkbox">
                    <input
                        type="checkbox"
                        id="agreement-checkbox"
                        bind:checked={agreementAccepted}
                    />
                    <label for="agreement-checkbox"
                        >I confirm that I have read and agree to these terms</label
                    >
                </div>
            </div>

            <div class="agreement-actions">
                <button class="cancel-btn" on:click={closeAgreement}
                    >Cancel</button
                >
                <button class="accept-btn" on:click={acceptProject}
                    >Accept Project</button
                >
            </div>
        </div>
    </div>
{/if}

<style>
    .projects-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .page-header h1 {
        font-size: 24px;
        font-weight: 600;
        margin: 0 0 4px 0;
    }

    .subtitle {
        font-size: 14px;
        color: #6c757d;
        margin: 0;
    }

    .user-profile {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .profile-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .user-role {
        font-size: 12px;
        color: #6c757d;
    }

    .profile-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
    }

    .avatar-placeholder {
        width: 100%;
        height: 100%;
        background-color: #000;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: 14px;
    }

    /* Category tabs */
    .category-tabs {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
    }

    .category-tab {
        padding: 8px 16px;
        background-color: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .category-tab.active {
        background-color: #000;
        color: white;
        border-color: #000;
    }

    /* Search */
    .search-container {
        margin-bottom: 20px;
    }

    .search-box {
        position: relative;
        max-width: 300px;
    }

    .search-box input {
        width: 100%;
        padding: 10px 40px 10px 12px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 14px;
    }

    .search-box svg {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #6c757d;
    }

    /* Projects table */
    .projects-table-container {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        margin-bottom: 20px;
    }

    .projects-table {
        width: 100%;
        border-collapse: collapse;
    }

    .projects-table th {
        text-align: left;
        padding: 12px 16px;
        font-weight: 500;
        font-size: 14px;
        color: #495057;
        border-bottom: 1px solid #e9ecef;
        cursor: pointer;
        position: relative;
    }

    .projects-table th:hover {
        background-color: #f8f9fa;
    }

    .sort-icon {
        margin-left: 4px;
    }

    .projects-table td {
        padding: 16px;
        border-bottom: 1px solid #e9ecef;
        font-size: 14px;
    }

    .projects-table tbody tr {
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .projects-table tbody tr:hover {
        background-color: #f8f9fa;
    }

    .address-cell {
        display: flex;
        flex-direction: column;
    }

    .main-address {
        font-weight: 500;
        margin-bottom: 4px;
    }

    .full-address {
        font-size: 12px;
        color: #6c757d;
    }

    .no-projects {
        padding: 40px;
        text-align: center;
        color: #6c757d;
    }

    /* Pagination */
    .pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .pagination-btn {
        background: none;
        border: 1px solid #dee2e6;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        color: #212529;
        cursor: pointer;
        transition: all 0.2s;
    }

    .pagination-btn:hover:not(:disabled) {
        background-color: #f8f9fa;
    }

    .pagination-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .page-info {
        font-size: 14px;
        color: #6c757d;
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
        z-index: 1000;
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
        padding: 24px;
    }

    .close-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        background: none;
        border: none;
        cursor: pointer;
        color: #6c757d;
        z-index: 10;
    }

    .project-header {
        margin-bottom: 24px;
    }

    .project-header h2 {
        font-size: 24px;
        font-weight: 600;
        margin: 0 0 8px 0;
    }

    .project-category {
        display: inline-block;
        padding: 4px 8px;
        background-color: #f8f9fa;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        margin-top: 8px;
    }

    .project-details {
        margin-bottom: 24px;
    }

    .detail-row {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
    }

    .detail-item {
        flex: 1;
        min-width: 150px;
    }

    .detail-item .label {
        display: block;
        font-size: 12px;
        color: #6c757d;
        margin-bottom: 4px;
    }

    .detail-item .value {
        display: block;
        font-size: 14px;
        font-weight: 500;
    }

    .project-description {
        margin-bottom: 24px;
    }

    .project-description h3,
    .project-images h3,
    .project-files h3 {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 12px 0;
    }

    .project-description p {
        font-size: 14px;
        line-height: 1.5;
        color: #495057;
    }

    .project-images {
        margin-bottom: 24px;
    }

    .image-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
    }

    .image-container {
        aspect-ratio: 16/9;
        border-radius: 4px;
        overflow: hidden;
    }

    .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .project-files {
        margin-bottom: 24px;
    }

    .files-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .file-item {
        display: flex;
        align-items: center;
        padding: 12px;
        border: 1px solid #e9ecef;
        border-radius: 4px;
    }

    .file-icon {
        margin-right: 12px;
        color: #6c757d;
    }

    .file-details {
        flex: 1;
    }

    .file-name {
        font-weight: 500;
        margin-bottom: 4px;
    }

    .file-meta {
        font-size: 12px;
        color: #6c757d;
    }

    .download-btn {
        background: none;
        border: none;
        color: #212529;
        cursor: pointer;
        padding: 8px;
        border-radius: 4px;
        transition: all 0.2s;
    }

    .download-btn:hover {
        background-color: #f8f9fa;
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
    }

    .accept-btn {
        background-color: #000;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .accept-btn:hover {
        background-color: #212529;
    }

    /* Agreement Modal Styles */
    .agreement-modal {
        background-color: white;
        border-radius: 8px;
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        padding: 24px;
        margin: 0 auto;
    }

    .agreement-modal h3 {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 16px 0;
        text-align: center;
    }

    .agreement-content {
        margin-bottom: 24px;
    }

    .agreement-content p {
        font-size: 14px;
        line-height: 1.5;
        color: #333;
        margin-bottom: 16px;
    }

    .terms-list {
        padding-left: 20px;
        margin: 16px 0;
    }

    .terms-list li {
        font-size: 14px;
        margin-bottom: 10px;
        line-height: 1.4;
    }

    .agreement-checkbox {
        display: flex;
        align-items: center;
        margin-top: 20px;
        padding: 12px;
        background-color: #f8f9fa;
        border-radius: 4px;
    }

    .agreement-checkbox input[type="checkbox"] {
        margin-right: 10px;
        width: 18px;
        height: 18px;
        accent-color: #000;
    }

    .agreement-checkbox label {
        font-size: 14px;
        font-weight: 500;
    }

    .agreement-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
    }

    .cancel-btn {
        background: none;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        padding: 10px 20px;
        font-size: 14px;
        color: #212529;
        cursor: pointer;
        transition: all 0.2s;
    }

    .cancel-btn:hover {
        background-color: #f8f9fa;
    }

    /* Field Assessor specific styles */
    .edit-button {
        background-color: #000;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 5px 15px;
        font-size: 14px;
        cursor: pointer;
    }

    .edit-button:hover {
        background-color: #333;
    }

    .feature-button {
        background-color: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 12px;
        color: #212529;
        cursor: pointer;
        white-space: nowrap;
        margin-top: 5px;
    }

    .feature-button:hover {
        background-color: #e2e6ea;
    }

    .payment-status {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
    }

    .payment-status.paid {
        background-color: #d1e7dd;
        color: #0f5132;
    }

    .payment-status.pending {
        background-color: #fff3cd;
        color: #856404;
    }

    .payment-status.partial {
        background-color: #cff4fc;
        color: #055160;
    }

    .status-cell {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }

    .status-dropdown {
        position: relative;
        display: inline-block;
    }

    .status-indicator {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
    }

    .status-indicator.available {
        background-color: #cff4fc;
        color: #055160;
    }

    .status-indicator.in.progress {
        background-color: #fff3cd;
        color: #856404;
    }

    .status-indicator.uploaded {
        background-color: #d1e7dd;
        color: #0f5132;
    }

    .status-indicator.completed {
        background-color: #d1e7dd;
        color: #0f5132;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 120px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
        border-radius: 4px;
    }

    .status-dropdown:hover .dropdown-content {
        display: block;
    }

    .dropdown-item {
        padding: 8px 12px;
        cursor: pointer;
        font-size: 12px;
    }

    .dropdown-item:hover {
        background-color: #f1f1f1;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .header-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
        }

        .user-profile {
            align-self: flex-end;
        }

        .detail-row {
            flex-direction: column;
        }

        .projects-table {
            display: block;
            overflow-x: auto;
        }

        .projects-table th,
        .projects-table td {
            white-space: nowrap;
        }
    }
</style>

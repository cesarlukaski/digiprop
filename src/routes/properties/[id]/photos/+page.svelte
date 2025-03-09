<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { authStore } from "$lib/api";

    // Property data
    const propertyAddress = "78 Court Street, Tonypandy, CF 28L 0B";
    const propertyId = $page.params.id;

    // Sample photos data
    const photos = [
        {
            id: 1,
            url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            title: "Front Exterior",
        },
        {
            id: 2,
            url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            title: "Living Room",
        },
        {
            id: 3,
            url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            title: "Kitchen",
        },
        {
            id: 4,
            url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            title: "Dining Room",
        },
        {
            id: 5,
            url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            title: "Master Bedroom",
        },
        {
            id: 6,
            url: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            title: "Bedroom 2",
        },
        {
            id: 7,
            url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            title: "Bathroom",
        },
        {
            id: 8,
            url: "https://images.unsplash.com/photo-1603460217557-74442ead12dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            title: "Backyard",
        },
        {
            id: 9,
            url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            title: "Garage",
        },
        {
            id: 10,
            url: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            title: "Office",
        },
        {
            id: 11,
            url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            title: "Patio",
        },
        {
            id: 12,
            url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            title: "Garden",
        },
        {
            id: 13,
            url: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            title: "Study",
        },
        {
            id: 14,
            url: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            title: "Hall",
        },
        {
            id: 15,
            url: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            title: "Entrance",
        },
    ];

    // Selected photo for modal view
    let selectedPhoto: any = null;
    let modalOpen = false;

    // Navigation items
    const navItems = [
        {
            id: "all-property",
            label: "All Property",
            icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
            active: true,
        },
        {
            id: "playground",
            label: "Playground",
            icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            active: false,
        },
        {
            id: "diary",
            label: "Diary",
            icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
            active: false,
        },
        {
            id: "valuation",
            label: "Valuation",
            icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
            active: false,
        },
        {
            id: "settings",
            label: "Settings",
            icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
            active: false,
        },
    ];

    // User profile
    const user = {
        name: "Akuna",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    };

    // Download a single photo
    function downloadPhoto(photo: any) {
        const link = document.createElement("a");
        link.href = photo.url;
        link.download = `property-${propertyId}-${photo.title.toLowerCase().replace(/\s+/g, "-")}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Download all photos as zip
    function downloadAllPhotos() {
        alert(
            "Downloading all photos (in a real app, this would create a zip file)",
        );
    }

    // Open photo in modal
    function openModal(photo: any) {
        selectedPhoto = photo;
        modalOpen = true;
    }

    // Close modal
    function closeModal() {
        modalOpen = false;
        setTimeout(() => {
            selectedPhoto = null;
        }, 300);
    }

    // Navigate to a different section
    function navigateTo(itemId: string) {
        if (itemId === "all-property") {
            goto("/properties");
        } else {
            goto(`/${itemId}`);
        }
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

<div class="photos-container">
    <div class="breadcrumb">
        <p>Dashboard / 2D Enhanced photos</p>
    </div>

    <div class="photos-content">
        <!-- Header with property overview -->
        <div class="page-header">
            <div class="header-title">
                <h1>2D Enhanced photos</h1>
                <p class="header-address">{propertyAddress}</p>
            </div>
            <div class="header-actions">
                <button class="action-btn secondary-btn" on:click={goBack}
                    >Back</button
                >
                <button
                    class="action-btn primary-btn"
                    on:click={downloadAllPhotos}
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
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                        ></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Photo gallery grid -->
        <div class="gallery-container">
            <div class="photo-grid">
                {#each photos as photo}
                    <div class="photo-item">
                        <div class="photo-square">
                            <button
                                class="photo-button"
                                on:click={() => openModal(photo)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="camera-icon"
                                >
                                    <path
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<!-- Photo modal -->
{#if modalOpen}
    <div class="modal-overlay" on:click={closeModal}>
        <div class="modal-content" on:click|stopPropagation>
            <!-- Close button -->
            <button class="modal-close-btn" on:click={closeModal}>
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
                    <path d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <!-- Image -->
            <div class="modal-image-container">
                <img
                    src={selectedPhoto?.url}
                    alt={selectedPhoto?.title}
                    class="modal-image"
                />
                <div class="modal-footer">
                    <h3 class="modal-title">
                        {selectedPhoto?.title}
                    </h3>
                    <button
                        class="download-btn"
                        on:click={() => downloadPhoto(selectedPhoto)}
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
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                            ></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .photos-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .breadcrumb {
        font-size: 12px;
        color: #6c757d;
        margin-bottom: 20px;
    }

    .photos-content {
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

    .gallery-container {
        padding: 20px;
    }

    .photo-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 20px;
    }

    .photo-item {
        width: 100%;
    }

    .photo-square {
        position: relative;
        width: 100%;
        padding-top: 100%; /* 1:1 Aspect Ratio */
        border: 1px solid #dee2e6;
        border-radius: 4px;
        overflow: hidden;
    }

    .photo-button {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .photo-button:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    .camera-icon {
        color: #6c757d;
    }

    /* Modal styles */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
    }

    .modal-content {
        background-color: white;
        border-radius: 8px;
        max-width: 900px;
        width: 100%;
        max-height: 90vh;
        position: relative;
        overflow: hidden;
    }

    .modal-close-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        background-color: rgba(255, 255, 255, 0.8);
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
    }

    .modal-close-btn:hover {
        background-color: white;
    }

    .modal-image-container {
        width: 100%;
    }

    .modal-image {
        width: 100%;
        max-height: 70vh;
        object-fit: contain;
        display: block;
    }

    .modal-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;
        border-top: 1px solid #f1f3f5;
    }

    .modal-title {
        font-size: 18px;
        font-weight: 500;
        margin: 0;
    }

    .download-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background-color: #000;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
    }

    .download-btn:hover {
        background-color: #212529;
    }

    @media (max-width: 1200px) {
        .photo-grid {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    @media (max-width: 992px) {
        .photo-grid {
            grid-template-columns: repeat(3, 1fr);
        }
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

        .photo-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 480px) {
        .photo-grid {
            grid-template-columns: 1fr;
        }
    }
</style>

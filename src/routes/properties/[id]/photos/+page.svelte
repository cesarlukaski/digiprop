<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { authStore } from "$lib/api";

    // Property data
    const propertyAddress = "78 Court Street Tonypandy, CF 2RL 0B";
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

    onMount(() => {
        // Check authentication
        authStore.init();

        if (!authStore.user) {
            goto("/login");
            return;
        }
    });
</script>

<div class="flex h-screen bg-gray-100">
    <!-- Sidebar navigation -->
    <div
        class="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6"
    >
        <div class="space-y-8">
            {#each navItems as item}
                <button
                    class="flex flex-col items-center justify-center w-12 h-12 rounded-full {item.active
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-50'}"
                    on:click={() => navigateTo(item.id)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d={item.icon}
                        />
                    </svg>
                    <span class="text-xs text-gray-500 mt-1">{item.label}</span>
                </button>
            {/each}
        </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 overflow-auto">
        <!-- Header with breadcrumb and user profile -->
        <div
            class="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white"
        >
            <div class="flex items-center text-sm text-gray-600">
                <a href="/properties" class="hover:text-gray-900">Dashboard</a>
                <span class="mx-2">/</span>
                <span>2D Enhanced photos</span>
            </div>
            <div class="flex items-center">
                <span class="mr-2 text-sm font-medium">{user.name}</span>
                <div class="w-8 h-8 rounded-full overflow-hidden">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        class="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>

        <!-- Content area -->
        <div class="p-6">
            <!-- Property info and actions -->
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="text-xl font-medium">2D Enhanced photos</h1>
                    <p class="text-sm text-gray-500">
                        Address: {propertyAddress}
                    </p>
                </div>
                <button
                    on:click={downloadAllPhotos}
                    class="px-4 py-2 bg-black text-white rounded text-sm"
                >
                    Download
                </button>
            </div>

            <!-- Photo gallery - 5 columns grid -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
                <div class="grid grid-cols-5 gap-4">
                    {#each photos as photo}
                        <div class="relative group">
                            <div
                                class="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200"
                            >
                                <button
                                    on:click={() => openModal(photo)}
                                    class="w-full h-full flex items-center justify-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-8 w-8 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
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
</div>

<!-- Photo modal -->
{#if modalOpen}
    <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 transition-opacity"
        on:click={closeModal}
    >
        <div class="relative max-w-5xl max-h-full" on:click|stopPropagation>
            <!-- Close button -->
            <button
                class="absolute -top-10 right-0 text-white hover:text-gray-300"
                on:click={closeModal}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8"
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

            <!-- Image -->
            <div class="bg-white rounded-lg overflow-hidden shadow-xl">
                <img
                    src={selectedPhoto?.url}
                    alt={selectedPhoto?.title}
                    class="w-full h-auto max-h-[80vh] object-contain"
                />
                <div class="p-4 flex justify-between items-center bg-white">
                    <h3 class="text-lg font-medium text-gray-900">
                        {selectedPhoto?.title}
                    </h3>
                    <button
                        class="px-4 py-2 bg-black text-white rounded text-sm flex items-center"
                        on:click={() => downloadPhoto(selectedPhoto)}
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
    </div>
{/if}

<style>
    /* Aspect ratio utility for square images */
    .aspect-square {
        position: relative;
        padding-bottom: 100%; /* 1:1 aspect ratio */
    }

    .aspect-square > * {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>

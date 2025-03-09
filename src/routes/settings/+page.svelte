<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // User profile data
    let userData = {
        firstName: "Pathum",
        lastName: "Pathum",
        email: "Pathum@email.com",
        phone: "0779999999",
    };

    // Availability settings
    let availabilitySettings = [
        {
            day: "Monday",
            checked: true,
            startTime: "8:30 AM",
            endTime: "7:30 PM",
            hours: "11 Hours",
            available: true,
        },
        {
            day: "Tuesday",
            checked: true,
            startTime: "8:30 AM",
            endTime: "7:30 PM",
            hours: "11 Hours",
            available: true,
        },
        {
            day: "Wednesday",
            checked: true,
            startTime: "8:30 AM",
            endTime: "7:30 PM",
            hours: "11 Hours",
            available: true,
        },
        {
            day: "Thursday",
            checked: true,
            startTime: "8:30 AM",
            endTime: "7:30 PM",
            hours: "11 Hours",
            available: true,
        },
        {
            day: "Friday",
            checked: true,
            startTime: "8:30 AM",
            endTime: "7:30 PM",
            hours: "11 Hours",
            available: true,
        },
        {
            day: "Saturday",
            checked: false,
            startTime: "8:30 AM",
            endTime: "7:30 PM",
            hours: "Not available",
            available: false,
        },
        {
            day: "Sunday",
            checked: false,
            startTime: "8:30 AM",
            endTime: "7:30 PM",
            hours: "Not available",
            available: false,
        },
    ];

    // Navigation items
    const navItems = [
        {
            id: "available-projects",
            label: "Available Projects",
            icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
            active: false,
        },
        {
            id: "my-projects",
            label: "My Projects",
            icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
            active: false,
        },
        {
            id: "diary",
            label: "Diary",
            icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
            active: false,
        },
        {
            id: "payment",
            label: "Payment",
            icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z",
            active: false,
        },
        {
            id: "settings",
            label: "Settings",
            icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
            active: true,
        },
    ];

    // User profile
    const user = {
        name: "Pathum Bandara",
        role: "Photographer",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    };

    // Pagination
    let currentPage = 1;
    const totalPages = 10;

    // Navigate to a different section
    function navigateTo(itemId: string) {
        goto(`/${itemId}`);
    }

    // Handle form input changes
    function handleInputChange(field: string, value: string) {
        userData = { ...userData, [field]: value };
    }

    // Toggle day availability
    function toggleDay(index: number) {
        availabilitySettings[index].checked =
            !availabilitySettings[index].checked;
        availabilitySettings[index].available =
            availabilitySettings[index].checked;
        availabilitySettings[index].hours = availabilitySettings[index].checked
            ? "11 Hours"
            : "Not available";
        availabilitySettings = [...availabilitySettings];
    }

    // Navigate to previous page
    function goToPreviousPage() {
        if (currentPage > 1) {
            currentPage--;
        }
    }

    // Navigate to next page
    function goToNextPage() {
        if (currentPage < totalPages) {
            currentPage++;
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
    <div class="w-[145px] bg-white border-r border-gray-200 flex flex-col py-6">
        <div class="space-y-1 px-3">
            {#each navItems as item}
                <button
                    class="flex items-center w-full px-2 py-2 text-left rounded-md {item.active
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-50'}"
                    on:click={() => navigateTo(item.id)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 mr-3 text-gray-600"
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
                    <span class="text-sm text-gray-700">{item.label}</span>
                </button>
            {/each}
        </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 overflow-auto">
        <!-- Header with user profile -->
        <div
            class="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white"
        >
            <div class="flex items-center">
                <button class="mr-4 relative">
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
                            stroke-width="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                    <span
                        class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"
                    ></span>
                </button>
                <button class="mr-4">
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
                            stroke-width="2"
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                    </svg>
                </button>
            </div>
            <div class="flex items-center">
                <div class="mr-3 text-right">
                    <div class="text-sm font-medium">{user.name}</div>
                    <div class="text-xs text-gray-500">{user.role}</div>
                </div>
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
            <div class="max-w-4xl mx-auto">
                <!-- Settings header -->
                <div class="mb-6">
                    <h1 class="text-xl font-medium">Settings</h1>
                    <p class="text-sm text-gray-500">
                        Change settings for this property here.
                    </p>
                </div>

                <!-- Personal Information -->
                <div class="mb-8">
                    <h2 class="text-lg font-medium mb-4">
                        Personal Information
                    </h2>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="relative">
                            <label class="block text-xs text-gray-500 mb-1"
                                >First Name</label
                            >
                            <input
                                type="text"
                                value={userData.firstName}
                                on:input={(e) =>
                                    handleInputChange(
                                        "firstName",
                                        (e.target as HTMLInputElement).value,
                                    )}
                                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                            <button class="absolute right-2 top-7">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div class="relative">
                            <label class="block text-xs text-gray-500 mb-1"
                                >Last Name</label
                            >
                            <input
                                type="text"
                                value={userData.lastName}
                                on:input={(e) =>
                                    handleInputChange(
                                        "lastName",
                                        (e.target as HTMLInputElement).value,
                                    )}
                                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                            <button class="absolute right-2 top-7">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div class="relative">
                            <label class="block text-xs text-gray-500 mb-1"
                                >Email</label
                            >
                            <input
                                type="email"
                                value={userData.email}
                                on:input={(e) =>
                                    handleInputChange(
                                        "email",
                                        (e.target as HTMLInputElement).value,
                                    )}
                                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                            <button class="absolute right-2 top-7">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div class="relative">
                            <label class="block text-xs text-gray-500 mb-1"
                                >Phone Number</label
                            >
                            <input
                                type="tel"
                                value={userData.phone}
                                on:input={(e) =>
                                    handleInputChange(
                                        "phone",
                                        (e.target as HTMLInputElement).value,
                                    )}
                                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                            <button class="absolute right-2 top-7">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Set Availability -->
                <div class="mb-8">
                    <h2 class="text-lg font-medium mb-4">Set Availability</h2>
                    <div class="space-y-3">
                        {#each availabilitySettings as setting, index}
                            <div class="flex items-center">
                                <div class="w-1/4 flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`day-${index}`}
                                        class="h-4 w-4 text-black rounded border-gray-300 focus:ring-0"
                                        checked={setting.checked}
                                        on:change={() => toggleDay(index)}
                                    />
                                    <label
                                        for={`day-${index}`}
                                        class="ml-2 text-sm text-gray-700"
                                        >{setting.day}</label
                                    >
                                </div>
                                <div class="w-1/4 px-2">
                                    <div class="relative">
                                        <input
                                            type="text"
                                            value={setting.startTime}
                                            class="w-full p-2 pr-8 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                                            disabled={!setting.checked}
                                        />
                                        <button
                                            class="absolute right-2 top-2.5 text-gray-400"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-4 w-4"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div class="w-1/4 px-2">
                                    <div class="relative">
                                        <input
                                            type="text"
                                            value={setting.endTime}
                                            class="w-full p-2 pr-8 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                                            disabled={!setting.checked}
                                        />
                                        <button
                                            class="absolute right-2 top-2.5 text-gray-400"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-4 w-4"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div class="w-1/4 px-2">
                                    <span class="text-sm text-gray-700"
                                        >{setting.hours}</span
                                    >
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>

                <!-- Pagination -->
                <div
                    class="flex justify-between items-center mt-8 border-t border-gray-200 pt-4"
                >
                    <button
                        class="px-4 py-2 border border-gray-300 rounded text-sm {currentPage ===
                        1
                            ? 'text-gray-400'
                            : 'text-gray-700 hover:bg-gray-50'}"
                        on:click={goToPreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <div class="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </div>
                    <button
                        class="px-4 py-2 border border-gray-300 rounded text-sm {currentPage ===
                        totalPages
                            ? 'text-gray-400'
                            : 'text-gray-700 hover:bg-gray-50'}"
                        on:click={goToNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* Custom checkbox styling */
    input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        height: 16px;
        width: 16px;
        background-color: #fff;
        border: 1px solid #d1d5db;
        border-radius: 3px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    input[type="checkbox"]:checked {
        background-color: #000;
        border-color: #000;
    }

    input[type="checkbox"]:checked::after {
        content: "";
        display: block;
        width: 6px;
        height: 9px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }

    input[type="checkbox"]:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }

    /* Disabled input styling */
    input:disabled {
        background-color: #f9fafb;
        cursor: not-allowed;
    }
</style>

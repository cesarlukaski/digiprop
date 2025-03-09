<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // Personal information
    let firstName = "Pathum";
    let lastName = "Bandara";
    let email = "Pathum@gmail.com";
    let phoneNumber = "07799999999";

    // Availability settings
    interface DaySchedule {
        day: string;
        enabled: boolean;
        startTime: string;
        endTime: string;
        hours: string;
    }

    let availability: DaySchedule[] = [
        {
            day: "Monday",
            enabled: true,
            startTime: "8:30 AM",
            endTime: "7:30 PM",
            hours: "11 Hours",
        },
        {
            day: "Tuesday",
            enabled: true,
            startTime: "8:30 AM",
            endTime: "7:30 PM",
            hours: "11 Hours",
        },
        {
            day: "Wednesday",
            enabled: true,
            startTime: "8:30 AM",
            endTime: "7:30 PM",
            hours: "11 Hours",
        },
        {
            day: "Thursday",
            enabled: true,
            startTime: "8:30 AM",
            endTime: "7:30 PM",
            hours: "11 Hours",
        },
        {
            day: "Friday",
            enabled: true,
            startTime: "8:30 AM",
            endTime: "7:30 PM",
            hours: "11 Hours",
        },
        {
            day: "Saturday",
            enabled: false,
            startTime: "8:30 AM",
            endTime: "7:30 PM",
            hours: "Not available",
        },
        {
            day: "Sunday",
            enabled: false,
            startTime: "8:30 AM",
            endTime: "7:30 PM",
            hours: "Not available",
        },
    ];

    // Editing states
    let isEditingFirstName = false;
    let isEditingLastName = false;
    let isEditingEmail = false;
    let isEditingPhone = false;

    // Calculate hours between start and end time
    function calculateHours(startTime: string, endTime: string): string {
        if (!startTime || !endTime) return "0 Hours";

        const parseTime = (timeStr: string) => {
            const [time, modifier] = timeStr.split(" ");
            let [hours, minutes] = time.split(":");
            let hoursNum = parseInt(hours);

            if (modifier === "PM" && hoursNum < 12) hoursNum += 12;
            if (modifier === "AM" && hoursNum === 12) hoursNum = 0;

            return hoursNum + parseInt(minutes) / 60;
        };

        const start = parseTime(startTime);
        const end = parseTime(endTime);
        const diff = end - start;

        return diff <= 0 ? "0 Hours" : `${Math.round(diff)} Hours`;
    }

    // Update availability when time changes
    function updateAvailability(index: number) {
        if (availability[index].enabled) {
            availability[index].hours = calculateHours(
                availability[index].startTime,
                availability[index].endTime,
            );
        } else {
            availability[index].hours = "Not available";
        }
        availability = [...availability]; // Trigger reactivity
    }

    // Toggle day availability
    function toggleDay(index: number) {
        availability[index].enabled = !availability[index].enabled;
        updateAvailability(index);
    }

    // Start editing a field
    function startEditing(field: "firstName" | "lastName" | "email" | "phone") {
        switch (field) {
            case "firstName":
                isEditingFirstName = true;
                break;
            case "lastName":
                isEditingLastName = true;
                break;
            case "email":
                isEditingEmail = true;
                break;
            case "phone":
                isEditingPhone = true;
                break;
        }
        // Focus the input after a brief delay to allow for rendering
        setTimeout(() => {
            const input = document.getElementById(field);
            if (input) input.focus();
        }, 50);
    }

    // Save settings
    function saveSettings() {
        alert("Settings saved successfully!");
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

<div class="settings-container">
    <div class="settings-header">
        <h1>Settings</h1>
        <p class="subtitle">Update information for new property files</p>
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

    <div class="settings-content">
        <!-- Personal Information Section -->
        <section class="settings-section">
            <h2 class="section-title">Personal Information</h2>

            <div class="form-grid">
                <!-- First Name -->
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <div class="input-container">
                        {#if isEditingFirstName}
                            <input
                                id="firstName"
                                type="text"
                                bind:value={firstName}
                                on:blur={() => (isEditingFirstName = false)}
                                on:keydown={(e) =>
                                    e.key === "Enter" &&
                                    (isEditingFirstName = false)}
                            />
                        {:else}
                            <div class="input-display">
                                {firstName}
                            </div>
                            <button
                                class="edit-btn"
                                on:click={() => startEditing("firstName")}
                                aria-label="Edit first name"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path
                                        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                                    ></path>
                                    <path
                                        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                                    ></path>
                                </svg>
                            </button>
                        {/if}
                    </div>
                        </div>

                <!-- Last Name -->
                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <div class="input-container">
                        {#if isEditingLastName}
                            <input
                                id="lastName"
                                type="text"
                                bind:value={lastName}
                                on:blur={() => (isEditingLastName = false)}
                                on:keydown={(e) =>
                                    e.key === "Enter" &&
                                    (isEditingLastName = false)}
                            />
                        {:else}
                            <div class="input-display">
                                {lastName}
                            </div>
                            <button
                                class="edit-btn"
                                on:click={() => startEditing("lastName")}
                                aria-label="Edit last name"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path
                                        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                                    ></path>
                                    <path
                                        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                                    ></path>
                                </svg>
                            </button>
                        {/if}
                    </div>
                        </div>

                <!-- Email -->
                <div class="form-group">
                    <label for="email">Email</label>
                    <div class="input-container">
                        {#if isEditingEmail}
                            <input
                                id="email"
                                type="email"
                                bind:value={email}
                                on:blur={() => (isEditingEmail = false)}
                                on:keydown={(e) =>
                                    e.key === "Enter" &&
                                    (isEditingEmail = false)}
                            />
                        {:else}
                            <div class="input-display">
                                {email}
                            </div>
                            <button
                                class="edit-btn"
                                on:click={() => startEditing("email")}
                                aria-label="Edit email"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path
                                        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                                    ></path>
                                    <path
                                        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                                    ></path>
                                </svg>
                            </button>
                        {/if}
                    </div>
                        </div>

                <!-- Phone Number -->
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <div class="input-container">
                        {#if isEditingPhone}
                            <input
                                id="phone"
                                type="tel"
                                bind:value={phoneNumber}
                                on:blur={() => (isEditingPhone = false)}
                                on:keydown={(e) =>
                                    e.key === "Enter" &&
                                    (isEditingPhone = false)}
                            />
                        {:else}
                            <div class="input-display">
                                {phoneNumber}
                            </div>
                            <button
                                class="edit-btn"
                                on:click={() => startEditing("phone")}
                                aria-label="Edit phone number"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path
                                        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                                    ></path>
                                    <path
                                        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                                    ></path>
                                </svg>
                            </button>
                        {/if}
                    </div>
                </div>
            </div>
        </section>

        <!-- Availability Section -->
        <section class="settings-section">
            <h2 class="section-title">Set Availability</h2>

            <div class="availability-grid">
                {#each availability as day, i}
                    <div class="day-row">
                        <div class="day-checkbox">
                                    <input
                                        type="checkbox"
                                id={`day-${i}`}
                                bind:checked={day.enabled}
                                on:change={() => toggleDay(i)}
                            />
                            <label for={`day-${i}`}>{day.day}</label>
                                </div>

                        <div class="time-selector">
                            <div class="time-picker">
                                        <input
                                            type="text"
                                    value={day.startTime}
                                    on:input={(e) => {
                                        day.startTime = e.currentTarget.value;
                                        updateAvailability(i);
                                    }}
                                    disabled={!day.enabled}
                                        />
                                        <button
                                    class="time-edit-btn"
                                    disabled={!day.enabled}
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
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"
                                        ></polyline>
                                            </svg>
                                        </button>
                                    </div>

                            <div class="time-picker">
                                        <input
                                            type="text"
                                    value={day.endTime}
                                    on:input={(e) => {
                                        day.endTime = e.currentTarget.value;
                                        updateAvailability(i);
                                    }}
                                    disabled={!day.enabled}
                                        />
                                        <button
                                    class="time-edit-btn"
                                    disabled={!day.enabled}
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
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"
                                        ></polyline>
                                            </svg>
                                        </button>
                                    </div>

                            <div class="hours-display">
                                {day.hours}
                    </div>
                </div>
                    </div>
                {/each}
            </div>
        </section>
    </div>

    <!-- Bottom navigation -->
    <div class="settings-navigation">
        <button class="nav-btn prev-btn">Previous</button>
        <div class="page-indicator">Page 1 of 10</div>
        <button class="nav-btn next-btn">Next</button>
        </div>

    <!-- Save button - Fixed at bottom -->
    <div class="save-container">
        <button class="save-btn" on:click={saveSettings}>Save Changes</button>
    </div>
</div>

<style>
    .settings-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .settings-header {
        margin-bottom: 24px;
    }

    .settings-header h1 {
        font-size: 24px;
        font-weight: 600;
        margin: 0 0 4px 0;
    }

    .subtitle {
        font-size: 14px;
        color: #6c757d;
        margin: 0;
    }

    .settings-content {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        padding: 24px;
        margin-bottom: 60px; /* Space for the save button */
    }

    .settings-section {
        margin-bottom: 32px;
    }

    .section-title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 20px 0;
        color: #212529;
    }

    /* Form grid for personal information */
    .form-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    .form-group {
        margin-bottom: 16px;
    }

    label {
        display: block;
        font-size: 14px;
        color: #6c757d;
        margin-bottom: 8px;
    }

    .input-container {
        position: relative;
        display: flex;
        align-items: center;
    }

    input[type="text"],
    input[type="email"],
    input[type="tel"] {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 14px;
        color: #212529;
    }

    input[type="text"]:focus,
    input[type="email"]:focus,
    input[type="tel"]:focus {
        border-color: #80bdff;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    .input-display {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 14px;
        color: #212529;
        background-color: #f8f9fa;
    }

    .edit-btn {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #6c757d;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px;
    }

    .edit-btn:hover {
        color: #212529;
    }

    /* Availability grid */
    .availability-grid {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .day-row {
        display: grid;
        grid-template-columns: 150px 1fr;
        align-items: center;
        padding: 8px 0;
    }

    .day-checkbox {
        display: flex;
        align-items: center;
    }

    .day-checkbox input[type="checkbox"] {
        margin-right: 10px;
    }

    .time-selector {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
    }

    .time-picker {
        position: relative;
    }

    .time-picker input {
        width: 100%;
        padding: 10px 36px 10px 12px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 14px;
        text-align: center;
    }

    .time-picker input:disabled {
        background-color: #e9ecef;
        opacity: 0.6;
    }

    .time-edit-btn {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #6c757d;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .time-edit-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    .hours-display {
        padding: 10px 12px;
        font-size: 14px;
        color: #212529;
        text-align: center;
    }

    /* Navigation */
    .settings-navigation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
    }

    .nav-btn {
        background: none;
        border: 1px solid #dee2e6;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        color: #212529;
        cursor: pointer;
        transition: all 0.2s;
    }

    .nav-btn:hover {
        background-color: #f8f9fa;
    }

    .page-indicator {
        font-size: 14px;
        color: #6c757d;
    }

    /* Save button */
    .save-container {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: white;
        padding: 16px;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;
        z-index: 100;
    }

    .save-btn {
        background-color: #000;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px 24px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .save-btn:hover {
        background-color: #212529;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .form-grid {
            grid-template-columns: 1fr;
        }

        .time-selector {
            grid-template-columns: 1fr;
            gap: 8px;
        }

        .day-row {
            grid-template-columns: 1fr;
            gap: 8px;
        }

        .save-container {
            padding: 12px;
        }

        .save-btn {
            width: 100%;
        }
    }

    .user-profile {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 16px;
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

    /* Checkbox styles refinements */
    .day-checkbox input[type="checkbox"] {
        margin-right: 10px;
        width: 18px;
        height: 18px;
        accent-color: #000;
    }
</style>

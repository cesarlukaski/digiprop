<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // Personal details form data
    let firstName = "";
    let lastName = "";
    let title = "";
    let dateOfBirth = "";
    let gender = "";
    let email = "";
    let phone = "";
    let proofOfIdentity = "";

    // Calendar state
    let showCalendar = false;
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // Title options
    const titleOptions = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof"];

    // Gender options
    const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];

    // Form state
    let loading = false;
    let error = "";

    // Check if user is authenticated and is a partner
    onMount(() => {
        authStore.init();
        if (!authStore.user) {
            goto("/login");
            return;
        }

        if (authStore.user.userType !== "partner") {
            goto("/properties");
        }

        // Pre-fill email from user data
        email = authStore.user.email;

        // Split name into first and last if available
        if (authStore.user.name && authStore.user.name.includes(" ")) {
            const nameParts = authStore.user.name.split(" ");
            firstName = nameParts[0];
            lastName = nameParts.slice(1).join(" ");
        } else {
            firstName = authStore.user.name || "";
        }
    });

    // Handle date of birth selection
    function handleDateSelect(year: number, month: number, day: number) {
        dateOfBirth = `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        showCalendar = false;
    }

    // Get days in a month
    function getDaysInMonth(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate();
    }

    // Get day of week (0 = Sunday, 6 = Saturday)
    function getFirstDayOfMonth(year: number, month: number) {
        return new Date(year, month, 1).getDay();
    }

    // Generate calendar days for current month
    $: calendarDays = Array(getDaysInMonth(currentYear, currentMonth))
        .fill(0)
        .map((_, i) => i + 1);
    $: firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

    // Handle previous/next month
    function previousMonth() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
    }

    function nextMonth() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
    }

    // Format date for display
    function formatDate(dateString: string) {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    // Month names
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    async function handleSubmit() {
        // Validate form
        if (
            !firstName ||
            !lastName ||
            !dateOfBirth ||
            !gender ||
            !email ||
            !phone
        ) {
            error = "Please fill in all required fields";
            return;
        }

        loading = true;

        try {
            // In a real app, you would save the personal details to the user's profile
            // For now, we'll just simulate a delay and redirect
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Redirect to next step (current address)
            goto("/register/current-address");
        } catch (err) {
            error =
                (err as Error).message ||
                "Failed to save details. Please try again.";
        } finally {
            loading = false;
        }
    }
</script>

<div class="page-container">
    <div class="page-title">Personals Detail</div>

    <div class="personal-details-card">
        <div class="personal-details-content">
            <div class="progress-steps">
                <div class="step completed">
                    <div class="step-number">1</div>
                    <div class="step-label">Select your expertise</div>
                </div>
                <div class="step completed">
                    <div class="step-number">2</div>
                    <div class="step-label">Personals Detail</div>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-label">Current address</div>
                </div>
                <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-label">ID to verify</div>
                </div>
                <div class="step">
                    <div class="step-number">5</div>
                    <div class="step-label">Onboarding Core Complete</div>
                </div>
            </div>

            <div class="personal-details-header">
                <h1>Personals Details</h1>
            </div>

            {#if error}
                <div class="error-message">
                    <span>{error}</span>
                </div>
            {/if}

            <form
                on:submit|preventDefault={handleSubmit}
                class="personal-details-form"
            >
                <div class="name-fields">
                    <div class="form-group">
                        <label for="first-name">First Name</label>
                        <input
                            type="text"
                            id="first-name"
                            bind:value={firstName}
                            placeholder="First name"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div class="form-group">
                        <label for="last-name">Last Name</label>
                        <input
                            type="text"
                            id="last-name"
                            bind:value={lastName}
                            placeholder="Last Name"
                            required
                            disabled={loading}
                        />
                    </div>
                </div>

                <div class="detail-fields">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <div class="select-container">
                            <select
                                id="title"
                                bind:value={title}
                                disabled={loading}
                            >
                                <option value="" disabled selected
                                    >Select</option
                                >
                                {#each titleOptions as option}
                                    <option value={option}>{option}</option>
                                {/each}
                            </select>
                        </div>
                    </div>

                    <div class="form-group date-picker-container">
                        <label for="date-of-birth">Date of Birth</label>
                        <div class="date-input-container">
                            <input
                                type="text"
                                id="date-of-birth"
                                value={formatDate(dateOfBirth)}
                                placeholder="DD / MM / YYYY"
                                on:focus={() => (showCalendar = true)}
                                readonly
                                required
                                disabled={loading}
                            />
                            {#if showCalendar}
                                <div class="calendar-popup">
                                    <div class="calendar-header">
                                        <button
                                            type="button"
                                            class="calendar-nav"
                                            on:click={previousMonth}
                                            >&lt;</button
                                        >
                                        <div class="calendar-title">
                                            {monthNames[currentMonth]}
                                            {currentYear}
                                        </div>
                                        <button
                                            type="button"
                                            class="calendar-nav"
                                            on:click={nextMonth}>&gt;</button
                                        >
                                    </div>
                                    <div class="calendar-weekdays">
                                        <div>Mo</div>
                                        <div>Tu</div>
                                        <div>We</div>
                                        <div>Th</div>
                                        <div>Fr</div>
                                        <div>Sa</div>
                                        <div>Su</div>
                                    </div>
                                    <div class="calendar-days">
                                        {#each Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1) as _, i}
                                            <div
                                                class="calendar-day empty"
                                            ></div>
                                        {/each}
                                        {#each calendarDays as day}
                                            <div
                                                class="calendar-day"
                                                on:click={() =>
                                                    handleDateSelect(
                                                        currentYear,
                                                        currentMonth,
                                                        day,
                                                    )}
                                            >
                                                {day}
                                            </div>
                                        {/each}
                                    </div>
                                    <div class="calendar-footer">
                                        <button
                                            type="button"
                                            class="calendar-cancel"
                                            on:click={() =>
                                                (showCalendar = false)}
                                            >Cancel</button
                                        >
                                        <button
                                            type="button"
                                            class="calendar-apply"
                                            on:click={() =>
                                                (showCalendar = false)}
                                            >Apply</button
                                        >
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="gender">Gender</label>
                    <div class="select-container">
                        <select
                            id="gender"
                            bind:value={gender}
                            disabled={loading}
                        >
                            <option value="" disabled selected>Select</option>
                            {#each genderOptions as option}
                                <option value={option}>{option}</option>
                            {/each}
                        </select>
                    </div>
                </div>

                <div class="contact-fields">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            bind:value={email}
                            placeholder="example@mail.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            bind:value={phone}
                            placeholder="Add your mobile number"
                            required
                            disabled={loading}
                        />
                    </div>
                </div>

                <div class="form-group identity-proof">
                    <label
                        >Proof of identity <span class="optional"
                            >(Optional)</span
                        ></label
                    >
                    <div class="upload-container">
                        <p class="upload-text">
                            Please provide a copy of a photo ID in addition to
                            the proof of address that are shown in the picture.
                        </p>
                    </div>
                </div>

                <div class="action-buttons">
                    <button
                        type="submit"
                        class="next-button"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Next"}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    .page-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 100vh;
        background-color: #f9fafb;
        padding: 0;
    }

    .page-title {
        padding: 12px 16px;
        font-size: 14px;
        color: #6b7280;
        font-weight: 400;
        border-bottom: 1px solid #e5e7eb;
    }

    .personal-details-card {
        flex: 1;
        padding: 24px;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
    }

    .personal-details-content {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        padding: 24px;
    }

    .progress-steps {
        display: flex;
        justify-content: space-between;
        margin-bottom: 32px;
        padding-bottom: 24px;
        border-bottom: 1px solid #e5e7eb;
    }

    .step {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #6b7280;
    }

    .step.completed {
        color: #111827;
    }

    .step-number {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #e5e7eb;
        color: #6b7280;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
        font-weight: 500;
    }

    .step.completed .step-number {
        background-color: #111827;
        color: white;
    }

    .personal-details-header {
        margin-bottom: 24px;
    }

    .personal-details-header h1 {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
        color: #111827;
    }

    .error-message {
        background-color: #fee2e2;
        color: #b91c1c;
        padding: 12px 16px;
        border-radius: 6px;
        margin-bottom: 16px;
        font-size: 14px;
    }

    .personal-details-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .name-fields,
    .contact-fields,
    .detail-fields {
        display: flex;
        gap: 16px;
    }

    .name-fields .form-group,
    .contact-fields .form-group {
        flex: 1;
    }

    .detail-fields .form-group {
        width: 50%;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    label {
        font-size: 14px;
        font-weight: 500;
        color: #111827;
        margin-bottom: 8px;
    }

    input,
    select {
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        font-size: 14px;
    }

    .select-container {
        position: relative;
    }

    select {
        width: 100%;
        appearance: none;
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
        background-repeat: no-repeat;
        background-position: right 12px top 50%;
        background-size: 10px auto;
    }

    .date-picker-container {
        position: relative;
    }

    .date-input-container {
        position: relative;
    }

    .calendar-popup {
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 4px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        width: 300px;
        z-index: 10;
    }

    .calendar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px;
        border-bottom: 1px solid #e5e7eb;
    }

    .calendar-nav {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 16px;
        padding: 4px 8px;
    }

    .calendar-title {
        font-weight: 500;
        font-size: 14px;
    }

    .calendar-weekdays {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 2px;
        padding: 8px 12px;
        text-align: center;
        font-size: 12px;
        font-weight: 500;
        color: #6b7280;
    }

    .calendar-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 2px;
        padding: 0 12px 12px;
    }

    .calendar-day {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        font-size: 14px;
        cursor: pointer;
        border-radius: 4px;
    }

    .calendar-day:hover {
        background-color: #f3f4f6;
    }

    .calendar-day.empty {
        cursor: default;
    }

    .calendar-footer {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        padding: 12px;
        border-top: 1px solid #e5e7eb;
    }

    .calendar-cancel,
    .calendar-apply {
        background: none;
        border: none;
        padding: 6px 12px;
        font-size: 14px;
        border-radius: 4px;
        cursor: pointer;
    }

    .calendar-cancel {
        color: #6b7280;
    }

    .calendar-apply {
        background-color: #111827;
        color: white;
    }

    .identity-proof {
        margin-top: 8px;
    }

    .optional {
        font-weight: normal;
        color: #6b7280;
        font-size: 12px;
    }

    .upload-container {
        border: 1px dashed #d1d5db;
        border-radius: 4px;
        padding: 12px;
        text-align: center;
    }

    .upload-text {
        color: #6b7280;
        font-size: 14px;
        margin: 0;
    }

    .action-buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: 24px;
    }

    .next-button {
        padding: 8px 16px;
        background-color: #111827;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
    }

    .next-button:disabled {
        background-color: #9ca3af;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        .progress-steps {
            overflow-x: auto;
            padding-bottom: 16px;
            gap: 16px;
            justify-content: flex-start;
        }

        .step {
            flex-shrink: 0;
        }

        .name-fields,
        .contact-fields,
        .detail-fields {
            flex-direction: column;
        }

        .detail-fields .form-group {
            width: 100%;
        }
    }
</style>

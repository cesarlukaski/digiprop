<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // Address form data
    let postcode = "";
    let addressLine1 = "";
    let addressLine2 = "";
    let townCity = "";
    let county = "";
    let country = "";
    let dateMovedin = "";
    let proofOfAddress = "";

    // Calendar state
    let showCalendar = false;
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // Country options (simplified list - can be expanded)
    const countryOptions = [
        "United Kingdom",
        "United States",
        "Canada",
        "Australia",
        "France",
        "Germany",
        "Italy",
        "Spain",
        "Ireland",
        "Netherlands",
    ];

    // Form state
    let loading = false;
    let error = "";
    let searchingPostcode = false;

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
    });

    // Handle postcode search
    async function searchPostcode() {
        if (!postcode) {
            error = "Please enter a postcode";
            return;
        }

        searchingPostcode = true;

        try {
            // In a real app, you would call an API to search for addresses by postcode
            // For now, we'll just simulate a delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Simulate a successful search
            addressLine1 = "123 Example Street";
            townCity = "London";
            county = "Greater London";
            country = "United Kingdom";

            error = "";
        } catch (err) {
            error =
                (err as Error).message ||
                "Failed to search postcode. Please try again.";
        } finally {
            searchingPostcode = false;
        }
    }

    // Handle date moved in selection
    function handleDateSelect(year: number, month: number, day: number) {
        dateMovedin = `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
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
            !postcode ||
            !addressLine1 ||
            !townCity ||
            !country ||
            !dateMovedin
        ) {
            error = "Please fill in all required fields";
            return;
        }

        loading = true;

        try {
            // In a real app, you would save the address details to the user's profile
            // For now, we'll just simulate a delay and redirect
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Redirect to next step (Fit to Work)
            goto("/register/fit-to-work");
        } catch (err) {
            error =
                (err as Error).message ||
                "Failed to save address. Please try again.";
        } finally {
            loading = false;
        }
    }

    function goBack() {
        goto("/register/personal-details");
    }
</script>

<div class="page-container">
    <div class="address-card">
        <div class="address-content">
            <div class="progress-steps">
                <div class="step completed">
                    <div class="step-number">1</div>
                    <div class="step-label">Select your expertise</div>
                </div>
                <div class="step completed">
                    <div class="step-number">2</div>
                    <div class="step-label">Personals Detail</div>
                </div>
                <div class="step completed">
                    <div class="step-number">3</div>
                    <div class="step-label">Current Address</div>
                </div>
                <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-label">Fit to Work</div>
                </div>
                <div class="step">
                    <div class="step-number">5</div>
                    <div class="step-label">Onboarding Form Complete</div>
                </div>
            </div>

            <div class="address-header">
                <h1>Current Address</h1>
                <p>
                    We are required to collect a five year address history.
                    Please start with your current address.
                </p>
            </div>

            {#if error}
                <div class="error-message">
                    <span>{error}</span>
                </div>
            {/if}

            <form on:submit|preventDefault={handleSubmit} class="address-form">
                <div class="postcode-search">
                    <div class="form-group">
                        <label for="postcode">Postcode</label>
                        <div class="postcode-input">
                            <input
                                type="text"
                                id="postcode"
                                bind:value={postcode}
                                placeholder="Current postcode"
                                required
                                disabled={loading || searchingPostcode}
                            />
                            <!-- svelte-ignore a11y_consider_explicit_label -->
                            <button
                                type="button"
                                class="search-button"
                                on:click={searchPostcode}
                                disabled={loading || searchingPostcode}
                            >
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
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"
                                    ></line>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="address-line-1">Address Line 1</label>
                        <input
                            type="text"
                            id="address-line-1"
                            bind:value={addressLine1}
                            placeholder="Address line 1"
                            required
                            disabled={loading}
                        />
                    </div>
                </div>

                <div class="address-fields">
                    <div class="form-group">
                        <label for="address-line-2">Address Line 2</label>
                        <input
                            type="text"
                            id="address-line-2"
                            bind:value={addressLine2}
                            placeholder="Address line 2"
                            disabled={loading}
                        />
                    </div>

                    <div class="form-group">
                        <label for="town-city">Town/City</label>
                        <input
                            type="text"
                            id="town-city"
                            bind:value={townCity}
                            placeholder="City"
                            required
                            disabled={loading}
                        />
                    </div>
                </div>

                <div class="location-fields">
                    <div class="form-group">
                        <label for="county">County</label>
                        <input
                            type="text"
                            id="county"
                            bind:value={county}
                            placeholder="County"
                            disabled={loading}
                        />
                    </div>

                    <div class="form-group">
                        <label for="country">Country</label>
                        <div class="select-container">
                            <select
                                id="country"
                                bind:value={country}
                                required
                                disabled={loading}
                            >
                                <option value="" disabled selected
                                    >Country</option
                                >
                                {#each countryOptions as option}
                                    <option value={option}>{option}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>

                <div class="date-proof-fields">
                    <div class="form-group date-picker-container">
                        <label for="date-moved-in">Date Moved In</label>
                        <div class="date-input-container">
                            <input
                                type="text"
                                id="date-moved-in"
                                value={formatDate(dateMovedin)}
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
                                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                                            <!-- svelte-ignore a11y_no_static_element_interactions -->
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

                    <div class="form-group">
                        <label for="proof-of-address"
                            >Proof of Address <span class="info-icon">ⓘ</span
                            ></label
                        >
                        <div class="upload-container">
                            <div class="upload-box">
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
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                                <span>Upload proof of Address</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="action-buttons">
                    <button
                        type="button"
                        class="back-button"
                        on:click={goBack}
                        disabled={loading}
                    >
                        ← Go Back
                    </button>
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

    .address-card {
        flex: 1;
        padding: 24px;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
    }

    .address-content {
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

    .address-header {
        margin-bottom: 24px;
    }

    .address-header h1 {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
        color: #111827;
        margin-bottom: 8px;
    }

    .address-header p {
        font-size: 14px;
        color: #6b7280;
        margin: 0;
    }

    .error-message {
        background-color: #fee2e2;
        color: #b91c1c;
        padding: 12px 16px;
        border-radius: 6px;
        margin-bottom: 16px;
        font-size: 14px;
    }

    .address-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .postcode-search,
    .address-fields,
    .location-fields,
    .date-proof-fields {
        display: flex;
        gap: 16px;
    }

    .postcode-search .form-group,
    .address-fields .form-group,
    .location-fields .form-group,
    .date-proof-fields .form-group {
        flex: 1;
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
        display: flex;
        align-items: center;
    }

    .info-icon {
        color: #6b7280;
        margin-left: 4px;
        font-size: 12px;
    }

    input,
    select {
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        font-size: 14px;
    }

    .postcode-input {
        display: flex;
    }

    .postcode-input input {
        flex: 1;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .search-button {
        background-color: #111827;
        color: white;
        border: none;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        padding: 0 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .search-button:disabled {
        background-color: #9ca3af;
        cursor: not-allowed;
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

    .upload-container {
        border: 1px dashed #d1d5db;
        border-radius: 4px;
        padding: 12px;
    }

    .upload-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        cursor: pointer;
        padding: 16px;
        color: #6b7280;
        font-size: 14px;
    }

    .action-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
    }

    .back-button {
        padding: 8px 16px;
        background-color: white;
        color: #111827;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
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

    .next-button:disabled,
    .back-button:disabled {
        opacity: 0.7;
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

        .postcode-search,
        .address-fields,
        .location-fields,
        .date-proof-fields {
            flex-direction: column;
        }
    }
</style>

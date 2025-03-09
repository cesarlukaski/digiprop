<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // Form data
    let selectedService = "";
    let propertyType = "";
    let postcode = "";
    let propertyValue = 100000;
    let bedrooms = 1;
    let selectedDate = new Date();
    let selectedTimeSlot = "";
    let description = "";

    // Calendar state
    let currentMonth = new Date();
    let currentYear = currentMonth.getFullYear();
    let currentMonthName = currentMonth.toLocaleString("default", {
        month: "long",
    });
    let daysInMonth: Date[] = [];
    let weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    let timeSlots = [
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM",
        "6:00 PM",
    ];

    // Generate calendar days
    function generateCalendarDays() {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        // Get first day of the month
        const firstDay = new Date(year, month, 1);
        // Get the last day of the month
        const lastDay = new Date(year, month + 1, 0);

        // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
        let firstDayOfWeek = firstDay.getDay();
        // Convert to Monday = 0, Sunday = 6 format
        firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

        daysInMonth = [];

        // Add days from previous month to fill the first week
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const day = new Date(year, month - 1, prevMonthLastDay - i);
            daysInMonth.push(day);
        }

        // Add days from current month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const day = new Date(year, month, i);
            daysInMonth.push(day);
        }

        // Add days from next month to complete the grid (up to 42 cells for 6 weeks)
        const remainingDays = 42 - daysInMonth.length;
        for (let i = 1; i <= remainingDays; i++) {
            const day = new Date(year, month + 1, i);
            daysInMonth.push(day);
        }
    }

    // Navigate to prev month
    function prevMonth() {
        currentMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() - 1,
            1,
        );
        currentMonthName = currentMonth.toLocaleString("default", {
            month: "long",
        });
        currentYear = currentMonth.getFullYear();
        generateCalendarDays();
    }

    // Navigate to next month
    function nextMonth() {
        currentMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + 1,
            1,
        );
        currentMonthName = currentMonth.toLocaleString("default", {
            month: "long",
        });
        currentYear = currentMonth.getFullYear();
        generateCalendarDays();
    }

    // Select date
    function selectDate(day: Date) {
        selectedDate = day;
        selectedTimeSlot = ""; // Reset time slot when date changes
    }

    // Select time slot
    function selectTimeSlot(slot: string) {
        selectedTimeSlot = slot;
    }

    // Check if a date is today
    function isToday(date: Date): boolean {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    }

    // Check if a date is the selected date
    function isSelectedDate(date: Date): boolean {
        return (
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear()
        );
    }

    // Check if a date is in the current month
    function isCurrentMonth(date: Date): boolean {
        return date.getMonth() === currentMonth.getMonth();
    }

    // Format date for display
    function formatDate(date: Date): string {
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }

    // Handle form submission
    function handleBooking() {
        // Form validation
        if (!selectedService) {
            alert("Please select a service");
            return;
        }
        if (!propertyType) {
            alert("Please select a property type");
            return;
        }
        if (!postcode) {
            alert("Please enter a postcode");
            return;
        }
        if (!selectedTimeSlot) {
            alert("Please select a time slot");
            return;
        }

        // In a real app, you would submit this data to your backend
        console.log({
            service: selectedService,
            propertyType,
            postcode,
            propertyValue,
            bedrooms,
            date: selectedDate,
            timeSlot: selectedTimeSlot,
            description
        });

        // Redirect to contact details page
        goto("/booking/contact-details");
    }

    // Handle cancel
    function handleCancel() {
        goto("/available-projects");
    }

    // Initialize calendar on mount
    onMount(() => {
        // Check authentication
        authStore.init();

        if (!authStore.user) {
            goto("/login");
            return;
        }

        generateCalendarDays();
    });
</script>

<div class="container">
    <header class="header">
        <div class="logo">
            <img src="/logo.png" alt="DigiProp Logo" />
            <span>DIGIPROP</span>
        </div>
        <div class="nav-links">
            <a href="/">Home</a>
            <a href="/topics">Topics</a>
            <a href="/mentors">Mentors</a>
            <a href="/pricing">Pricing</a>
        </div>
        <div class="auth-buttons">
            <button class="sign-in-btn">Sign In</button>
        </div>
    </header>

    <main class="content">
        <div class="booking-form">
            <div class="form-row">
                <div class="form-group">
                    <label>Select your service</label>
                    <div class="select-wrapper">
                        <select bind:value={selectedService}>
                            <option value="">Select your service</option>
                            <option value="photography">Photography</option>
                            <option value="field-assessor">Field Assessor</option>
                            <option value="valuation">Valuation</option>
                        </select>
                        <div class="select-arrow"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Choose your property</label>
                    <div class="select-wrapper">
                        <select bind:value={propertyType}>
                            <option value="">Property type</option>
                            <option value="house">House</option>
                            <option value="flat">Flat/Apartment</option>
                            <option value="bungalow">Bungalow</option>
                            <option value="commercial">Commercial</option>
                        </select>
                        <div class="select-arrow"></div>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="postcode">Enter Postcode</label>
                    <input
                        type="text"
                        id="postcode"
                        placeholder="Enter Postcode"
                        bind:value={postcode}
                    />
                </div>
                <div class="form-group">
                    <label>Property value</label>
                    <div class="value-display">
                        <span class="currency">£</span>
                        <span class="value">{propertyValue.toLocaleString()}</span>
                    </div>
                    <input
                        type="range"
                        min="50000"
                        max="1000000"
                        step="10000"
                        bind:value={propertyValue}
                        class="range-slider"
                    />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Number of bedrooms</label>
                    <div class="bedroom-controls">
                        <button on:click={() => (bedrooms = Math.max(1, bedrooms - 1))}>-</button>
                        <span>{bedrooms}</span>
                        <button on:click={() => (bedrooms += 1)}>+</button>
                    </div>
                </div>
            </div>

            <div class="calendar-section">
                <div class="calendar">
                    <div class="calendar-header">
                        <button class="month-nav prev" on:click={prevMonth}>&#8249;</button>
                        <div class="month-display">
                            <span>{currentMonthName} {currentYear}</span>
                        </div>
                        <button class="month-nav next" on:click={nextMonth}>&#8250;</button>
                    </div>
                    <div class="calendar-days">
                        {#each weekDays as day}
                            <div class="weekday">{day}</div>
                        {/each}
                        {#each daysInMonth as day}
                            <button
                                class="day {isToday(day) ? 'today' : ''} 
                                       {isSelectedDate(day) ? 'selected' : ''} 
                                       {!isCurrentMonth(day) ? 'other-month' : ''}"
                                on:click={() => selectDate(day)}
                            >
                                {day.getDate()}
                            </button>
                        {/each}
                    </div>
                </div>

                <div class="time-selector">
                    <div class="time-header">
                        <span>Select a time for {formatDate(selectedDate)}</span>
                    </div>
                    <div class="time-slots">
                        {#each timeSlots as slot}
                            <button
                                class="time-slot {selectedTimeSlot === slot ? 'selected' : ''}"
                                on:click={() => selectTimeSlot(slot)}
                            >
                                {slot}
                            </button>
                        {/each}
                    </div>
                </div>
            </div>

            <div class="form-group description">
                <label for="description">Description <span class="optional">(optional)</span></label>
                <textarea
                    id="description"
                    rows="5"
                    placeholder="Add more details about service you wanted"
                    bind:value={description}
                ></textarea>
            </div>

            <div class="form-actions">
                <button class="cancel-btn" on:click={handleCancel}>Cancel</button>
                <button class="next-btn" on:click={handleBooking}>Next</button>
            </div>
        </div>
    </main>

    <footer class="footer">
        <img src="/rics-logo.png" alt="RICS Logo" class="rics-logo" />
    </footer>
</div>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        font-family: "Arial", sans-serif;
        background-color: white;
    }

    /* Header styles */
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0;
        margin-bottom: 40px;
    }

    .logo {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 18px;
    }

    .logo img {
        width: 36px;
        margin-right: 8px;
    }

    .nav-links {
        display: flex;
        gap: 20px;
    }

    .nav-links a {
        text-decoration: none;
        color: #333;
        font-weight: 500;
        font-size: 14px;
    }

    .sign-in-btn {
        background-color: #000;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
        cursor: pointer;
        font-size: 14px;
    }

    .content {
        max-width: 900px;
        margin: 0 auto;
    }

    .booking-form {
        background-color: #fff;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        margin-bottom: 40px;
    }

    .form-row {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
    }

    .form-group {
        flex: 1;
    }

    label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #333;
    }

    .select-wrapper {
        position: relative;
    }

    select {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        appearance: none;
        background-color: #fff;
        font-size: 16px;
    }

    .select-arrow {
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #333;
        pointer-events: none;
    }

    input[type="text"] {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
    }

    .value-display {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }

    .currency {
        font-weight: bold;
        margin-right: 5px;
    }

    .value {
        font-size: 18px;
        font-weight: 500;
    }

    .range-slider {
        width: 100%;
        margin-top: 8px;
    }

    .bedroom-controls {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .bedroom-controls button {
        width: 30px;
        height: 30px;
        border: 1px solid #ddd;
        background-color: #f8f9fa;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .bedroom-controls span {
        font-size: 18px;
        font-weight: 500;
    }

    .calendar-section {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
    }

    .calendar {
        flex: 1;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 15px;
    }

    .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    .month-nav {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #333;
    }

    .month-display {
        font-weight: 500;
        font-size: 18px;
    }

    .calendar-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 5px;
    }

    .weekday {
        text-align: center;
        font-weight: 500;
        padding: 5px;
        color: #666;
    }

    .day {
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: none;
        border-radius: 50%;
        cursor: pointer;
    }

    .day:hover {
        background-color: #f0f0f0;
    }

    .day.today {
        background-color: #f8f9fa;
        font-weight: bold;
    }

    .day.selected {
        background-color: #000;
        color: white;
    }

    .day.other-month {
        color: #bbb;
    }

    .time-selector {
        flex: 1;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 15px;
    }

    .time-header {
        margin-bottom: 15px;
        font-weight: 500;
    }

    .time-slots {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 10px;
    }

    .time-slot {
        padding: 10px;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: #fff;
        cursor: pointer;
    }

    .time-slot:hover {
        background-color: #f8f9fa;
    }

    .time-slot.selected {
        background-color: #000;
        color: white;
        border-color: #000;
    }

    .description {
        margin-bottom: 20px;
    }

    .optional {
        color: #999;
        font-weight: normal;
        font-size: 14px;
    }

    textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        resize: vertical;
        font-family: inherit;
        font-size: 16px;
    }

    .form-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
    }

    .cancel-btn {
        padding: 12px 24px;
        border: 1px solid #ddd;
        background-color: #fff;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
    }

    .next-btn {
        padding: 12px 24px;
        background-color: #000;
        color: white;
        border: none;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
    }

    .footer {
        display: flex;
        justify-content: center;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .rics-logo {
        height: 40px;
    }

    @media (max-width: 768px) {
        .form-row {
            flex-direction: column;
            gap: 0;
        }
        
        .header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
        }
        
        .nav-links {
            width: 100%;
            justify-content: space-between;
        }
        
        .auth-buttons {
            align-self: flex-end;
        }
        
        .calendar-section {
            flex-direction: column;
        }
    }
</style>

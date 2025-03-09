<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // User data
    let userData = {
        name: "Pathum Bandara",
        role: "Tech Expert",
    };

    // Current date
    const currentDate = new Date();
    let selectedDate = new Date();
    let selectedMonth = currentDate.getMonth();
    let selectedYear = currentDate.getFullYear();
    let selectedDay = currentDate.getDate();

    // Formatted today string for display
    const todayDateString = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    // Calendar days
    let calendarDays: Array<{
        day: number;
        isCurrentMonth: boolean;
        date: Date;
        isToday: boolean;
        isSelected: boolean;
    }> = [];

    // Week view days
    let weekDays: Array<{
        day: number;
        date: Date;
        isToday: boolean;
        dayName: string;
        monthDate: string;
    }> = [];

    // View mode
    let viewMode: "day" | "week" | "month" | "year" = "week";

    // Scheduled inventory event
    const scheduledEvent = {
        day: 22,
        time: "10:00 AM",
        title: "Inventory",
    };

    // Helper to format date
    function formatDate(date: Date, format: string): string {
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
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        if (format === "month-year") {
            return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        } else if (format === "short-month") {
            return monthNames[date.getMonth()].slice(0, 3);
        } else if (format === "day-name") {
            return dayNames[date.getDay()];
        } else if (format === "dd/mm/yyyy") {
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        }

        return "";
    }

    // Generate calendar days for the month
    function generateCalendarDays(month: number, year: number): void {
        calendarDays = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // First day of the month
        const firstDay = new Date(year, month, 1);
        let startingDayIndex = firstDay.getDay(); // 0 = Sunday

        // Adjust for Monday as first day of week
        if (startingDayIndex === 0) startingDayIndex = 7;
        startingDayIndex--;

        // Last day of the month
        const lastDay = new Date(year, month + 1, 0);
        const monthLength = lastDay.getDate();

        // Previous month days
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        // Fill in previous month days
        for (let i = startingDayIndex - 1; i >= 0; i--) {
            const day = prevMonthLastDay - i;
            const date = new Date(year, month - 1, day);
            calendarDays.push({
                day,
                isCurrentMonth: false,
                date,
                isToday: false,
                isSelected: false,
            });
        }

        // Fill in current month days
        for (let day = 1; day <= monthLength; day++) {
            const date = new Date(year, month, day);
            const isToday = date.toDateString() === today.toDateString();
            const isSelected =
                date.toDateString() === selectedDate.toDateString();

            calendarDays.push({
                day,
                isCurrentMonth: true,
                date,
                isToday,
                isSelected,
            });
        }

        // Fill in next month days to complete the grid
        const daysNeeded = 42 - calendarDays.length; // 6 rows x 7 days
        for (let day = 1; day <= daysNeeded; day++) {
            const date = new Date(year, month + 1, day);
            calendarDays.push({
                day,
                isCurrentMonth: false,
                date,
                isToday: false,
                isSelected: false,
            });
        }
    }

    // Generate week view days starting from Monday
    function generateWeekDays(date: Date): void {
        weekDays = [];
        const currentDay = date.getDay(); // 0 = Sunday
        let dayOffset = currentDay - 1; // For Monday as first day
        if (dayOffset < 0) dayOffset = 6; // If Sunday, go back 6 days to start from Monday

        const startDate = new Date(date);
        startDate.setDate(date.getDate() - dayOffset);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Generate 7 days starting from Monday
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            const isToday = currentDate.toDateString() === today.toDateString();
            const dayName = formatDate(currentDate, "day-name");
            const monthDate = currentDate.getDate().toString();

            weekDays.push({
                day: currentDate.getDate(),
                date: currentDate,
                isToday,
                dayName,
                monthDate,
            });
        }
    }

    // Time slots for the weekly view
    function generateTimeSlots(): string[] {
        const slots = [];
        for (let hour = 7; hour <= 17; hour++) {
            const period = hour >= 12 ? "PM" : "AM";
            const displayHour = hour > 12 ? hour - 12 : hour;
            slots.push(`${displayHour} ${period}`);
        }
        return slots;
    }

    const timeSlots = generateTimeSlots();

    // Go to previous month
    function prevMonth(): void {
        selectedMonth--;
        if (selectedMonth < 0) {
            selectedMonth = 11;
            selectedYear--;
        }
        generateCalendarDays(selectedMonth, selectedYear);
    }

    // Go to next month
    function nextMonth(): void {
        selectedMonth++;
        if (selectedMonth > 11) {
            selectedMonth = 0;
            selectedYear++;
        }
        generateCalendarDays(selectedMonth, selectedYear);
    }

    // Go to today
    function goToToday(): void {
        selectedDate = new Date();
        selectedMonth = selectedDate.getMonth();
        selectedYear = selectedDate.getFullYear();
        selectedDay = selectedDate.getDate();
        generateCalendarDays(selectedMonth, selectedYear);
        generateWeekDays(selectedDate);
    }

    // Select a date
    function selectDate(date: Date): void {
        selectedDate = date;
        selectedDay = date.getDate();
        generateCalendarDays(selectedMonth, selectedYear); // Regenerate to update selected status
        generateWeekDays(selectedDate);
    }

    // Go to previous week
    function prevWeek(): void {
        const prevWeek = new Date(selectedDate);
        prevWeek.setDate(selectedDate.getDate() - 7);
        selectedDate = prevWeek;
        generateWeekDays(selectedDate);
    }

    // Go to next week
    function nextWeek(): void {
        const nextWeek = new Date(selectedDate);
        nextWeek.setDate(selectedDate.getDate() + 7);
        selectedDate = nextWeek;
        generateWeekDays(selectedDate);
    }

    // Change view mode
    function setViewMode(mode: "day" | "week" | "month" | "year"): void {
        viewMode = mode;
    }

    // Photo capture events for today
    const photoCaptureEvents = [
        {
            time: "10:00 AM",
            title: "Inventory",
            location: "15 Court Street, Tonypandy, CF 28L 0B",
        },
    ];

    // Download diary
    function downloadDiary(): void {
        alert("Downloading diary...");
    }

    // Book a project
    function bookProject(): void {
        goto("/booking");
    }

    onMount(() => {
        authStore.init();

        if (!authStore.user) {
            goto("/login");
            return;
        }

        // Initialize calendar and week view
        generateCalendarDays(selectedMonth, selectedYear);
        generateWeekDays(selectedDate);
    });
</script>

<div class="diary-container">
    <div class="diary-header">
        <h1>Diary</h1>
        <div class="diary-actions">
            <button class="book-project-btn" on:click={bookProject}
                >Book A Project</button
            >
            <button class="download-diary-btn" on:click={downloadDiary}
                >Download Diary</button
            >

            <div class="user-info">
                <div class="user-avatar">
                    <div class="avatar-placeholder">
                        {userData.name.charAt(0)}
                    </div>
                </div>
                <div class="user-details">
                    <span class="user-name">{userData.name}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="diary-content">
        <!-- Left panel - Calendar -->
        <div class="calendar-panel">
                <!-- Calendar navigation -->
            <div class="calendar-header">
                <div class="calendar-title-container">
                    <button class="calendar-nav-btn" on:click={prevMonth}>
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
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <h2 class="calendar-title">
                        {formatDate(
                            new Date(selectedYear, selectedMonth),
                            "month-year",
                        )}
                    </h2>
                    <button class="calendar-nav-btn" on:click={nextMonth}>
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
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>

                <div class="calendar-date-info">
                    <div class="selected-date">
                        Jan {selectedDay}, {selectedYear}
                    </div>
                    <button class="today-btn" on:click={goToToday}>Today</button
                    >
                </div>
                </div>

                <!-- Calendar grid -->
            <div class="calendar-grid">
                    <!-- Day headers -->
                <div class="calendar-days-header">
                    <div class="day-header">Mo</div>
                    <div class="day-header">Tu</div>
                    <div class="day-header">We</div>
                    <div class="day-header">Th</div>
                    <div class="day-header">Fr</div>
                    <div class="day-header">Sa</div>
                    <div class="day-header">Su</div>
                    </div>

                    <!-- Calendar days -->
                <div class="calendar-days">
                    {#each calendarDays as { day, isCurrentMonth, date, isToday, isSelected }}
                            <button
                                class="calendar-day {isCurrentMonth
                                    ? 'current-month'
                                    : 'other-month'} 
                                  {isToday ? 'today' : ''} {isSelected
                                ? 'selected'
                                    : ''}"
                                on:click={() => selectDate(date)}
                            >
                                {day}
                            </button>
                        {/each}
                    </div>
                </div>

                <!-- Today's events -->
            <div class="today-events">
                <h3 class="today-label">TODAY {todayDateString}</h3>

                <div class="event-group">
                    <h4 class="event-group-title">Photo Capture</h4>
                    <ul class="event-list">
                        {#each photoCaptureEvents as event}
                            <li class="event-item">
                                <div class="event-marker"></div>
                                <div class="event-details">
                                    <div class="event-time">
                                        {event.time} - {event.title}
                                        </div>
                                    <div class="event-location">
                                            {event.location}
                                        </div>
                                    </div>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>

        <!-- Right panel - Week view -->
        <div class="week-panel">
                <!-- Week navigation -->
            <div class="week-navigation">
                <div class="week-nav-controls">
                    <button class="week-nav-btn" on:click={prevWeek}>
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
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button class="today-btn small" on:click={goToToday}
                        >Today</button
                    >
                    <button class="week-nav-btn" on:click={nextWeek}>
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
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>

                <div class="view-selector">
                    <button
                        class="view-btn {viewMode === 'day' ? 'active' : ''}"
                        on:click={() => setViewMode("day")}>Day</button
                    >
                    <button
                        class="view-btn {viewMode === 'week' ? 'active' : ''}"
                        on:click={() => setViewMode("week")}>Week</button
                    >
                    <button
                        class="view-btn {viewMode === 'month' ? 'active' : ''}"
                        on:click={() => setViewMode("month")}>Month</button
                    >
                    <button
                        class="view-btn {viewMode === 'year' ? 'active' : ''}"
                        on:click={() => setViewMode("year")}>Year</button
                    >
                </div>
            </div>

            <!-- Week header -->
            <div class="week-header">
                <div class="time-column-header"></div>
                {#each weekDays as { dayName, day, isToday }}
                    <div class="day-column-header {isToday ? 'today' : ''}">
                        <div class="day-name">{dayName}</div>
                        <div class="day-number {isToday ? 'today' : ''}">
                            {day}
                        </div>
                    </div>
                {/each}
            </div>

            <!-- Week grid -->
            <div class="week-grid">
                <div class="time-column">
                    {#each timeSlots as time}
                        <div class="time-label">{time}</div>
                    {/each}
                </div>

                    {#each weekDays as { date, isToday }, dayIndex}
                    <div class="day-column {isToday ? 'today' : ''}">
                        {#each timeSlots as time, timeIndex}
                                <div class="time-slot">
                                {#if date.getDate() === 22 && time === "10 AM"}
                                    <div class="event-card">
                                        <div class="event-title">Inventory</div>
                                        </div>
                                    {/if}
                                </div>
                            {/each}
                        </div>
                    {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .diary-container {
        width: 100%;
        min-height: calc(100vh - 40px);
        background-color: #f8f9fa;
        padding: 20px;
    }

    .diary-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .diary-header h1 {
        font-size: 24px;
        font-weight: 600;
        color: #333;
        margin: 0;
    }

    .diary-actions {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .book-project-btn,
    .download-diary-btn {
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
    }

    .book-project-btn {
        background-color: #fff;
        color: #333;
        border: 1px solid #dee2e6;
    }

    .download-diary-btn {
        background-color: #000;
        color: #fff;
        border: none;
    }

    .user-info {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .user-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
    }

    .avatar-placeholder {
        width: 100%;
        height: 100%;
        background-color: #4263eb;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 14px;
    }

    .user-name {
        font-weight: 500;
        font-size: 14px;
        color: #333;
    }

    .diary-content {
        display: flex;
        gap: 20px;
        height: calc(100vh - 100px);
    }

    /* Calendar Panel */
    .calendar-panel {
        width: 380px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .calendar-header {
        padding: 16px;
        border-bottom: 1px solid #f1f3f5;
    }

    .calendar-title-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    .calendar-title {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
    }

    .calendar-nav-btn {
        background: none;
        border: none;
        color: #6c757d;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .calendar-date-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .selected-date {
        font-size: 14px;
        color: #6c757d;
    }

    .today-btn {
        background: none;
        border: none;
        color: #4263eb;
        font-weight: 500;
        cursor: pointer;
        padding: 4px 8px;
        font-size: 14px;
    }

    .today-btn.small {
        font-size: 12px;
    }

    .calendar-grid {
        padding: 16px;
    }

    .calendar-days-header {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
        margin-bottom: 8px;
    }

    .day-header {
        font-size: 12px;
        font-weight: 500;
        color: #6c757d;
        padding: 4px;
    }

    .calendar-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 2px;
    }

    .calendar-day {
        width: 100%;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: none;
        font-size: 14px;
        cursor: pointer;
        border-radius: 50%;
    }

    .calendar-day.current-month {
        color: #333;
    }

    .calendar-day.other-month {
        color: #adb5bd;
    }

    .calendar-day.today {
        font-weight: 600;
        background-color: #f8f9fa;
    }

    .calendar-day.selected {
        background-color: #000;
        color: #fff;
        font-weight: 600;
    }

    .calendar-day:hover:not(.selected) {
        background-color: #f8f9fa;
    }

    /* Today's events */
    .today-events {
        padding: 16px;
        flex: 1;
        overflow-y: auto;
        border-top: 1px solid #f1f3f5;
    }

    .today-label {
        font-size: 12px;
        font-weight: 600;
        color: #6c757d;
        margin: 0 0 16px 0;
    }

    .event-group {
        margin-bottom: 16px;
    }

    .event-group-title {
        font-size: 14px;
        font-weight: 600;
        color: #000;
        background-color: #000;
        color: #fff;
        padding: 8px;
        margin: 0 0 8px 0;
    }

    .event-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .event-item {
        display: flex;
        margin-bottom: 8px;
        padding: 0 8px;
    }

    .event-marker {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #000;
        margin-top: 6px;
        margin-right: 8px;
        flex-shrink: 0;
    }

    .event-details {
        flex: 1;
    }

    .event-time {
        font-size: 14px;
        font-weight: 500;
        color: #333;
    }

    .event-location {
        font-size: 12px;
        color: #6c757d;
    }

    /* Week Panel */
    .week-panel {
        flex: 1;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .week-navigation {
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f1f3f5;
    }

    .week-nav-controls {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .week-nav-btn {
        background: none;
        border: none;
        color: #6c757d;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .view-selector {
        display: flex;
        align-items: center;
        background-color: #f8f9fa;
        border-radius: 4px;
        padding: 4px;
    }

    .view-btn {
        background: none;
        border: none;
        padding: 6px 12px;
        font-size: 12px;
        color: #6c757d;
        cursor: pointer;
        border-radius: 2px;
    }

    .view-btn.active {
        background-color: #fff;
        color: #000;
        font-weight: 500;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    /* Week header */
    .week-header {
        display: grid;
        grid-template-columns: 60px repeat(7, 1fr);
        border-bottom: 1px solid #f1f3f5;
    }

    .time-column-header {
        border-right: 1px solid #f1f3f5;
    }

    .day-column-header {
        padding: 10px;
        text-align: center;
        border-right: 1px solid #f1f3f5;
    }

    .day-column-header:last-child {
        border-right: none;
    }

    .day-column-header.today {
        background-color: #f8f9fa;
    }

    .day-name {
        font-size: 12px;
        font-weight: 500;
        color: #6c757d;
    }

    .day-number {
        font-size: 16px;
        font-weight: 500;
        color: #333;
    }

    .day-number.today {
        color: #000;
    }

    /* Week grid */
    .week-grid {
        display: grid;
        grid-template-columns: 60px repeat(7, 1fr);
        flex: 1;
        overflow-y: auto;
    }

    .time-column {
        border-right: 1px solid #f1f3f5;
    }

    .time-label {
        height: 60px;
        padding: 4px 8px;
        font-size: 12px;
        color: #6c757d;
        text-align: right;
        border-bottom: 1px solid #f1f3f5;
    }

    .day-column {
        border-right: 1px solid #f1f3f5;
    }

    .day-column:last-child {
        border-right: none;
    }

    .day-column.today {
        background-color: #f8f9fa;
    }

    .time-slot {
        height: 60px;
        border-bottom: 1px solid #f1f3f5;
        position: relative;
    }

    .event-card {
        position: absolute;
        left: 4px;
        right: 4px;
        top: 4px;
        height: 52px;
        background-color: rgba(66, 99, 235, 0.1);
        border-radius: 4px;
        padding: 4px 8px;
        cursor: pointer;
    }

    .event-title {
        font-size: 12px;
        font-weight: 500;
        color: #4263eb;
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // User data
    let userData = {
        name: "Pathum Bandara",
        role: "Tech expert",
    };

    // Current date
    const currentDate = new Date();
    let selectedDate = new Date();
    let selectedMonth = currentDate.getMonth();
    let selectedYear = currentDate.getFullYear();

    // Calendar days
    let calendarDays: Array<{
        day: number;
        isCurrentMonth: boolean;
        date: Date;
    }> = [];

    // Events for the selected day
    let events = [
        {
            id: 1,
            title: "Photo capture",
            items: [
                {
                    time: "8:00 - 10:00 AM",
                    location: "15 Kelvin Drive, Pontypridd, CF 39L 06",
                },
                {
                    time: "10:30 - 11:30 AM",
                    location: "15 Court Street, Pontypridd, CF 39L 06",
                },
                {
                    time: "12:00 - 1:00 PM",
                    location: "15 Court Street, Pontypridd, CF 39L 06",
                },
                {
                    time: "2:30 - 4:00 PM",
                    location: "15 Court Street, Pontypridd, CF 39L 06",
                },
            ],
        },
    ];

    // Week view days
    let weekDays: Array<{ day: number; date: Date; isToday: boolean }> = [];

    // View mode
    let viewMode: "day" | "week" | "month" | "year" = "week";

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
        }

        return "";
    }

    // Generate calendar days for the month
    function generateCalendarDays(month: number, year: number): void {
        calendarDays = [];

        // First day of the month
        const firstDay = new Date(year, month, 1);
        const startingDay = firstDay.getDay(); // 0 = Sunday

        // Last day of the month
        const lastDay = new Date(year, month + 1, 0);
        const monthLength = lastDay.getDate();

        // Previous month days
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        // Fill in previous month days
        for (let i = startingDay - 1; i >= 0; i--) {
            const day = prevMonthLastDay - i;
            calendarDays.push({
                day,
                isCurrentMonth: false,
                date: new Date(year, month - 1, day),
            });
        }

        // Fill in current month days
        for (let day = 1; day <= monthLength; day++) {
            calendarDays.push({
                day,
                isCurrentMonth: true,
                date: new Date(year, month, day),
            });
        }

        // Fill in next month days
        const remainingDays = 42 - calendarDays.length; // 6 rows x 7 days
        for (let day = 1; day <= remainingDays; day++) {
            calendarDays.push({
                day,
                isCurrentMonth: false,
                date: new Date(year, month + 1, day),
            });
        }
    }

    // Generate week view days
    function generateWeekDays(date: Date): void {
        weekDays = [];
        const dayOfWeek = date.getDay(); // 0 = Sunday
        const startDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Calculate first day of the displayed week (Sunday)
        startDate.setDate(date.getDate() - dayOfWeek);

        // Generate 7 days
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);

            weekDays.push({
                day: currentDate.getDate(),
                date: currentDate,
                isToday: currentDate.getTime() === today.getTime(),
            });
        }
    }

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
        generateCalendarDays(selectedMonth, selectedYear);
        generateWeekDays(selectedDate);
    }

    // Select a date
    function selectDate(date: Date): void {
        selectedDate = date;
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

    // Generate time slots for the day view
    function generateTimeSlots(): Array<string> {
        const times = [];
        for (let hour = 7; hour <= 17; hour++) {
            times.push(`${hour} AM`);
        }
        return times;
    }

    // Scheduled events for the demo
    const scheduledEvent = {
        day: 22,
        time: "10:00 AM",
        title: "Inventory",
    };

    // Photo capture events
    const photoCaptureEvents = [
        {
            time: "8:00 - 10:00 AM",
            location: "15 Kelvin Drive, Pontypridd, CF 39L 06",
        },
        {
            time: "10:30 - 11:30 AM",
            location: "15 Court Street, Pontypridd, CF 39L 06",
        },
        {
            time: "12:00 - 1:00 PM",
            location: "15 Court Street, Pontypridd, CF 39L 06",
        },
        {
            time: "2:30 - 4:00 PM",
            location: "15 Court Street, Pontypridd, CF 39L 06",
        },
    ];

    // Time slots
    const timeSlots = generateTimeSlots();

    // Download diary
    function downloadDiary(): void {
        alert("Downloading diary...");
    }

    // Book a project
    function bookProject(): void {
        goto("/properties/new");
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

<div class="flex flex-col h-full bg-white">
    <!-- Header with actions -->
    <div
        class="flex justify-between items-center p-4 border-b border-gray-200 shadow-sm"
    >
        <h1 class="text-xl font-medium text-gray-900">Diary</h1>
        <div class="flex items-center gap-4">
            <button on:click={bookProject} class="btn btn-outline">
                Book A Project
            </button>
            <button
                on:click={downloadDiary}
                class="btn btn-black flex items-center"
            >
                Download Diary
            </button>

            <!-- Notification and Message icons -->
            <div class="flex items-center gap-4 ml-4">
                <!-- Notifications -->
                <button class="text-gray-600 hover:text-gray-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                        />
                    </svg>
                </button>

                <!-- Messages -->
                <button class="text-gray-600 hover:text-gray-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
                        />
                        <path
                            d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
                        />
                    </svg>
                </button>
            </div>

            <!-- User profile -->
            <div class="flex items-center ml-4">
                <div class="text-right mr-2">
                    <div class="text-sm font-medium text-gray-900">
                        {userData.name}
                    </div>
                    <div class="text-xs text-gray-500">{userData.role}</div>
                </div>
                <div
                    class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <!-- Diary content -->
    <div class="flex flex-1 border-t border-gray-200 overflow-hidden">
        <!-- Left panel - Calendar -->
        <div
            class="w-1/3 border-r border-gray-200 flex flex-col overflow-y-auto"
        >
            <div class="p-4">
                <!-- Calendar navigation -->
                <div class="flex justify-between items-center mb-4">
                    <button
                        on:click={prevMonth}
                        class="p-2 text-gray-500 hover:text-gray-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <h2 class="text-base font-medium text-gray-900">
                        {formatDate(
                            new Date(selectedYear, selectedMonth),
                            "month-year",
                        )}
                    </h2>
                    <button
                        on:click={nextMonth}
                        class="p-2 text-gray-500 hover:text-gray-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>

                <!-- Selected date -->
                <div class="flex justify-between items-center mb-4">
                    <div>
                        <p class="text-sm text-gray-700">Jan 12, 2024</p>
                    </div>
                    <button
                        on:click={goToToday}
                        class="btn btn-outline text-sm py-1 px-3"
                    >
                        Today
                    </button>
                </div>

                <!-- Calendar grid -->
                <div class="mb-6">
                    <!-- Day headers -->
                    <div class="grid grid-cols-7 text-center mb-2">
                        <div class="text-xs font-medium text-gray-500">Mo</div>
                        <div class="text-xs font-medium text-gray-500">Tu</div>
                        <div class="text-xs font-medium text-gray-500">We</div>
                        <div class="text-xs font-medium text-gray-500">Th</div>
                        <div class="text-xs font-medium text-gray-500">Fr</div>
                        <div class="text-xs font-medium text-gray-500">Sa</div>
                        <div class="text-xs font-medium text-gray-500">Su</div>
                    </div>

                    <!-- Calendar days -->
                    <div class="grid grid-cols-7 gap-1">
                        {#each calendarDays as { day, isCurrentMonth, date }, i}
                            <button
                                class="calendar-day {isCurrentMonth
                                    ? 'current-month'
                                    : 'other-month'} 
                                    {day === 12 ? 'selected' : ''} 
                                    {day === new Date().getDate() &&
                                date.getMonth() === new Date().getMonth() &&
                                date.getFullYear() === new Date().getFullYear()
                                    ? 'today'
                                    : ''}"
                                on:click={() => selectDate(date)}
                            >
                                {day}
                            </button>
                        {/each}
                    </div>
                </div>

                <!-- Today's events -->
                <div class="mb-6">
                    <h3
                        class="text-xs font-medium uppercase text-gray-500 mb-2"
                    >
                        TODAY
                    </h3>

                    <div class="today-event-list">
                        <h4 class="today-event-title">Photo capture</h4>

                        <ul class="space-y-3">
                            {#each events[0].items as item}
                                <li class="today-event-item">
                                    <div class="today-event-time">
                                        {item.time}
                                    </div>
                                    <div class="today-event-location">
                                        {item.location}
                                    </div>
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>

                <!-- Today's Schedule View -->
                <div>
                    <h3 class="font-medium text-base mb-2 text-gray-900">
                        TODAY 1/27/2021
                    </h3>
                    <div class="border-t border-gray-200">
                        <h4 class="schedule-section-title">Photo capture</h4>
                        {#each photoCaptureEvents as event}
                            <div class="schedule-item">
                                <div class="flex items-start">
                                    <div class="schedule-item-bullet"></div>
                                    <div>
                                        <div class="schedule-item-time">
                                            {event.time}
                                        </div>
                                        <div class="schedule-item-location">
                                            {event.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>

        <!-- Right panel - Day/Week view -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- View controls -->
            <div
                class="flex justify-between items-center p-4 border-b border-gray-200"
            >
                <!-- Week navigation -->
                <div class="flex items-center gap-2">
                    <button
                        on:click={prevWeek}
                        class="p-1 text-gray-500 hover:text-gray-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        on:click={goToToday}
                        class="btn btn-outline text-xs py-1 px-3">Today</button
                    >
                    <button
                        on:click={nextWeek}
                        class="p-1 text-gray-500 hover:text-gray-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>

                <!-- View switcher -->
                <div class="view-toggle">
                    <button
                        class="view-toggle-button {viewMode === 'day'
                            ? 'active'
                            : ''}"
                        on:click={() => setViewMode("day")}
                    >
                        Day
                    </button>
                    <button
                        class="view-toggle-button {viewMode === 'week'
                            ? 'active'
                            : ''}"
                        on:click={() => setViewMode("week")}
                    >
                        Week
                    </button>
                    <button
                        class="view-toggle-button {viewMode === 'month'
                            ? 'active'
                            : ''}"
                        on:click={() => setViewMode("month")}
                    >
                        Month
                    </button>
                    <button
                        class="view-toggle-button {viewMode === 'year'
                            ? 'active'
                            : ''}"
                        on:click={() => setViewMode("year")}
                    >
                        Year
                    </button>
                </div>
            </div>

            <!-- Week header -->
            <div class="grid grid-cols-7 border-b border-gray-200">
                {#each weekDays as { day, date, isToday }}
                    <div class="week-day-header {isToday ? 'today' : ''}">
                        <div class="week-day-name">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                                date.getDay()
                            ]}
                        </div>
                        <div class="week-day-number {isToday ? 'today' : ''}">
                            {day}
                        </div>
                    </div>
                {/each}
            </div>

            <!-- Time grid -->
            <div class="flex-1 overflow-y-auto">
                <div class="grid grid-cols-7 relative min-h-full">
                    {#each weekDays as { date, isToday }, dayIndex}
                        <div class="time-column {isToday ? 'today' : ''}">
                            {#each timeSlots as time, i}
                                <div class="time-slot">
                                    {#if dayIndex === 0}
                                        <span>{time}</span>
                                    {/if}

                                    {#if date.getDate() === scheduledEvent.day && time === scheduledEvent.time}
                                        <div class="event-pill">
                                            <div class="event-pill-title">
                                                {scheduledEvent.title}
                                            </div>
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
</div>

<style>
    :global(body) {
        background-color: #f5f7fa;
    }

    /* Calendar day styling */
    .calendar-day {
        height: 2.25rem;
        width: 2.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 9999px;
        font-size: 0.875rem;
        transition: all 0.2s;
    }

    .calendar-day:hover {
        background-color: #f3f4f6;
    }

    .calendar-day.current-month {
        color: #1f2937;
    }

    .calendar-day.other-month {
        color: #9ca3af;
    }

    .calendar-day.selected {
        background-color: #111827;
        color: white;
    }

    .calendar-day.today:not(.selected) {
        border: 1px solid #d1d5db;
    }

    /* Week view styling */
    .week-day-header {
        padding: 0.5rem;
        text-align: center;
        border-right: 1px solid #e5e7eb;
    }

    .week-day-header:last-child {
        border-right: none;
    }

    .week-day-header.today {
        background-color: #eff6ff;
    }

    .week-day-name {
        font-size: 0.75rem;
        text-transform: uppercase;
        color: #6b7280;
        font-weight: 500;
    }

    .week-day-number {
        font-size: 1.25rem;
        font-weight: 500;
    }

    .week-day-number.today {
        color: #2563eb;
    }

    /* Time slot styling */
    .time-slot {
        height: 3rem;
        border-bottom: 1px solid #e5e7eb;
        font-size: 0.75rem;
        color: #6b7280;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        display: flex;
        align-items: center;
    }

    .time-column {
        border-right: 1px solid #e5e7eb;
        position: relative;
    }

    .time-column.today {
        background-color: #eff6ff;
    }

    .time-column:last-child {
        border-right: none;
    }

    /* Event styling */
    .event-pill {
        position: absolute;
        left: 0;
        right: 0;
        margin-left: 0.25rem;
        margin-right: 0.25rem;
        background-color: #dbeafe;
        padding: 0.5rem;
        font-size: 0.75rem;
        z-index: 10;
    }

    .event-pill-title {
        font-weight: 500;
        color: #1e40af;
    }

    /* Today's events list styling */
    .today-event-list {
        background-color: #f3f4f6;
        border-radius: 0.375rem;
        padding: 0.75rem;
    }

    .today-event-title {
        font-weight: 500;
        margin-bottom: 0.5rem;
    }

    .today-event-item {
        margin-bottom: 0.75rem;
    }

    .today-event-item:last-child {
        margin-bottom: 0;
    }

    .today-event-time {
        font-weight: 500;
        font-size: 0.875rem;
    }

    .today-event-location {
        color: #6b7280;
        font-size: 0.75rem;
    }

    /* Schedule list styling */
    .schedule-section-title {
        font-weight: 500;
        font-size: 0.875rem;
        padding: 0.5rem;
        background-color: #111827;
        color: white;
    }

    .schedule-item {
        padding: 0.5rem 0;
        border-bottom: 1px solid #e5e7eb;
    }

    .schedule-item-bullet {
        width: 0.375rem;
        height: 0.375rem;
        border-radius: 9999px;
        background-color: #111827;
        margin-top: 0.375rem;
        margin-right: 0.5rem;
    }

    .schedule-item-time {
        font-weight: 500;
        font-size: 0.875rem;
    }

    .schedule-item-location {
        color: #6b7280;
        font-size: 0.75rem;
    }

    /* Button styling */
    .btn {
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        font-weight: 500;
        transition: all 0.2s;
    }

    .btn-outline {
        background-color: white;
        border: 1px solid #d1d5db;
    }

    .btn-outline:hover {
        background-color: #f9fafb;
    }

    .btn-black {
        background-color: #111827;
        color: white;
    }

    .btn-black:hover {
        background-color: #374151;
    }

    /* View mode toggle */
    .view-toggle {
        display: flex;
        border: 1px solid #d1d5db;
        border-radius: 0.25rem;
        overflow: hidden;
    }

    .view-toggle-button {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
        background-color: white;
    }

    .view-toggle-button.active {
        background-color: #111827;
        color: white;
    }
</style>

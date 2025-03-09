<script lang="ts">
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    type BusinessType = {
        id: string;
        title: string;
        description: string;
    };

    type Step = {
        id: number;
        title: string;
        clientLabel?: string;
        partnerLabel?: string;
        completed: boolean;
        active: boolean;
    };

    const dispatch = createEventDispatcher<{
        select: { businessType: string | null };
        next: { businessType: string | null };
    }>();

    let selectedBusinessType: string | null = null;
    let userType = "client" as "client" | "partner"; // Fix type assertion

    // Registration steps
    let steps: Step[] = [
        {
            id: 1,
            title: "Select your expertise",
            completed: false,
            active: true,
        },
        {
            id: 2,
            title: "Details",
            clientLabel: "Client details",
            partnerLabel: "Personal details",
            completed: false,
            active: false,
        },
        {
            id: 3,
            title: "Address",
            clientLabel: "Company address",
            partnerLabel: "Current address",
            completed: false,
            active: false,
        },
        {
            id: 4,
            title: "Fit to work",
            completed: false,
            active: false,
        },
        {
            id: 5,
            title: "Onboarding Form Complete",
            completed: false,
            active: false,
        },
    ];

    // Business type options
    let businessTypes: BusinessType[] = [
        {
            id: "individual-agency",
            title: "Individual Agency",
            description:
                "This option is for solo estate agents or realtors operating independently. Individuals often manage a limited portfolio of properties and require tailored services to support their specific needs in property marketing, inspections, and valuations.",
        },
        {
            id: "corporate-account",
            title: "Corporate Account",
            description:
                "Suitable for estate agencies with a team of agents and a growing portfolio of properties. Small to medium businesses typically handle multiple rental and sales properties each month, necessitating comprehensive services like media packs, inventories, and regular inspection reports to streamline operations and enhance client offerings.",
        },
        {
            id: "medium-enterprise",
            title: "Medium Enterprise",
            description:
                "This category is for larger estate agencies or firms operating at a national or regional level. Corporate entities usually manage extensive portfolios, engage in high-volume transactions, and require robust support for a wide range of services, including detailed valuation reports and multi-property inspections to maintain quality and compliance across their operations.",
        },
    ];

    function selectBusinessType(id: string): void {
        selectedBusinessType = id;
        dispatch("select", { businessType: id });
    }

    function handleNext(): void {
        if (selectedBusinessType) {
            dispatch("next", { businessType: selectedBusinessType });
        }
    }
</script>

<div class="registration-container">
    <!-- Progress Steps -->
    <div class="progress-steps">
        {#each steps as step}
            <div
                class="step-item {step.active ? 'active' : ''} {step.completed
                    ? 'completed'
                    : ''}"
            >
                <div class="step-number">
                    {#if step.completed}
                        <span class="checkmark">✓</span>
                    {:else}
                        {step.id}
                    {/if}
                </div>
                <div class="step-title">
                    {#if userType === "client" && step.clientLabel}
                        {step.clientLabel}
                    {:else if userType === "partner" && step.partnerLabel}
                        {step.partnerLabel}
                    {:else}
                        {step.title}
                    {/if}
                </div>
            </div>
            {#if step.id < steps.length}
                <div class="step-connector"></div>
            {/if}
        {/each}
    </div>

    <!-- Main Content -->
    <div class="content-container">
        <h1>Select your expertise</h1>

        <div class="onboarding-message">
            <p class="thank-you">
                Thank you for choosing to partner with Digiprop.
            </p>
            <p class="intro-text">
                To ensure a successful partnership, please follow the Digiprop
                onboarding process.
            </p>

            <div class="info-box">
                <p>
                    You need to follow the entire onboarding process to access
                    the Digiprop restricted process. This information is
                    essential for a complete diligence process you can apply
                    online before the current team can access of Digiprop.
                </p>

                <p>
                    Follow the step progression. Every step is essential! At the
                    Digiprop team will work with you to complete the onboarding
                    experience. They will guide you through this process. It is
                    quicker and easier if you are properly onboarded with the
                    right support and necessary.
                </p>
            </div>
        </div>

        <div class="business-type-section">
            <h2>Select your size of business</h2>

            <div class="business-options">
                {#each businessTypes as business}
                    <div class="business-option">
                        <label class="business-label">
                            <input
                                type="checkbox"
                                checked={selectedBusinessType === business.id}
                                on:change={() =>
                                    selectBusinessType(business.id)}
                            />
                            <span class="business-title">{business.title}</span>
                        </label>
                        <button
                            class="info-button"
                            aria-label="More information"
                        >
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="11"
                                    fill="none"
                                    stroke="#999"
                                    stroke-width="2"
                                />
                                <path
                                    d="M12 7v2 M12 11v6"
                                    stroke="#999"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                />
                            </svg>
                        </button>
                    </div>
                    {#if selectedBusinessType === business.id && business.description}
                        <div class="business-description" transition:slide>
                            <p>{business.description}</p>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>

        <div class="navigation-buttons">
            <button
                class="next-button"
                on:click={handleNext}
                disabled={!selectedBusinessType}
            >
                Next
            </button>
        </div>
    </div>
</div>

<style>
    .registration-container {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        background-color: #f7f7f7;
        padding: 20px;
        border-radius: 8px;
    }

    /* Progress Steps Styles */
    .progress-steps {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding: 15px 20px;
        background-color: white;
        border-radius: 8px;
    }

    .step-item {
        display: flex;
        align-items: center;
        position: relative;
        z-index: 1;
    }

    .step-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #e0e0e0;
        color: #555;
        font-weight: bold;
        margin-right: 8px;
    }

    .step-title {
        font-size: 0.85rem;
        color: #777;
        white-space: nowrap;
    }

    .step-connector {
        flex-grow: 1;
        height: 2px;
        background-color: #e0e0e0;
        margin: 0 10px;
    }

    .step-item.active .step-number {
        background-color: #333;
        color: white;
    }

    .step-item.active .step-title {
        color: #333;
        font-weight: 500;
    }

    .step-item.completed .step-number {
        background-color: #4caf50;
        color: white;
    }

    .checkmark {
        font-size: 14px;
    }

    /* Content Styles */
    .content-container {
        background-color: white;
        padding: 25px;
        border-radius: 8px;
    }

    h1 {
        font-size: 1.5rem;
        margin-top: 0;
        margin-bottom: 1.5rem;
        color: #333;
    }

    .onboarding-message {
        margin-bottom: 30px;
    }

    .thank-you {
        font-weight: 500;
        text-align: center;
        margin-bottom: 10px;
    }

    .intro-text {
        text-align: center;
        margin-bottom: 20px;
    }

    .info-box {
        background-color: #f9f9f9;
        border: 1px solid #e9e9e9;
        border-radius: 6px;
        padding: 15px;
        font-size: 0.9rem;
        line-height: 1.5;
        color: #555;
    }

    .info-box p {
        margin: 10px 0;
    }

    /* Business Type Section */
    .business-type-section {
        margin-top: 30px;
    }

    h2 {
        font-size: 1.2rem;
        margin-bottom: 15px;
    }

    .business-options {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .business-option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 15px;
        background-color: #f9f9f9;
        border-radius: 6px;
    }

    .business-label {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .business-title {
        margin-left: 10px;
        font-weight: 500;
    }

    .info-button {
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .business-description {
        padding: 15px;
        margin-top: -10px;
        margin-bottom: 10px;
        background-color: #f0f0f0;
        border-radius: 0 0 6px 6px;
        font-size: 0.9rem;
        line-height: 1.5;
    }

    /* Navigation */
    .navigation-buttons {
        margin-top: 30px;
        display: flex;
        justify-content: flex-end;
    }

    .next-button {
        background-color: #000;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
    }

    .next-button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
</style>

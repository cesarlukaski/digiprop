<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // Expertise options
    const expertiseOptions = [
        {
            id: "digi-properties",
            title: "Digi Properties",
            description:
                "Certified Residential Property Agent (Photographer for Digiprop): User primary",
            details: [
                "Prepare high-quality photographs to showcase properties in the best possible light",
                "Ensure that the property captures all angles and key details of the interior and exterior of the properties",
                "Provide professional editing services to enhance photos to the professional standard of the property",
                "Ensure accurate property details and features",
                "Proper floor plan measurements and room dimensions",
                "Create floor plan maps using our proprietary software to give the best floor plans of the properties",
                "Ensure that floor plan images are clear, accurate, and can be used to create detailed property reports",
            ],
            info: "Your role is crucial in providing Digiprop with the necessary visual content and floor plans to create comprehensive property listings. Your ability to create high-quality images and detailed floor plans will contribute to the success of the project.",
        },
        {
            id: "rics-surveyor",
            title: "RICS Surveyor / Valuer",
            description: "",
            details: [],
            info: "",
        },
    ];

    // Selected expertise
    let selectedExpertise: string[] = [];
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
    });

    function toggleExpertise(id: string) {
        if (selectedExpertise.includes(id)) {
            selectedExpertise = selectedExpertise.filter((item) => item !== id);
        } else {
            selectedExpertise = [...selectedExpertise, id];
        }
    }

    async function handleSubmit() {
        if (selectedExpertise.length === 0) {
            error = "Please select at least one expertise";
            return;
        }

        loading = true;

        try {
            // In a real app, you would save the selected expertise to the user's profile
            // For now, we'll just simulate a delay and redirect
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Redirect to personal details page
            goto("/register/personal-details");
        } catch (err) {
            error =
                (err as Error).message ||
                "Failed to save expertise. Please try again.";
        } finally {
            loading = false;
        }
    }
</script>

<div class="page-container">
    <div class="expertise-card">
        <div class="expertise-content">
            <div class="progress-steps">
                <div class="step completed">
                    <div class="step-number">1</div>
                    <div class="step-label">Select your expertise</div>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-label">Verification (email)</div>
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

            <div class="expertise-header">
                <h1>Thank you for choosing to partner with DigiProp.</h1>
                <p>
                    To continue as a residential and property partner, please
                    follow the steps for registration services.
                </p>
            </div>

            <div class="expertise-description">
                <p class="description-title">
                    Certified Residential Property Partner
                </p>
                <p>
                    Your role as a Residential Property Partner is to provide
                    high-quality property registration services. Your
                    contribution is essential for the success of our platform
                    and the service we can provide to our clients.
                </p>
            </div>

            <div class="expertise-selection">
                <h2>Select your area of expertise</h2>

                {#if error}
                    <div class="error-message">
                        <span>{error}</span>
                    </div>
                {/if}

                <div class="expertise-options">
                    {#each expertiseOptions as option}
                        <div class="expertise-option">
                            <div class="option-header">
                                <input
                                    type="checkbox"
                                    id={option.id}
                                    checked={selectedExpertise.includes(
                                        option.id,
                                    )}
                                    on:change={() => toggleExpertise(option.id)}
                                />
                                <label for={option.id}>{option.title}</label>
                                <div class="info-icon">i</div>
                            </div>

                            {#if option.description}
                                <p class="option-description">
                                    {option.description}
                                </p>
                            {/if}

                            {#if selectedExpertise.includes(option.id) && option.details.length > 0}
                                <div class="option-details">
                                    <ul>
                                        {#each option.details as detail}
                                            <li>{detail}</li>
                                        {/each}
                                    </ul>

                                    {#if option.info}
                                        <p class="option-info">{option.info}</p>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>

            <div class="action-buttons">
                <button
                    class="next-button"
                    on:click={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Next"}
                </button>
            </div>
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

    .expertise-card {
        flex: 1;
        padding: 24px;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
    }

    .expertise-content {
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

    .expertise-header {
        margin-bottom: 24px;
    }

    .expertise-header h1 {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: #111827;
    }

    .expertise-header p {
        font-size: 14px;
        color: #6b7280;
        margin: 0;
    }

    .expertise-description {
        margin-bottom: 32px;
    }

    .description-title {
        font-weight: 600;
        color: #111827;
        margin: 0 0 8px 0;
        font-size: 14px;
    }

    .expertise-description p {
        margin: 0;
        font-size: 14px;
        color: #6b7280;
        line-height: 1.5;
    }

    .expertise-selection h2 {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 16px 0;
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

    .expertise-options {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .expertise-option {
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 16px;
    }

    .option-header {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }

    .option-header input[type="checkbox"] {
        margin-right: 12px;
    }

    .option-header label {
        font-weight: 600;
        font-size: 14px;
        color: #111827;
        flex: 1;
    }

    .info-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #e5e7eb;
        color: #6b7280;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-style: italic;
        font-weight: 600;
    }

    .option-description {
        font-size: 14px;
        color: #6b7280;
        margin: 0 0 16px 28px;
    }

    .option-details {
        margin-left: 28px;
        border-top: 1px solid #e5e7eb;
        padding-top: 16px;
    }

    .option-details ul {
        margin: 0 0 16px 0;
        padding-left: 20px;
    }

    .option-details li {
        font-size: 14px;
        color: #6b7280;
        margin-bottom: 8px;
    }

    .option-info {
        font-size: 14px;
        color: #6b7280;
        margin: 0;
        font-style: italic;
    }

    .action-buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: 32px;
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
    }
</style>

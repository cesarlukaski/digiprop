<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // Expertise options
    const expertiseOptions = [
        {
            id: "digi-snappers",
            title: "Digi Snappers",
            description: "Digi Snappers",
            subDescription:
                "Capture Media Packs of Properties As a Property Photographer for Digiprop, your primary responsibilities will include:",
            details: [
                "<strong>Capture 360-degree imagery:</strong> Use a 360-degree camera to obtain comprehensive, high-quality images of the properties assigned to you.",
                "<strong>Ensure</strong> the 360 photos capture all angles and details of the interior and exterior of the properties.",
                "<strong>Smartphone-Based Photography:</strong> Utilize your smartphone to take additional photos of the properties, focusing on specific details, angles, and features.",
                "<strong>Complement</strong> the 360-degree imagery with well-composed, high-resolution smartphone photos.",
                "<strong>Obtain Floor Plans:</strong> Using your smartphone, capture the raw floor plans of the properties.",
                "<strong>Ensure</strong> the floor plan images are clear, accurate, and can be used to create detailed property media packs.",
            ],
            info: "Your role is crucial in providing Digiprop with the necessary visual media and floor plans to create comprehensive property listings and marketing materials. Your diligence, technical skills, and ability to work efficiently will be key to the success of this project.",
        },
        {
            id: "rics-surveyor",
            title: "RICS Surveyor/ Valuer",
            description: "RICS Surveyor/Valuer Profile",
            subDescription:
                "Role Overview for RICS Surveyors and Valuers at Digiprop: As a RICS Surveyor/Valuer for Digiprop, your primary responsibilities will encompass the following:",
            details: [
                "<strong>Assessment and Valuation:</strong> Conduct thorough property assessments to determine market value.",
                "<strong>Conduct Comprehensive Valuations:</strong> Perform detailed assessments of properties to determine their market value, ensuring compliance with RICS standards and guidelines.",
                "<strong>Market Analysis:</strong> Combine the data gathered by Field Assessors along with your own findings, to provide accurate and reliable property valuations.",
                "<strong>Analysis:</strong> Analyze property data to identify trends and market factors.",
                "<strong>Evaluate Property Conditions:</strong> Assess the physical condition of properties, identifying any factors that may influence their value, including structural issues, location advantages, and market trends.",
                "<strong>Report Generation:</strong> Prepare thorough valuation reports that clearly articulate your findings, justifications for valuation conclusions, and recommendations.",
                "<strong>Technology Integration:</strong> Utilize digital tools efficiently to streamline the valuation process.",
                "<strong>Work with the Valuation Team:</strong> Collaborate closely with Digiprop's RICS Surveyors and Valuation team, sharing insights and data to enhance the overall valuation process.",
                "<strong>Client Communication:</strong> Interact with clients to explain valuation results, address queries, and provide professional advice on property investments.",
                "<strong>Compliance:</strong> Ensure adherence to all relevant regulations and standards.",
                "<strong>Adhere to RICS Standards:</strong> Ensure that all assessments and valuations meet the highest professional standards set forth by the Royal Institution of Chartered Surveyors.",
                "<strong>Continual Professional Development:</strong> Stay updated on industry regulations, market trends, and best practices to maintain your qualifications and enhance your expertise.",
            ],
            info: "Your role as a RICS Surveyor/Valuer is crucial to Digiprop's mission of providing accurate and reliable property valuations. Your expertise, attention to detail, and ability to communicate effectively with clients and colleagues will significantly contribute to the success of our valuation services. If you have any questions regarding the responsibilities of the RICS Surveyor/Valuer role, please don't hesitate to reach out.",
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
    <div class="progress-bar">
        <div class="steps">
            <div class="step active">
                <div class="step-circle">1</div>
                <div class="step-label">Select your expertise</div>
            </div>
            <div class="step-connector"></div>
            <div class="step">
                <div class="step-circle">2</div>
                <div class="step-label">Personal Detail</div>
            </div>
            <div class="step-connector"></div>
            <div class="step">
                <div class="step-circle">3</div>
                <div class="step-label">Current's Address</div>
            </div>
            <div class="step-connector"></div>
            <div class="step">
                <div class="step-circle">4</div>
                <div class="step-label">Fit to work</div>
            </div>
            <div class="step-connector"></div>
            <div class="step">
                <div class="step-circle">5</div>
                <div class="step-label">Onboarding Form Complete</div>
            </div>
        </div>
    </div>

    <div class="expertise-card">
        <div class="expertise-content">
            <div class="expertise-header">
                <p class="thank-you">
                    Thank you for choosing to partner with Digiprop.
                </p>
                <p class="process-text">
                    To ensure a successful partnership, please follow the
                    Digiprop registration process.
                </p>

                <div class="instructions-box">
                    <p>
                        Complete the registration process below to create an
                        account on the Digiprop registration page. This
                        information is essential for our initial due diligence
                        to ensure you are placed within the correct team and
                        area of Digiprop.
                    </p>

                    <p>
                        Onboarding with Digiprop:<br />
                        After submitting the registration form, a member of the Digiprop
                        team will reach out to you to complete the onboarding process.
                        They will guide you through this next steps and ensure you
                        are properly onboarded with the right team and resources.
                    </p>

                    <p>
                        Verification and Requirements:<br />
                        Digiprop will review the information provided during registration
                        and complete their initial due diligence. This will determine
                        the appropriate team and area within Digiprop for your partnership
                        with the Navouni-lead business.
                    </p>
                </div>
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
                        <div
                            class="expertise-option {selectedExpertise.includes(
                                option.id,
                            )
                                ? 'selected'
                                : ''}"
                        >
                            <div class="option-header">
                                <label class="checkbox-container">
                                    <input
                                        type="checkbox"
                                        id={option.id}
                                        checked={selectedExpertise.includes(
                                            option.id,
                                        )}
                                        on:change={() =>
                                            toggleExpertise(option.id)}
                                    />
                                    <span class="checkmark"></span>
                                    <span class="option-title"
                                        >{option.title}</span
                                    >
                                </label>
                                <div class="info-icon">i</div>
                            </div>

                            {#if option.description}
                                <p class="option-description">
                                    {option.description}
                                </p>
                            {/if}

                            {#if option.subDescription}
                                <p class="option-sub-description">
                                    {option.subDescription}
                                </p>
                            {/if}

                            {#if option.details.length > 0 && selectedExpertise.includes(option.id)}
                                <div class="option-details">
                                    <h4>RESPONSIBILITIES:</h4>
                                    <ul>
                                        {#each option.details as detail}
                                            <li>{@html detail}</li>
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
                    disabled={loading || selectedExpertise.length === 0}
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

    /* Progress Bar */
    .progress-bar {
        background-color: white;
        padding: 20px;
        border-bottom: 1px solid #e5e7eb;
    }

    .steps {
        display: flex;
        align-items: center;
        max-width: 800px;
        margin: 0 auto;
    }

    .step {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }

    .step-circle {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #e5e7eb;
        color: #6b7280;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 8px;
    }

    .step.active .step-circle {
        background-color: black;
        color: white;
    }

    .step-label {
        font-size: 12px;
        color: #6b7280;
        text-align: center;
        white-space: nowrap;
    }

    .step.active .step-label {
        color: black;
        font-weight: 500;
    }

    .step-connector {
        flex-grow: 1;
        height: 2px;
        background-color: #e5e7eb;
        margin: 0 8px;
        margin-bottom: 24px;
    }

    /* Expertise Card */
    .expertise-card {
        flex: 1;
        padding: 24px;
        max-width: 800px;
        margin: 0 auto;
        width: 100%;
    }

    .expertise-content {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        padding: 24px;
    }

    .expertise-header {
        margin-bottom: 24px;
    }

    .thank-you {
        font-size: 14px;
        font-weight: 500;
        margin: 0 0 8px 0;
        color: #111827;
        text-align: center;
    }

    .process-text {
        font-size: 14px;
        color: #6b7280;
        margin: 0 0 20px 0;
        text-align: center;
    }

    .instructions-box {
        background-color: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        padding: 16px;
    }

    .instructions-box p {
        font-size: 14px;
        color: #6b7280;
        margin: 0 0 16px 0;
        line-height: 1.5;
    }

    .instructions-box p:last-child {
        margin-bottom: 0;
    }

    .expertise-selection {
        margin-top: 24px;
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
        background-color: white;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        transition: border-color 0.2s;
    }

    .expertise-option.selected {
        border-color: #111827;
    }

    .option-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .checkbox-container {
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        font-size: 14px;
        user-select: none;
        padding-left: 28px;
        flex: 1;
    }

    .checkbox-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .checkmark {
        position: absolute;
        left: 0;
        height: 18px;
        width: 18px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        background-color: white;
    }

    .checkbox-container:hover input ~ .checkmark {
        background-color: #f9fafb;
    }

    .checkbox-container input:checked ~ .checkmark {
        background-color: #111827;
        border-color: #111827;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .checkbox-container input:checked ~ .checkmark:after {
        display: block;
    }

    .checkbox-container .checkmark:after {
        left: 6px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }

    .option-title {
        font-weight: 600;
        color: #111827;
        margin-left: 5px;
    }

    .info-icon {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: #f3f4f6;
        color: #6b7280;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-style: italic;
        font-weight: 600;
        cursor: pointer;
    }

    .option-description {
        font-size: 14px;
        color: #111827;
        font-weight: 600;
        margin: 12px 0 4px;
        padding-left: 28px;
    }

    .option-sub-description {
        font-size: 14px;
        color: #6b7280;
        margin: 0 0 12px;
        padding-left: 28px;
        line-height: 1.5;
    }

    .option-details {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid #e5e7eb;
    }

    .option-details h4 {
        font-size: 12px;
        font-weight: 600;
        color: #6b7280;
        margin: 0 0 12px 0;
        letter-spacing: 0.05em;
    }

    .option-details ul {
        margin: 0 0 16px 0;
        padding-left: 18px;
    }

    .option-details li {
        font-size: 14px;
        color: #6b7280;
        margin-bottom: 12px;
        line-height: 1.5;
        position: relative;
    }

    .option-details li::before {
        content: "•";
        position: absolute;
        left: -15px;
        color: #6b7280;
    }

    .option-info {
        font-size: 14px;
        color: #6b7280;
        margin: 16px 0 0;
        line-height: 1.5;
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
        background-color: #d1d5db;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        .steps {
            overflow-x: auto;
            padding-bottom: 16px;
            justify-content: flex-start;
        }

        .step {
            flex-shrink: 0;
        }
    }
</style>

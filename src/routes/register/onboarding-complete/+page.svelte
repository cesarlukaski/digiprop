<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let redirectCountdown = 5;
    // @ts-ignore
    let redirectTimer;

    onMount(() => {
        // Start the countdown for automatic redirect
        redirectTimer = setInterval(() => {
            redirectCountdown--;
            if (redirectCountdown <= 0) {
                // @ts-ignore
                clearInterval(redirectTimer);
                redirectToProperties();
            }
        }, 1000);

        // Clean up the timer when component is destroyed
        return () => {
            // @ts-ignore
            if (redirectTimer) clearInterval(redirectTimer);
        };
    });

    function redirectToProperties() {
        goto("/properties");
    }

    function handleFinish() {
        // @ts-ignore
        if (redirectTimer) clearInterval(redirectTimer);
        redirectToProperties();
    }
</script>

<div class="page-container">
    <div class="onboarding-card">
        <div class="onboarding-content">
            <div class="progress-steps">
                <div class="step completed">
                    <div class="step-number">1</div>
                    <div class="step-label">Select your expertise</div>
                </div>
                <div class="step completed">
                    <div class="step-number">2</div>
                    <div class="step-label">Personal Detail</div>
                </div>
                <div class="step completed">
                    <div class="step-number">3</div>
                    <div class="step-label">Current Address</div>
                </div>
                <div class="step completed">
                    <div class="step-number">4</div>
                    <div class="step-label">Fit to work</div>
                </div>
                <div class="step completed">
                    <div class="step-number">5</div>
                    <div class="step-label">Onboarding Complete</div>
                </div>
            </div>

            <div class="success-banner">
                <div class="success-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <h2>Registration Successful!</h2>
                <p>
                    Your registration has been completed successfully. You'll be
                    redirected to the properties page in {redirectCountdown} seconds.
                </p>
            </div>

            <div class="onboarding-header">
                <h2>Onboarding Form Complete</h2>
            </div>

            <div class="onboarding-info">
                <p>
                    Thank you for completing your onboarding form. We will now
                    review the information and let you know if there's anything
                    else we need.
                </p>

                <h3>What happens next?</h3>

                <p>
                    Thank you for registering to partner with Digiprop! We are
                    thrilled to have you on board and look forward to a
                    successful collaboration. After submitting your
                    registration, here's what you can expect:
                </p>

                <div class="info-section">
                    <h4>Review Process</h4>
                    <p>
                        Our team will review your application to ensure a great
                        fit. This process typically takes 3-5 business days. If
                        we require any additional information, we'll reach out
                        to you directly.
                    </p>
                </div>

                <div class="info-section">
                    <h4>Partnership Agreement</h4>
                    <p>
                        Once your application is approved, we will send you a
                        partnership agreement for your review and signature.
                        This document will detail the terms and conditions of
                        our partnership.
                    </p>
                </div>

                <div class="info-section">
                    <h4>Onboarding</h4>
                    <p>
                        After the agreement is signed, you'll receive onboarding
                        materials and resources to help you get started. We will
                        also schedule an orientation session to walk you through
                        our processes and answer any questions you may have.
                        Should you have any questions in the meantime, please
                        feel free to contact us. We are excited to start this
                        journey together and are here to support you every step
                        of the way!
                    </p>
                </div>
            </div>

            <div class="action-buttons">
                <button class="finish-button" on:click={handleFinish}>
                    Go to Properties
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
        padding: 20px;
    }

    .onboarding-card {
        flex: 1;
        padding: 0;
        max-width: 800px;
        margin: 0 auto;
        width: 100%;
    }

    .onboarding-content {
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
        font-size: 12px;
    }

    .step.completed .step-number {
        background-color: #111827;
        color: white;
    }

    .success-banner {
        background-color: #f0fdf4;
        border: 1px solid #dcfce7;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 32px;
        text-align: center;
    }

    .success-icon {
        color: #22c55e;
        margin-bottom: 12px;
        display: flex;
        justify-content: center;
    }

    .success-banner h2 {
        color: #166534;
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .success-banner p {
        color: #16a34a;
        font-size: 14px;
    }

    .onboarding-header {
        margin-bottom: 24px;
    }

    .onboarding-header h2 {
        font-size: 20px;
        font-weight: 600;
        color: #111827;
    }

    .onboarding-info {
        color: #4b5563;
        font-size: 14px;
    }

    .onboarding-info p {
        margin-bottom: 16px;
        line-height: 1.5;
    }

    .onboarding-info h3 {
        font-size: 18px;
        font-weight: 600;
        color: #111827;
        margin: 24px 0 16px;
    }

    .info-section {
        margin-bottom: 20px;
    }

    .info-section h4 {
        font-size: 16px;
        font-weight: 600;
        color: #111827;
        margin-bottom: 8px;
    }

    .action-buttons {
        display: flex;
        justify-content: center;
        margin-top: 32px;
        border-top: 1px solid #e5e7eb;
        padding-top: 24px;
    }

    .finish-button {
        padding: 12px 24px;
        background-color: #111827;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: 500;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .finish-button:hover {
        background-color: #374151;
    }
</style>

<script>
    import { goto } from "$app/navigation";

    let files = {
        professionalDocumentation: null,
        validDBS: null,
        indemnityInsurance: null,
    };

    let useTaurgaSupplied = false;

    /**
     * @param {string} field
     * @param {Event & { currentTarget: EventTarget & HTMLInputElement; }} event
     */
    function handleFileUpload(field, event) {
        // @ts-ignore
        const file = event.target.files[0];
        // @ts-ignore
        files[field] = file;
    }

    function handleBack() {
        goto("/register/current-address");
    }

    function handleNext() {
        goto("/register/onboarding-complete");
    }
</script>

<div class="page-container">
    <div class="fit-to-work-card">
        <div class="fit-to-work-content">
            <!-- Progress Steps -->
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
                <div class="step completed">
                    <div class="step-number">4</div>
                    <div class="step-label">Fit to work</div>
                </div>
                <div class="step">
                    <div class="step-number">5</div>
                    <div class="step-label">Onboarding Form Complete</div>
                </div>
            </div>

            <div class="fit-to-work-header">
                <h2>Professional Documentation</h2>

                <p>
                    Please upload related professional supporting documentation,
                    CV, Certifications, Accreditations.
                </p>
            </div>

            <!-- Professional Documentation Upload -->
            <div class="upload-section">
                <label class="file-upload">
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        on:change={(e) =>
                            handleFileUpload("professionalDocumentation", e)}
                    />
                    <div class="upload-prompt">
                        <div class="upload-icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
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
                        </div>
                        <div class="upload-text">Click to Upload</div>
                        <div class="upload-subtext">
                            or drag and drop files here
                        </div>
                    </div>
                </label>
            </div>

            <!-- Valid DBS within 12 months -->
            <div class="upload-section">
                <h3>Valid DBS within 12 months</h3>
                <label class="file-upload">
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        on:change={(e) => handleFileUpload("validDBS", e)}
                    />
                    <div class="upload-prompt">
                        <div class="upload-icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
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
                        </div>
                        <div class="upload-text">Click to Upload</div>
                        <div class="upload-subtext">
                            or drag and drop files here
                        </div>
                    </div>
                </label>
            </div>

            <!-- Professional indemnity insurance -->
            <div class="upload-section">
                <h3>Professional indemnity insurance</h3>
                <div class="insurance-options">
                    <label class="checkbox-container">
                        <input
                            type="checkbox"
                            bind:checked={useTaurgaSupplied}
                        />
                        <span class="checkbox-text">
                            I would like to use Taurga supplied insurance
                        </span>
                    </label>

                    {#if !useTaurgaSupplied}
                        <label class="file-upload">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                on:change={(e) =>
                                    handleFileUpload("indemnityInsurance", e)}
                            />
                            <div class="upload-prompt">
                                <div class="upload-icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path
                                            d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                                        ></path>
                                        <polyline points="17 8 12 3 7 8"
                                        ></polyline>
                                        <line x1="12" y1="3" x2="12" y2="15"
                                        ></line>
                                    </svg>
                                </div>
                                <div class="upload-text">Click to Upload</div>
                                <div class="upload-subtext">
                                    or drag and drop files here
                                </div>
                            </div>
                        </label>
                    {/if}
                </div>
            </div>

            <div class="action-buttons">
                <button class="back-button" on:click={handleBack}>Back</button>
                <button class="next-button" on:click={handleNext}>Next</button>
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

    .fit-to-work-card {
        flex: 1;
        padding: 0;
        max-width: 800px;
        margin: 0 auto;
        width: 100%;
    }

    .fit-to-work-content {
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

    .fit-to-work-header {
        margin-bottom: 24px;
    }

    .fit-to-work-header h2 {
        font-size: 20px;
        font-weight: 600;
        color: #111827;
        margin-bottom: 8px;
    }

    .fit-to-work-header p {
        color: #6b7280;
        font-size: 14px;
    }

    .upload-section {
        margin-bottom: 24px;
    }

    .upload-section h3 {
        font-size: 16px;
        font-weight: 500;
        color: #111827;
        margin-bottom: 12px;
    }

    .file-upload {
        display: block;
        cursor: pointer;
    }

    .file-upload input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
    }

    .upload-prompt {
        border: 2px dashed #e5e7eb;
        border-radius: 8px;
        padding: 24px;
        text-align: center;
        transition: all 0.2s;
    }

    .file-upload:hover .upload-prompt {
        border-color: #d1d5db;
        background-color: #f9fafb;
    }

    .upload-icon {
        color: #6b7280;
        margin-bottom: 12px;
        display: flex;
        justify-content: center;
    }

    .upload-text {
        color: #111827;
        font-weight: 500;
        margin-bottom: 4px;
    }

    .upload-subtext {
        color: #6b7280;
        font-size: 14px;
    }

    .insurance-options {
        margin-top: 12px;
    }

    .checkbox-container {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        cursor: pointer;
    }

    .checkbox-container input {
        margin-right: 8px;
    }

    .checkbox-text {
        font-size: 14px;
        color: #111827;
    }

    .action-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 32px;
        border-top: 1px solid #e5e7eb;
        padding-top: 24px;
    }

    .back-button {
        padding: 10px 16px;
        border: 1px solid #e5e7eb;
        background-color: white;
        color: #6b7280;
        border-radius: 6px;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .back-button:hover {
        background-color: #f9fafb;
    }

    .next-button {
        padding: 10px 20px;
        background-color: #111827;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .next-button:hover {
        background-color: #374151;
    }
</style>

<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher<{
        back: void;
        next: void;
    }>();

    let dbs: File | null = null;
    let insurance: File | null = null;
    let documentation: File | null = null;
    let useDigipropSupplied = false;

    function handleFileUpload(
        event: Event,
        fileType: "dbs" | "insurance" | "documentation",
    ) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            if (fileType === "dbs") {
                dbs = file;
            } else if (fileType === "insurance") {
                insurance = file;
            } else if (fileType === "documentation") {
                documentation = file;
            }
        }
    }

    function handleDragOver(event: DragEvent) {
        event.preventDefault();
        const target = event.currentTarget as HTMLElement;
        target.classList.add("drag-over");
    }

    function handleDragLeave(event: DragEvent) {
        const target = event.currentTarget as HTMLElement;
        target.classList.remove("drag-over");
    }

    function handleDrop(
        event: DragEvent,
        fileType: "dbs" | "insurance" | "documentation",
    ) {
        event.preventDefault();
        const target = event.currentTarget as HTMLElement;
        target.classList.remove("drag-over");

        if (event.dataTransfer && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            if (fileType === "dbs") {
                dbs = file;
            } else if (fileType === "insurance") {
                insurance = file;
            } else if (fileType === "documentation") {
                documentation = file;
            }
        }
    }

    function handleBack() {
        dispatch("back");
    }

    function handleNext() {
        dispatch("next");
    }
</script>

<div class="professional-details">
    <div class="progress-steps">
        <div class="step completed">
            <div class="step-number">1</div>
            <div class="step-label">Select your expertise</div>
        </div>
        <div class="step-connector"></div>
        <div class="step completed">
            <div class="step-number">2</div>
            <div class="step-label">Personal Details</div>
        </div>
        <div class="step-connector"></div>
        <div class="step active">
            <div class="step-number">3</div>
            <div class="step-label">Professional Details</div>
        </div>
        <div class="step-connector"></div>
        <div class="step">
            <div class="step-number">4</div>
            <div class="step-label">Fit to work</div>
        </div>
        <div class="step-connector"></div>
        <div class="step">
            <div class="step-number">5</div>
            <div class="step-label">Onboarding Form Complete</div>
        </div>
    </div>

    <div class="content">
        <h1>Professional Details</h1>

        <div class="upload-section">
            <p class="upload-instruction">
                Please upload related professional supporting documentation, CV,
                Certifications, Accreditations.
            </p>

            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
                class="upload-box"
                on:dragover={handleDragOver}
                on:dragleave={handleDragLeave}
                on:drop={(e) => handleDrop(e, "documentation")}
            >
                {#if documentation}
                    <div class="file-info">
                        <span class="file-name">{documentation.name}</span>
                        <span class="file-size"
                            >({Math.round(documentation.size / 1024)} KB)</span
                        >
                    </div>
                {:else}
                    <div class="upload-icon">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 16V8M12 8L9 11M12 8L15 11"
                                stroke="#4B5563"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M3 15V16C3 17.6569 3 18.4853 3.24224 19.0815C3.45338 19.6013 3.79326 20.0413 4.22703 20.3661C4.72249 20.7388 5.40616 20.9 6.77348 21.2224C8.14081 21.5448 9.7578 21.7059 12 21.7059C14.2422 21.7059 15.8592 21.5448 17.2265 21.2224C18.5938 20.9 19.2775 20.7388 19.773 20.3661C20.2067 20.0413 20.5466 19.6013 20.7578 19.0815C21 18.4853 21 17.6569 21 16V15"
                                stroke="#4B5563"
                                stroke-width="2"
                                stroke-linecap="round"
                            />
                            <path
                                d="M3 15V9C3 7.34315 3 6.51478 3.24224 5.91852C3.45338 5.39874 3.79326 4.95876 4.22703 4.63388C4.72249 4.26118 5.40616 4.1 6.77348 3.77764C8.14081 3.45527 9.7578 3.29412 12 3.29412C14.2422 3.29412 15.8592 3.45527 17.2265 3.77764C18.5938 4.1 19.2775 4.26118 19.773 4.63388C20.2067 4.95876 20.5466 5.39874 20.7578 5.91852C21 6.51478 21 7.34315 21 9V15"
                                stroke="#4B5563"
                                stroke-width="2"
                            />
                        </svg>
                    </div>
                    <div class="upload-text">
                        <span>Click to Upload</span>
                        <span>or drag and drop files here</span>
                    </div>
                {/if}
                <input
                    type="file"
                    class="file-input"
                    on:change={(e) => handleFileUpload(e, "documentation")}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
            </div>
        </div>

        <div class="upload-section">
            <p class="upload-label">Valid DBS within 12 months</p>

            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
                class="upload-box"
                on:dragover={handleDragOver}
                on:dragleave={handleDragLeave}
                on:drop={(e) => handleDrop(e, "dbs")}
            >
                {#if dbs}
                    <div class="file-info">
                        <span class="file-name">{dbs.name}</span>
                        <span class="file-size"
                            >({Math.round(dbs.size / 1024)} KB)</span
                        >
                    </div>
                {:else}
                    <div class="upload-icon">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 16V8M12 8L9 11M12 8L15 11"
                                stroke="#4B5563"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M3 15V16C3 17.6569 3 18.4853 3.24224 19.0815C3.45338 19.6013 3.79326 20.0413 4.22703 20.3661C4.72249 20.7388 5.40616 20.9 6.77348 21.2224C8.14081 21.5448 9.7578 21.7059 12 21.7059C14.2422 21.7059 15.8592 21.5448 17.2265 21.2224C18.5938 20.9 19.2775 20.7388 19.773 20.3661C20.2067 20.0413 20.5466 19.6013 20.7578 19.0815C21 18.4853 21 17.6569 21 16V15"
                                stroke="#4B5563"
                                stroke-width="2"
                                stroke-linecap="round"
                            />
                            <path
                                d="M3 15V9C3 7.34315 3 6.51478 3.24224 5.91852C3.45338 5.39874 3.79326 4.95876 4.22703 4.63388C4.72249 4.26118 5.40616 4.1 6.77348 3.77764C8.14081 3.45527 9.7578 3.29412 12 3.29412C14.2422 3.29412 15.8592 3.45527 17.2265 3.77764C18.5938 4.1 19.2775 4.26118 19.773 4.63388C20.2067 4.95876 20.5466 5.39874 20.7578 5.91852C21 6.51478 21 7.34315 21 9V15"
                                stroke="#4B5563"
                                stroke-width="2"
                            />
                        </svg>
                    </div>
                    <div class="upload-text">
                        <span>Click to Upload</span>
                        <span>or drag and drop files here</span>
                    </div>
                {/if}
                <input
                    type="file"
                    class="file-input"
                    on:change={(e) => handleFileUpload(e, "dbs")}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
            </div>
        </div>

        <div class="upload-section">
            <p class="upload-label">
                Valid Professional Indemnity Insurance Certificate
            </p>

            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
                class="upload-box"
                on:dragover={handleDragOver}
                on:dragleave={handleDragLeave}
                on:drop={(e) => handleDrop(e, "insurance")}
            >
                {#if insurance}
                    <div class="file-info">
                        <span class="file-name">{insurance.name}</span>
                        <span class="file-size"
                            >({Math.round(insurance.size / 1024)} KB)</span
                        >
                    </div>
                {:else}
                    <div class="upload-icon">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 16V8M12 8L9 11M12 8L15 11"
                                stroke="#4B5563"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M3 15V16C3 17.6569 3 18.4853 3.24224 19.0815C3.45338 19.6013 3.79326 20.0413 4.22703 20.3661C4.72249 20.7388 5.40616 20.9 6.77348 21.2224C8.14081 21.5448 9.7578 21.7059 12 21.7059C14.2422 21.7059 15.8592 21.5448 17.2265 21.2224C18.5938 20.9 19.2775 20.7388 19.773 20.3661C20.2067 20.0413 20.5466 19.6013 20.7578 19.0815C21 18.4853 21 17.6569 21 16V15"
                                stroke="#4B5563"
                                stroke-width="2"
                                stroke-linecap="round"
                            />
                            <path
                                d="M3 15V9C3 7.34315 3 6.51478 3.24224 5.91852C3.45338 5.39874 3.79326 4.95876 4.22703 4.63388C4.72249 4.26118 5.40616 4.1 6.77348 3.77764C8.14081 3.45527 9.7578 3.29412 12 3.29412C14.2422 3.29412 15.8592 3.45527 17.2265 3.77764C18.5938 4.1 19.2775 4.26118 19.773 4.63388C20.2067 4.95876 20.5466 5.39874 20.7578 5.91852C21 6.51478 21 7.34315 21 9V15"
                                stroke="#4B5563"
                                stroke-width="2"
                            />
                        </svg>
                    </div>
                    <div class="upload-text">
                        <span>Click to Upload</span>
                        <span>or drag and drop files here</span>
                    </div>
                {/if}
                <input
                    type="file"
                    class="file-input"
                    on:change={(e) => handleFileUpload(e, "insurance")}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
            </div>
        </div>

        <div class="checkbox-section">
            <label class="checkbox-label">
                <input type="checkbox" bind:checked={useDigipropSupplied} />
                <span class="checkbox-text"
                    >Check box if wish to use Digiprop supplied.</span
                >
            </label>
        </div>

        <div class="navigation-buttons">
            <button class="back-button" on:click={handleBack}>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15.8332 10H4.1665"
                        stroke="#111827"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M9.99984 15.8334L4.1665 10.0001L9.99984 4.16675"
                        stroke="#111827"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                Go back
            </button>
            <button class="next-button" on:click={handleNext}> Next </button>
        </div>
    </div>
</div>

<style>
    .professional-details {
        max-width: 800px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
    }

    .progress-steps {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding: 15px 20px;
        background-color: white;
        border-radius: 8px;
    }

    .step {
        display: flex;
        align-items: center;
        position: relative;
        z-index: 1;
    }

    .step-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #e0e0e0;
        color: #555;
        font-weight: bold;
        font-size: 12px;
        margin-right: 8px;
    }

    .step-label {
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

    .step.active .step-number {
        background-color: #333;
        color: white;
    }

    .step.active .step-label {
        color: #333;
        font-weight: 500;
    }

    .step.completed .step-number {
        background-color: #4caf50;
        color: white;
    }

    .content {
        background-color: white;
        padding: 25px;
        border-radius: 8px;
    }

    h1 {
        font-size: 1.25rem;
        margin-top: 0;
        margin-bottom: 1.5rem;
        color: #333;
    }

    .upload-section {
        margin-bottom: 20px;
    }

    .upload-instruction {
        font-size: 0.9rem;
        color: #555;
        margin-bottom: 10px;
    }

    .upload-label {
        font-size: 0.9rem;
        color: #555;
        margin-bottom: 10px;
    }

    .upload-box {
        border: 2px dashed #ccc;
        border-radius: 6px;
        padding: 20px;
        text-align: center;
        position: relative;
        cursor: pointer;
        transition: border-color 0.3s;
        min-height: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .upload-box:hover {
        border-color: #999;
    }

    .upload-icon {
        margin-bottom: 10px;
    }

    .upload-text {
        display: flex;
        flex-direction: column;
        font-size: 0.9rem;
        color: #555;
    }

    .upload-text span:first-child {
        font-weight: 500;
        color: #333;
    }

    .file-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }

    .file-info {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .file-name {
        font-weight: 500;
        color: #333;
        margin-bottom: 5px;
    }

    .file-size {
        font-size: 0.8rem;
        color: #777;
    }

    .checkbox-section {
        margin: 20px 0;
    }

    .checkbox-label {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .checkbox-text {
        margin-left: 10px;
        font-size: 0.9rem;
        color: #555;
    }

    .navigation-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
    }

    .back-button {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        color: #333;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        padding: 8px 0;
    }

    .back-button svg {
        margin-right: 8px;
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
</style>

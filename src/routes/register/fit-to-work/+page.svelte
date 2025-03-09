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
        goto("/register/professional-details");
    }

    function handleNext() {
        goto("/register/onboarding-complete");
    }
</script>

<div class="max-w-3xl mx-auto px-8 py-6">
    <!-- Progress Steps - Horizontal line with circles -->
    <div class="flex items-center mb-12 mx-6">
        <div class="flex flex-col items-center">
            <div
                class="w-5 h-5 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs text-gray-500"
            >
                1
            </div>
            <span class="text-xs text-gray-500 mt-1 whitespace-nowrap"
                >Select your expertise</span
            >
        </div>
        <div class="border-t border-gray-300 flex-grow mx-2"></div>

        <div class="flex flex-col items-center">
            <div
                class="w-5 h-5 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs text-gray-500"
            >
                2
            </div>
            <span class="text-xs text-gray-500 mt-1 whitespace-nowrap"
                >Personals Detail</span
            >
        </div>
        <div class="border-t border-gray-300 flex-grow mx-2"></div>

        <div class="flex flex-col items-center">
            <div
                class="w-5 h-5 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs text-gray-500"
            >
                3
            </div>
            <span class="text-xs text-gray-500 mt-1 whitespace-nowrap"
                >Professional Details</span
            >
        </div>
        <div class="border-t border-gray-300 flex-grow mx-2"></div>

        <div class="flex flex-col items-center">
            <div
                class="w-5 h-5 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs text-gray-500"
            >
                4
            </div>
            <span class="text-xs text-gray-500 mt-1 whitespace-nowrap"
                >Fit to work</span
            >
        </div>
        <div class="border-t border-gray-300 flex-grow mx-2"></div>

        <div class="flex flex-col items-center">
            <div
                class="w-5 h-5 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs text-gray-500"
            >
                5
            </div>
            <span class="text-xs text-gray-500 mt-1 whitespace-nowrap"
                >Onboarding Form Complete</span
            >
        </div>
    </div>

    <div class="px-6">
        <h2 class="text-base font-medium mb-4">Professional Details</h2>

        <p class="text-sm text-gray-600 mb-6">
            Please upload related professional supporting documentation, CV,
            Certifications, Accreditations.
        </p>

        <!-- Professional Documentation Upload -->
        <div class="mb-6">
            <label
                class="block border border-dashed border-gray-400 rounded p-4 text-center cursor-pointer h-20 flex flex-col justify-center"
            >
                <input
                    type="file"
                    class="hidden"
                    accept=".pdf,.doc,.docx"
                    on:change={(e) =>
                        handleFileUpload("professionalDocumentation", e)}
                />
                <div class="text-sm text-gray-600 font-medium">
                    Click to Upload
                </div>
                <div class="text-xs text-gray-500">
                    or drag and drop files here
                </div>
            </label>
        </div>

        <!-- Valid DBS within 12 months -->
        <div class="mb-6">
            <p class="text-sm text-gray-600 mb-2">Valid DBS within 12 months</p>
            <label
                class="block border border-dashed border-gray-400 rounded p-4 text-center cursor-pointer h-20 flex flex-col justify-center"
            >
                <input
                    type="file"
                    class="hidden"
                    accept=".pdf,.doc,.docx"
                    on:change={(e) => handleFileUpload("validDBS", e)}
                />
                <div class="text-sm text-gray-600 font-medium">
                    Click to Upload
                </div>
                <div class="text-xs text-gray-500">
                    or drag and drop files here
                </div>
            </label>
        </div>

        <!-- Valid Professional Indemnity Insurance Certificate -->
        <div class="mb-6">
            <p class="text-sm text-gray-600 mb-2">
                Valid Professional Indemnity Insurance Certificate
            </p>
            <label
                class="block border border-dashed border-gray-400 rounded p-4 text-center cursor-pointer h-20 flex flex-col justify-center"
            >
                <input
                    type="file"
                    class="hidden"
                    accept=".pdf,.doc,.docx"
                    on:change={(e) => handleFileUpload("indemnityInsurance", e)}
                />
                <div class="text-sm text-gray-600 font-medium">
                    Click to Upload
                </div>
                <div class="text-xs text-gray-500">
                    or drag and drop files here
                </div>
            </label>
        </div>

        <!-- Checkbox for Taurga supplied -->
        <div class="mb-10">
            <label class="flex items-center">
                <input
                    type="checkbox"
                    bind:checked={useTaurgaSupplied}
                    class="h-4 w-4 mr-2"
                />
                <span class="text-sm text-gray-600"
                    >Check box if wish to use Taurga supplied.</span
                >
            </label>
        </div>

        <div class="flex justify-between mt-8">
            <button
                on:click={handleBack}
                class="flex items-center text-gray-700"
            >
                <svg
                    class="w-4 h-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    ></path>
                </svg>
                Go Back
            </button>

            <button
                on:click={handleNext}
                class="bg-black text-white px-4 py-1 rounded text-sm"
            >
                Next
            </button>
        </div>
    </div>
</div>

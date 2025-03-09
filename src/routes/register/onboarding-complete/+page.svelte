<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let redirectCountdown = 5;
    let redirectTimer;

    onMount(() => {
        // Start the countdown for automatic redirect
        redirectTimer = setInterval(() => {
            redirectCountdown--;
            if (redirectCountdown <= 0) {
                clearInterval(redirectTimer);
                redirectToProperties();
            }
        }, 1000);

        // Clean up the timer when component is destroyed
        return () => {
            if (redirectTimer) clearInterval(redirectTimer);
        };
    });

    function redirectToProperties() {
        goto("/properties");
    }

    function handleFinish() {
        if (redirectTimer) clearInterval(redirectTimer);
        redirectToProperties();
    }
</script>

<div class="container mx-auto px-4 py-8 max-w-3xl">
    <div class="border rounded-lg p-4 mb-8">
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <div
                    class="rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center text-sm mr-2"
                >
                    1
                </div>
                <span class="text-sm">Select your expertise</span>
            </div>
            <div class="border-t border-gray-300 w-4"></div>

            <div class="flex items-center">
                <div
                    class="rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center text-sm mr-2"
                >
                    2
                </div>
                <span class="text-sm">Personal Detail</span>
            </div>
            <div class="border-t border-gray-300 w-4"></div>

            <div class="flex items-center">
                <div
                    class="rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center text-sm mr-2"
                >
                    3
                </div>
                <span class="text-sm">Professional Details</span>
            </div>
            <div class="border-t border-gray-300 w-4"></div>

            <div class="flex items-center">
                <div
                    class="rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center text-sm mr-2"
                >
                    4
                </div>
                <span class="text-sm">Fit to work</span>
            </div>
            <div class="border-t border-gray-300 w-4"></div>

            <div class="flex items-center">
                <div
                    class="rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center text-sm mr-2"
                >
                    5
                </div>
                <span class="text-sm font-medium">Onboarding Form Complete</span
                >
            </div>
        </div>
    </div>

    <div class="mt-8">
        <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div class="flex items-center mb-4">
                <svg
                    class="w-8 h-8 text-green-500 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
                <h3 class="text-xl font-bold text-green-800">
                    Registration Successful!
                </h3>
            </div>
            <p class="text-green-700 mb-2">
                Your registration has been completed successfully. You'll be
                redirected to the properties page in {redirectCountdown} seconds.
            </p>
        </div>

        <h2 class="text-2xl font-semibold mb-6">Onboarding Form Complete</h2>

        <div class="space-y-6">
            <p class="text-gray-700">
                Dylan, thank you for completing your onboarding form. We will
                now review the information and let you know if there's anything
                else we need.
            </p>

            <h3 class="text-xl font-medium mt-6">What happens next?</h3>

            <p class="text-gray-700">
                Thank you for registering to partner with Digiprop! We are
                thrilled to have you on board and look forward to a successful
                collaboration. After submitting your registration, here's what
                you can expect confirmation Email: You will receive a
                confirmation email shortly, acknowledging your registration.
                This email will outline the next steps in the partnership
                process.
            </p>

            <h4 class="font-medium mt-4">Review Process</h4>
            <p class="text-gray-700">
                Our team will review your application to ensure a great fit.
                This process typically takes 3-5 business days. If we require
                any additional information, we'll reach out to you directly.
            </p>

            <h4 class="font-medium mt-4">Partnership Agreement</h4>
            <p class="text-gray-700">
                Once your application is approved, we will send you a
                partnership agreement for your review and signature. This
                document will detail the terms and conditions of our
                partnership.
            </p>

            <h4 class="font-medium mt-4">Onboarding</h4>
            <p class="text-gray-700">
                After the agreement is signed, you'll receive onboarding
                materials and resources to help you get started. We will also
                schedule an orientation session to walk you through our
                processes and answer any questions you may have. Should you have
                any questions in the meantime, please feel free to contact us.
                We are excited to start this journey together and are here to
                support you every step of the way!
            </p>
        </div>

        <div class="mt-8 flex justify-end">
            <button
                on:click={handleFinish}
                class="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
                Go to Properties
            </button>
        </div>
    </div>
</div>

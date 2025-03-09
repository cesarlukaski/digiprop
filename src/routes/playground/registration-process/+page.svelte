<script lang="ts">
    import ExpertiseAccordion from "$lib/ExpertiseAccordion.svelte";

    function handleSelect(event: CustomEvent<{ businessType: string | null }>) {
        console.log("Selected business type:", event.detail.businessType);
    }

    function handleNext(event: CustomEvent<{ businessType: string | null }>) {
        console.log(
            "Moving to next step with business type:",
            event.detail.businessType,
        );
        // In a real application, you would navigate to the next page or update the current step
        alert(
            `Selected business type: ${event.detail.businessType}. Now proceeding to the next step.`,
        );
    }
</script>

<div class="demo-container">
    <div class="demo-header">
        <h1>Digiprop Registration Process</h1>
        <p>
            This demo showcases the registration process for Digiprop clients
            and partners.
        </p>
    </div>

    <div class="demo-content">
        <ExpertiseAccordion on:select={handleSelect} on:next={handleNext} />
    </div>

    <div class="demo-info">
        <h2>Implementation Notes</h2>
        <ul>
            <li>This is the first step of a multi-step registration process</li>
            <li>The progress bar at the top shows all steps in the process</li>
            <li>
                Different user types (client vs partner) will see slightly
                different labels for some steps
            </li>
            <li>
                Selecting a business type and clicking "Next" would typically
                navigate to the next step
            </li>
        </ul>
    </div>
</div>

<style>
    .demo-container {
        max-width: 1000px;
        margin: 2rem auto;
        padding: 0 1rem;
    }

    .demo-header {
        margin-bottom: 2rem;
    }

    .demo-header h1 {
        color: #333;
        margin-bottom: 0.5rem;
    }

    .demo-header p {
        color: #666;
    }

    .demo-content {
        margin-bottom: 2rem;
    }

    .demo-info {
        background-color: #f5f5f5;
        padding: 1.5rem;
        border-radius: 8px;
        margin-top: 2rem;
    }

    .demo-info h2 {
        margin-top: 0;
        color: #333;
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }

    .demo-info ul {
        margin: 0;
        padding-left: 1.5rem;
    }

    .demo-info li {
        margin-bottom: 0.5rem;
    }
</style>

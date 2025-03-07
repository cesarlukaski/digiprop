<script>
    import Form from "$lib/Form.svelte";
</script>

<main>
    <h1>Contact Us</h1>
    <p>Please fill out the form below to get in touch with us.</p>

    <Form title="Contact Form" />
</main>

<style>
    main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    h1 {
        color: #333;
        text-align: center;
        margin-bottom: 0.5rem;
    }

    p {
        text-align: center;
        color: #666;
        margin-bottom: 2rem;
    }
</style>

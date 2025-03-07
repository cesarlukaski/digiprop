<script lang="ts">
    // Form properties
    export let title = "Contact Form";

    // Form data
    let formData = {
        name: "",
        email: "",
        phone: "",
        message: "",
        acceptTerms: false,
    };

    // Form validation
    let errors = {
        name: "",
        email: "",
        phone: "",
        message: "",
    };

    // Handle form submission
    function handleSubmit() {
        // Reset errors
        errors = {
            name: "",
            email: "",
            phone: "",
            message: "",
        };

        // Validate form
        let isValid = true;

        if (!formData.name) {
            errors.name = "Name is required";
            isValid = false;
        }

        if (!formData.email) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
            isValid = false;
        }

        if (!formData.message) {
            errors.message = "Message is required";
            isValid = false;
        }

        if (isValid) {
            // Submit form data
            console.log("Form submitted:", formData);
            alert("Form submitted successfully!");

            // Reset form
            formData = {
                name: "",
                email: "",
                phone: "",
                message: "",
                acceptTerms: false,
            };
        }
    }
</script>

<div class="form-container">
    <h2>{title}</h2>

    <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
            <label for="name">Name <span class="required">*</span></label>
            <input
                type="text"
                id="name"
                bind:value={formData.name}
                class:error={errors.name}
                placeholder="Enter your name"
            />
            {#if errors.name}
                <span class="error-message">{errors.name}</span>
            {/if}
        </div>

        <div class="form-group">
            <label for="email">Email <span class="required">*</span></label>
            <input
                type="email"
                id="email"
                bind:value={formData.email}
                class:error={errors.email}
                placeholder="Enter your email"
            />
            {#if errors.email}
                <span class="error-message">{errors.email}</span>
            {/if}
        </div>

        <div class="form-group">
            <label for="phone">Phone</label>
            <input
                type="tel"
                id="phone"
                bind:value={formData.phone}
                class:error={errors.phone}
                placeholder="Enter your phone number"
            />
            {#if errors.phone}
                <span class="error-message">{errors.phone}</span>
            {/if}
        </div>

        <div class="form-group">
            <label for="message">Message <span class="required">*</span></label>
            <textarea
                id="message"
                bind:value={formData.message}
                class:error={errors.message}
                placeholder="Enter your message"
                rows="5"
            ></textarea>
            {#if errors.message}
                <span class="error-message">{errors.message}</span>
            {/if}
        </div>

        <div class="form-group checkbox">
            <input
                type="checkbox"
                id="terms"
                bind:checked={formData.acceptTerms}
            />
            <label for="terms">I accept the terms and conditions</label>
        </div>

        <button type="submit" class="submit-button">Submit</button>
    </form>
</div>

<style>
    .form-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h2 {
        color: #333;
        margin-bottom: 1.5rem;
        text-align: center;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #333;
    }

    .required {
        color: #e53e3e;
    }

    input[type="text"],
    input[type="email"],
    input[type="tel"],
    textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        font-size: 1rem;
        transition: border-color 0.2s;
    }

    input[type="text"]:focus,
    input[type="email"]:focus,
    input[type="tel"]:focus,
    textarea:focus {
        border-color: #4f46e5;
        outline: none;
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }

    input.error,
    textarea.error {
        border-color: #e53e3e;
    }

    .error-message {
        display: block;
        color: #e53e3e;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }

    .checkbox {
        display: flex;
        align-items: center;
    }

    .checkbox input {
        margin-right: 0.5rem;
    }

    .checkbox label {
        margin-bottom: 0;
    }

    .submit-button {
        display: block;
        width: 100%;
        padding: 0.75rem;
        background-color: #4f46e5;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .submit-button:hover {
        background-color: #4338ca;
    }

    .submit-button:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
    }
</style>

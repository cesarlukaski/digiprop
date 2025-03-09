<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/api";

    // Interface for invoice data
    interface Invoice {
        id: string;
        propertyAddress: string;
        fullAddress: string;
        amount: number;
        date: string;
        dueDate: string;
        status: "Paid" | "Pending" | "Overdue";
        paymentMethod: string;
        items: {
            description: string;
            quantity: number;
            unitPrice: number;
            total: number;
        }[];
    }

    // Sample invoices data
    let invoices: Invoice[] = Array(12)
        .fill(null)
        .map((_, index) => ({
            id: `INV-${2024}${String(index + 1).padStart(4, "0")}`,
            propertyAddress: "78 Court Street",
            fullAddress: "78 Court Street Tonypandy, CF 28L 0B",
            amount: Math.floor(Math.random() * 5000) + 1000,
            date: `10/12/2024`,
            dueDate: `10/${Math.floor(Math.random() * 12) + 1}/2024`,
            status: ["Paid", "Pending", "Overdue"][
                Math.floor(Math.random() * 3)
            ] as "Paid" | "Pending" | "Overdue",
            paymentMethod: ["Credit Card", "Bank Transfer", "PayPal"][
                Math.floor(Math.random() * 3)
            ],
            items: [
                {
                    description: "Property Photography",
                    quantity: 1,
                    unitPrice: 250,
                    total: 250,
                },
                {
                    description: "Virtual Tour",
                    quantity: 1,
                    unitPrice: 450,
                    total: 450,
                },
                {
                    description: "Floor Plan",
                    quantity: 1,
                    unitPrice: 150,
                    total: 150,
                },
            ],
        }));

    // Pagination controls
    let currentPage = 1;
    let itemsPerPage = 10;
    let totalPages = Math.ceil(invoices.length / itemsPerPage);
    let displayedInvoices: Invoice[] = [];

    // Selected invoice for details view
    let selectedInvoice: Invoice | null = null;
    let showInvoiceDetails = false;

    // Update displayed invoices based on pagination
    function updateDisplayedInvoices() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        displayedInvoices = invoices.slice(startIndex, endIndex);
    }

    // Navigation functions
    function goToPage(page: number) {
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        updateDisplayedInvoices();
    }

    function nextPage() {
        goToPage(currentPage + 1);
    }

    function prevPage() {
        goToPage(currentPage - 1);
    }

    // Handle invoice selection for details view
    function viewInvoiceDetails(invoice: Invoice) {
        selectedInvoice = invoice;
        showInvoiceDetails = true;
    }

    // Close invoice details modal
    function closeInvoiceDetails() {
        showInvoiceDetails = false;
        setTimeout(() => {
            selectedInvoice = null;
        }, 300);
    }

    // Download invoice as PDF
    function downloadInvoice(invoice: Invoice) {
        alert(
            `Downloading invoice ${invoice.id}... (In a real app, this would generate a PDF)`,
        );
    }

    // Calculate invoice total
    function calculateTotal(invoice: Invoice): number {
        return invoice.items.reduce((sum, item) => sum + item.total, 0);
    }

    // Format currency
    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
        }).format(amount);
    }

    // Format date for display
    function formatDate(dateString: string): string {
        const [day, month, year] = dateString.split("/");
        const date = new Date(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day),
        );
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    // Get status color class
    function getStatusClass(status: string): string {
        switch (status) {
            case "Paid":
                return "status-paid";
            case "Pending":
                return "status-pending";
            case "Overdue":
                return "status-overdue";
            default:
                return "";
        }
    }

    onMount(() => {
        // Check authentication
        authStore.init();

        if (!authStore.user) {
            goto("/login");
            return;
        }

        // Initialize displayed invoices
        updateDisplayedInvoices();
    });
</script>

<div class="payment-container">
    <div class="breadcrumb">
        <p>Dashboard / Payment</p>
    </div>

    <div class="payment-header">
        <h1>Payment</h1>
        <p class="subtitle">MANAGE YOUR PAYMENT</p>
    </div>

    <div class="payment-content">
        <h2 class="section-title">All Invoices</h2>

        <div class="invoices-table">
            <table>
                <thead>
                    <tr>
                        <th class="property-col">Property Address</th>
                        <th class="date-col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {#each displayedInvoices as invoice}
                        <tr
                            class="invoice-row"
                            on:click={() => viewInvoiceDetails(invoice)}
                        >
                            <td class="property-cell">
                                <p class="property-address">
                                    {invoice.fullAddress}
                                </p>
                            </td>
                            <td class="date-cell">
                                <span class="date">{invoice.date}</span>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        <!-- Pagination controls -->
        <div class="pagination">
            <button
                class="pagination-btn prev-btn"
                disabled={currentPage === 1}
                on:click={prevPage}
            >
                Previous
            </button>
            <div class="page-info">
                Page {currentPage} of {totalPages}
            </div>
            <button
                class="pagination-btn next-btn"
                disabled={currentPage === totalPages}
                on:click={nextPage}
            >
                Next
            </button>
        </div>
    </div>
</div>

<!-- Invoice details modal -->
{#if showInvoiceDetails && selectedInvoice}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="modal-overlay" on:click={closeInvoiceDetails}>
        <div class="modal-content" on:click|stopPropagation>
            <button class="close-btn" on:click={closeInvoiceDetails}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            <div class="invoice-header">
                <div class="invoice-title">
                    <h2>Invoice {selectedInvoice.id}</h2>
                    <p class="address">{selectedInvoice.fullAddress}</p>
                </div>
                <div class="invoice-status">
                    <span
                        class={`status-badge ${getStatusClass(selectedInvoice.status)}`}
                    >
                        {selectedInvoice.status}
                    </span>
                </div>
            </div>

            <div class="invoice-details">
                <div class="detail-row">
                    <div class="detail-item">
                        <span class="label">Invoice Date</span>
                        <span class="value"
                            >{formatDate(selectedInvoice.date)}</span
                        >
                    </div>
                    <div class="detail-item">
                        <span class="label">Due Date</span>
                        <span class="value"
                            >{formatDate(selectedInvoice.dueDate)}</span
                        >
                    </div>
                    <div class="detail-item">
                        <span class="label">Payment Method</span>
                        <span class="value"
                            >{selectedInvoice.paymentMethod}</span
                        >
                    </div>
                </div>
            </div>

            <div class="invoice-items">
                <h3>Invoice Items</h3>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each selectedInvoice.items as item}
                            <tr>
                                <td>{item.description}</td>
                                <td>{item.quantity}</td>
                                <td>{formatCurrency(item.unitPrice)}</td>
                                <td>{formatCurrency(item.total)}</td>
                            </tr>
                        {/each}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" class="total-label">Total</td>
                            <td class="total-amount"
                                >{formatCurrency(
                                    calculateTotal(selectedInvoice),
                                )}</td
                            >
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="invoice-actions">
                <button
                    class="download-btn"
                    on:click={() => downloadInvoice(selectedInvoice!)}
                >
                    Download PDF
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                        ></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    .payment-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .breadcrumb {
        font-size: 12px;
        color: #6c757d;
        margin-bottom: 20px;
    }

    .payment-header {
        display: flex;
        flex-direction: column;
        margin-bottom: 24px;
    }

    .payment-header h1 {
        font-size: 24px;
        font-weight: 600;
        margin: 0 0 4px 0;
    }

    .subtitle {
        font-size: 12px;
        color: #6c757d;
        margin: 0;
        letter-spacing: 0.5px;
    }

    .payment-content {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        padding: 20px;
    }

    .section-title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 20px 0;
    }

    .invoices-table {
        width: 100%;
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th {
        text-align: left;
        padding: 12px 16px;
        font-weight: 500;
        font-size: 14px;
        color: #6c757d;
        border-bottom: 1px solid #e9ecef;
    }

    td {
        padding: 16px;
        border-bottom: 1px solid #e9ecef;
    }

    .invoice-row {
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .invoice-row:hover {
        background-color: #f8f9fa;
    }

    .property-col {
        width: 70%;
    }

    .date-col {
        width: 30%;
    }

    .property-address {
        font-size: 14px;
        margin: 0;
        color: #212529;
    }

    .date {
        font-size: 14px;
        color: #6c757d;
    }

    /* Status badge styles */
    .status-badge {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
    }

    .status-paid {
        background-color: rgba(40, 167, 69, 0.1);
        color: #28a745;
    }

    .status-pending {
        background-color: rgba(255, 193, 7, 0.1);
        color: #ffc107;
    }

    .status-overdue {
        background-color: rgba(220, 53, 69, 0.1);
        color: #dc3545;
    }

    /* Pagination */
    .pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        padding: 0 16px;
    }

    .pagination-btn {
        background: none;
        border: 1px solid #dee2e6;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        color: #212529;
        cursor: pointer;
        transition: all 0.2s;
    }

    .pagination-btn:hover:not(:disabled) {
        background-color: #f8f9fa;
    }

    .pagination-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .page-info {
        font-size: 14px;
        color: #6c757d;
    }

    /* Invoice details modal */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
    }

    .modal-content {
        background-color: white;
        border-radius: 8px;
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        padding: 24px;
    }

    .close-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        background: none;
        border: none;
        cursor: pointer;
        color: #6c757d;
        z-index: 10;
    }

    .invoice-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 24px;
        padding-right: 36px; /* Add padding to prevent overlap with close button */
    }

    .invoice-title h2 {
        font-size: 20px;
        font-weight: 600;
        margin: 0 0 8px 0;
    }

    .invoice-title .address {
        font-size: 14px;
        color: #6c757d;
        margin: 0;
    }

    .invoice-status {
        margin-top: 4px;
    }

    .invoice-details {
        margin-bottom: 24px;
    }

    .detail-row {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
    }

    .detail-item {
        flex: 1;
        min-width: 150px;
    }

    .detail-item .label {
        display: block;
        font-size: 12px;
        color: #6c757d;
        margin-bottom: 4px;
    }

    .detail-item .value {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: #212529;
    }

    .invoice-items {
        margin-bottom: 24px;
    }

    .invoice-items h3 {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 16px 0;
    }

    .items-table {
        width: 100%;
    }

    .items-table th {
        border-bottom: 1px solid #dee2e6;
        padding: 12px;
        font-size: 14px;
    }

    .items-table td {
        padding: 12px;
        font-size: 14px;
        border-bottom: 1px solid #f1f3f5;
    }

    .items-table tfoot td {
        border-top: 2px solid #dee2e6;
        border-bottom: none;
        padding-top: 16px;
    }

    .total-label {
        text-align: right;
        font-weight: 600;
    }

    .total-amount {
        font-weight: 600;
    }

    .invoice-actions {
        display: flex;
        justify-content: flex-end;
    }

    .download-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background-color: #000;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .download-btn:hover {
        background-color: #212529;
    }

    @media (max-width: 768px) {
        .detail-row {
            flex-direction: column;
            gap: 16px;
        }

        .invoice-header {
            flex-direction: column;
            gap: 16px;
        }
    }
</style>

import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    // The ID is available as params.id
    // In a real app, you would validate the ID here

    if (!params.id || isNaN(parseInt(params.id))) {
        throw error(404, 'Property not found');
    }

    // The data will be loaded in the +page.svelte file
    return {
        propertyId: params.id
    };
} 
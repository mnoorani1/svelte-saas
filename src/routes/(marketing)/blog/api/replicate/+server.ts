import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { REPLICATE_API_TOKEN } from '$env/static/private';
console.log(REPLICATE_API_TOKEN);
export const POST: RequestHandler = async () => {
  const response = await fetch('https://api.replicate.com/v1/models', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            owner: 'mnoorani1',
            name: 'flux-test-2',
            description: 'An example model',
            visibility: 'public',
            hardware: 'gpu-a40-large'
        })
    });

    const data = await response.json();
    return json(data);
}
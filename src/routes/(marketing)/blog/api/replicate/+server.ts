import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

console.log('hello')

export const POST: RequestHandler = async () => {
  
  console.log(process.env)
    try {
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
    } catch (error: unknown) {
        if (error instanceof Error) {
            return json({ error: error.message }, { status: 500 });
        }
        return json({ error: 'An unknown error occurred' }, { status: 500 });
    }
};
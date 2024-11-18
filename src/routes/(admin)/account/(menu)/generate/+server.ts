import { json } from '@sveltejs/kit';
import Replicate from 'replicate';
import { REPLICATE_API_TOKEN } from '$env/static/private';

export async function POST() {
    const replicate = new Replicate({
      auth: REPLICATE_API_TOKEN,
    });

    console.log(REPLICATE_API_TOKEN)
    const model =   "mnoorani1/testtest7:74de37c5df927f0dedf1ab83ce642b8f9740edd50deb37f45c04cb1bf5f0d6bf"
    const prompt =
      "A soothing setup with TOK glowing in a gentle blue hue on a bedside table, set in a nursery or toddler's room. Emphasize TOK's child-safe, squishy silicone design with the Bluetooth feature highlighted. Add details like a storybook and a blanket to create a serene, bedtime-ready environment."

    try {
        const output = await replicate.run(model, { input: { prompt } });
        console.log(output);
        return json({ success: true, output });
    } catch (error: unknown) {
      console.error(error);
        if (error instanceof Error) {
            return json({ success: false, error: error.message }, { status: 500 });
        }
        return json({ success: false, error: 'An unknown error occurred' }, { status: 500 });
    }
}
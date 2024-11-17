
import { REPLICATE_API_TOKEN } from '$env/static/private';
import type { Actions } from './$types';
import JSZip from 'jszip';

export const actions = {
  createModel: async ({ request }) => {
    const data = await request.formData();
    console.log(REPLICATE_API_TOKEN);
    
    const response = await fetch('https://api.replicate.com/v1/models', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        owner: 'mnoorani1',
        name: 'testtest2',
        description: 'Model created from SaaS starter',
        visibility: 'public',
        hardware: 'gpu-a40-large'
      })
    });

    const result = await response.json();
    console.log(result);
    return { success: true, model: result };
  },

  uploadTrainingData: async ({ request }) => {
    const data = await request.formData();
    const imageUrls = JSON.parse(data.get('selectedImages') as string);
    
    // Create zip file containing images
    const zip = new JSZip();
    
    // Download and add each image to zip
    for (let i = 0; i < imageUrls.length; i++) {
      const imageResponse = await fetch(imageUrls[i]);
      const imageBlob = await imageResponse.blob();
      zip.file(`image${i}.jpg`, imageBlob);
    }
    
    // Generate zip file
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    
    // Create FormData with zip file
    const formData = new FormData();
    formData.append('content', zipBlob, 'data.zip');

    // Upload to Replicate
    const response = await fetch('https://api.replicate.com/v1/files', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REPLICATE_API_TOKEN}`
      },
      body: formData
    });

    const result = await response.json();
    return { success: true, uploadedFile: result };
  }
} satisfies Actions;
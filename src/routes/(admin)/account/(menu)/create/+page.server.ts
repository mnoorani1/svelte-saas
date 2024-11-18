import { REPLICATE_API_TOKEN } from '$env/static/private';
import JSZip from 'jszip';

async function uploadTrainingData(imageUrls: string[]) {
  const zip = new JSZip();
  
  for (let i = 0; i < imageUrls.length; i++) {
    const imageResponse = await fetch(imageUrls[i]);
    const arrayBuffer = await imageResponse.arrayBuffer();
    zip.file(`image${i}.jpg`, arrayBuffer);
  }
  
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  
  const formData = new FormData();
  formData.append('content', zipBlob, 'data.zip');

  const response = await fetch('https://api.replicate.com/v1/files', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${REPLICATE_API_TOKEN}`
    },
    body: formData
  });

  const result = await response.json();
  console.log(result);
  return result;
}

async function startModelTraining(modelName: string, trainingDataUrl: string) {
  const response = await fetch('https://api.replicate.com/v1/models/ostris/flux-dev-lora-trainer/versions/d995297071a44dcb72244e6c19462111649ec86a9646c32df56daa7f14801944/trainings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      destination: `mnoorani1/${modelName}`,
      input: {
        input_images: trainingDataUrl,
        trigger_word: "TOK"
      }
    })
  });

  const result = await response.json();
  console.log(result);
  return result;
}

export const actions = {
  createModel: async ({ request }) => {
    const data = await request.formData();
    const imageUrls = JSON.parse(data.get('selectedImages') as string);
    
    const response = await fetch('https://api.replicate.com/v1/models', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        owner: 'mnoorani1',
        name: 'testtest7',
        description: 'Model created from SaaS starter',
        visibility: 'public',
        hardware: 'gpu-a40-large'
      })
    });

    const result = await response.json();
    const uploadedFile = await uploadTrainingData(imageUrls);
    const trainingResponse = await startModelTraining(result.name, uploadedFile.urls.get);
    return { success: true, model: result, uploadedFile, trainingResponse };
  }
}
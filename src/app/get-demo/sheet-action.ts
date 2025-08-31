
'use server';

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxlmlxRXsT7pcYKVZV4Kl_dYdW04LdaPglOERnjV1gbWeyXowZ-ImiFKptPfzCFPcDF/exec";

// This function now runs on the server-side.
export async function appendToGoogleSheet(data: { name: string; email: string; contact: string; }) {
  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', 
      },
      body: JSON.stringify(data),
      cache: 'no-store',
    });
    
    if (response.ok) {
      console.log('Successfully sent data to Google Sheet from the server.');
    } else {
      const errorText = await response.text();
      console.error('Failed to send data to Google Sheet:', response.status, errorText);
      throw new Error(`Google Sheet API Error: ${errorText}`);
    }

  } catch (error) {
    console.error('Error in appendToGoogleSheet:', error);
    throw error;
  }
}

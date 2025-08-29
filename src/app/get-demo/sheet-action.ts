'use client';

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxlmlxRXsT7pcYKVZV4Kl_dYdW04LdaPglOERnjV1gbWeyXowZ-ImiFKptPfzCFPcDF/exec";

// This function now runs on the client-side, in the background.
export async function appendToGoogleSheet(data: { name: string; email: string; contact: string; }) {
  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Required for Apps Script to parse JSON correctly
      },
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      console.log('Successfully sent data to Google Sheet.');
    } else {
      const errorText = await response.text();
      console.error('Failed to send data to Google Sheet:', response.status, errorText);
    }

  } catch (error) {
    console.error('Client-side error during fetch to Google Sheet:', error);
  }
}

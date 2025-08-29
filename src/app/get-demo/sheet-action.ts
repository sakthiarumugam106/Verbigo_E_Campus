'use client';

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxlmlxRXsT7pcYKVZV4Kl_dYdW04LdaPglOERnjV1gbWeyXowZ-ImiFKptPfzCFPcDF/exec";

// This function now runs on the client-side, in the background.
export async function appendToGoogleSheet(data: { name: string; email: string; contact: string; }) {
  try {
    // We use keepalive: true so the request continues even if the user navigates away
    await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Required header for Apps Script
      },
      body: JSON.stringify(data),
      mode: 'no-cors', // Use no-cors for a "fire-and-forget" request
      keepalive: true,
    });
    
    // With no-cors, we can't inspect the response, but we can log that the attempt was made.
    console.log('Successfully attempted to send data to Google Sheet in the background.');

  } catch (error) {
    // This will only catch network errors, not API errors, due to no-cors.
    console.error('Client-side error during fetch to Google Sheet:', error);
  }
}

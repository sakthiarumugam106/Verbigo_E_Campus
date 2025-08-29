'use client';

// This URL will post to your "Verbigo_Careers" Google Sheet
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxlmlxRXsT7pcYKVZV4Kl_dYdW04LdaPglOERnjV1gbWeyXowZ-ImiFKptPfzCFPcDF/exec"; 

type ApplicationData = {
  name: string;
  email: string;
  age: number;
  language: string;
  education: string;
  resume: string;
};

export async function appendToGoogleSheet(data: ApplicationData) {
  const payload = {
    ...data,
    sheetName: 'Verbigo_Careers' // Add sheetName to direct the data
  };

  try {
    // We use keepalive: true so the request continues even if the user navigates away
    await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Required header for Apps Script
      },
      body: JSON.stringify(payload),
      mode: 'no-cors', // Use no-cors for a "fire-and-forget" request
      keepalive: true,
    });
    
    console.log('Successfully attempted to send application data to Google Sheet in the background.');

  } catch (error) {
    console.error('Client-side error during fetch to Google Sheet:', error);
  }
}

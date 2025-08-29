'use client';

// Replace this with your actual Google Apps Script URL for the Verbigo_Careers sheet
const WEB_APP_URL = "https://script.google.com/macros/s/YOUR_CAREERS_SCRIPT_ID/exec"; 

type ApplicationData = {
  name: string;
  email: string;
  age: number;
  language: string;
  education: string;
  resume: string;
};

export async function appendToGoogleSheet(data: ApplicationData) {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('age', String(data.age));
  formData.append('language', data.language);
  formData.append('education', data.education);
  formData.append('resume', data.resume);

  try {
    // We use keepalive: true so the request continues even if the user navigates away
    await fetch(WEB_APP_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors', // Use no-cors for a "fire-and-forget" request
      keepalive: true,
    });
    
    console.log('Successfully attempted to send application data to Google Sheet in the background.');

  } catch (error) {
    console.error('Client-side error during fetch to Google Sheet:', error);
  }
}

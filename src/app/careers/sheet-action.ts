'use client';

// This URL will post to your Google Sheet
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbz0MJB0hM_v7WMak51iG_CUYAPlb0UJ5axg0VMrhX4H0UwKVKsR3CTaZI6I1wz33SRjnA/exec"; 

type ApplicationData = {
  name: string;
  email: string;
  age: number;
  language: string;
  education: string;
  resume: string;
};

export async function appendToGoogleSheet(data: ApplicationData) {
  const { resume, ...restOfData } = data;
  const payload = {
    ...restOfData,
    resume_url: resume
  };

  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Required for Apps Script to parse JSON correctly
      },
      body: JSON.stringify(payload),
    });
    
    if (response.ok) {
        console.log('Successfully attempted to send application data to Google Sheet in the background.');
    } else {
        const errorText = await response.text();
        console.error('Failed to send data to Google Sheet:', response.status, errorText);
    }

  } catch (error) {
    console.error('Client-side error during fetch to Google Sheet:', error);
  }
}


'use server';

// This URL will post to your Google Sheet for careers
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
    resume_url: resume, // The sheet expects 'resume_url'
  };

  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', 
      },
      body: JSON.stringify(payload),
      // Caching is not needed for this POST request
      cache: 'no-store',
    });
    
    if (response.ok) {
        console.log('Successfully sent application data to Google Sheet from the server.');
    } else {
        const errorText = await response.text();
        console.error('Failed to send data to Google Sheet:', response.status, errorText);
        // Throw an error to be caught by the server action
        throw new Error(`Google Sheet API Error: ${errorText}`);
    }

  } catch (error) {
    console.error('Error in appendToGoogleSheet:', error);
    // Re-throw the error so the server action knows something went wrong
    throw error;
  }
}


'use server';

// This URL will post to your Google Sheet for contact form submissions
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycby5t9aPz1gO2j2VpT4Q4T9c8G7f6E5d4C3b2A1Z0/exec"; 

type ContactFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
};

export async function appendContactToGoogleSheet(data: ContactFormData) {
  const { phoneNumber, ...restOfData } = data;
  const payload = {
    ...restOfData,
    contact: phoneNumber, 
  };

  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', 
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });
    
    if (response.ok) {
        console.log('Successfully sent contact data to Google Sheet from the server.');
    } else {
        const errorText = await response.text();
        console.error('Failed to send contact data to Google Sheet:', response.status, errorText);
        throw new Error(`Google Sheet API Error: ${errorText}`);
    }

  } catch (error) {
    console.error('Error in appendContactToGoogleSheet:', error);
    throw error;
  }
}

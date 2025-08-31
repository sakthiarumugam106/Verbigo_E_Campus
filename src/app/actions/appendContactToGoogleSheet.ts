'use server';

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycby5t9aPz1gO2j2VpT4Q4T9c8G7f6E5d4C3b2A1Z0/exec";

type ContactFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
};

export async function appendContactToGoogleSheet(data: ContactFormData) {
  const { phoneNumber, ...restOfData } = data;
  const payload = { ...restOfData, contact: phoneNumber };

  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (response.ok) {
      const result = await response.json();
      if (result.status === 'success') {
         return { success: true, id: result.id };
      }
       return { success: false, error: result.message || 'An unknown error occurred.' };
    } else {
      const errorText = await response.text();
      console.error('Google Sheet API Error:', errorText);
      return { success: false, error: `Google Sheet API Error: ${errorText}` };
    }
  } catch (error: any) {
    console.error('Error in appendContactToGoogleSheet:', error);
    return { success: false, error: error.message };
  }
}

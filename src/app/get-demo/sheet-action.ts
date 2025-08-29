'use server';

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxRofdOnZAsNKHtDVC3XgJnjJiSeGtBwPL6Ra4C2AlE9FrhvwzX3xpRBe3vorJyuWKg/exec";

export async function appendToGoogleSheet(data: { name: string; email: string; phoneNumber: string; submittedAt: Date }) {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('contact', data.phoneNumber);
  formData.append('submittedAt', data.submittedAt.toISOString());

  try {
    const response = await fetch(WEB_APP_URL, {
        method: 'POST',
        body: formData,
        cache: 'no-cache',
    });

    if (!response.ok && response.status !== 302) { 
        const errorText = await response.text();
        console.error('Error writing to Google Sheet:', `Status: ${response.status}`, 'Response:', errorText);
        throw new Error(`Could not write to Google Sheet. Status: ${response.status}`);
    }
    
    // In case of a redirect, we can consider it a success but can't read the body.
    if(response.status === 302) {
      console.log('Successfully wrote to Google Sheet (via redirect).');
      return;
    }

    const responseText = await response.text();
    console.log('Google Sheet response:', responseText);


  } catch (error) {
    console.error('Error during fetch to Google Sheet:', error);
    if (error instanceof Error) {
        throw new Error(`Could not write to Google Sheet: ${error.message}`);
    }
    throw new Error('An unknown error occurred while writing to Google Sheet.');
  }
}

'use server';

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxRofdOnZAsNKHtDVC3XgJnjJiSeGtBwPL6Ra4C2AlE9FrhvwzX3xpRBe3vorJyuWKg/exec";

export async function appendToGoogleSheet(data: { name: string; email: string; contact: string; }) {
  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      cache: 'no-cache',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error writing to Google Sheet:', `Status: ${response.status}`, 'Response:', errorText);
      throw new Error(`Could not write to Google Sheet. Status: ${response.status}`);
    }

    const responseText = await response.json();
    console.log('Google Sheet response:', responseText);

    if (responseText.result !== 'success') {
       throw new Error(`Google Sheet API reported an error: ${responseText.message}`);
    }

  } catch (error) {
    console.error('Error during fetch to Google Sheet:', error);
    if (error instanceof Error) {
        throw new Error(`Could not write to Google Sheet: ${error.message}`);
    }
    throw new Error('An unknown error occurred while writing to Google Sheet.');
  }
}

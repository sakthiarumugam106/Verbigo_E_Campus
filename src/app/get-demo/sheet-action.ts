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
        method: "POST",
        body: formData,
    });

    if (response.status !== 200 && response.status !== 302) { // 302 is a redirect on success
        const errorText = await response.text();
        console.error('Error writing to Google Sheet:', `Status: ${response.status}`, 'Response:', errorText);
        throw new Error(`Could not write to Google Sheet. Status: ${response.status}`);
    }

  } catch (error) {
    console.error('Error writing to Google Sheet:', error);
    // Re-throwing the error to be caught by the calling function
    throw new Error('Could not write to Google Sheet.');
  }
}

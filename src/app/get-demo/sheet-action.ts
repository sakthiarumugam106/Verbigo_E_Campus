'use server';

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxRofdOnZAsNKHtDVC3XgJnjJiSeGtBwPL6Ra4C2AlE9FrhvwzX3xpRBe3vorJyuWKg/exec";

export async function appendToGoogleSheet(data: { name: string; email: string; phoneNumber: string; submittedAt: Date }) {
  try {
    const response = await fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            contact: data.phoneNumber,
            submittedAt: data.submittedAt.toISOString()
        }),
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Error writing to Google Sheet:', errorData);
        throw new Error(`Could not write to Google Sheet. Status: ${response.status}`);
    }

  } catch (error) {
    console.error('Error writing to Google Sheet:', error);
    // Re-throwing the error to be caught by the calling function
    throw new Error('Could not write to Google Sheet.');
  }
}

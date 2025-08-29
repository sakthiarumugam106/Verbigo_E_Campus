'use server';

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxRofdOnZAsNKHtDVC3XgJnjJiSeGtBwPL6Ra4C2AlE9FrhvwzX3xpRBe3vorJyuWKg/exec";

export async function appendToGoogleSheet(data: { name: string; email: string; phoneNumber: string; submittedAt: Date }) {
  try {
    const response = await fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            contact: data.phoneNumber
        }),
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        let errorDetails = `Status: ${response.status}`;
        try {
            const errorData = await response.json();
            errorDetails += `, Response: ${JSON.stringify(errorData)}`;
        } catch (e) {
            // response might not be json
            errorDetails += `, Body: ${await response.text()}`;
        }
        console.error('Error writing to Google Sheet:', errorDetails);
        throw new Error(`Could not write to Google Sheet. ${errorDetails}`);
    }

  } catch (error) {
    console.error('Error writing to Google Sheet:', error);
    // Re-throwing the error to be caught by the calling function
    throw new Error('Could not write to Google Sheet.');
  }
}

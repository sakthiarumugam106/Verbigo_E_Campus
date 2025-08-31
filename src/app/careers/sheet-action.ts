'use server';

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbztmUYt4_YyE0ZbAu-_uDLQW6jvMLMy6UKfOtU5D-hLpdNCK1mtVGy-f97q2a4h_qEi/exec";

type FormData = {
  name: string;
  email: string;
  age: string;
  language: string;
  education: string;
  resumeUrl: string;
};

export async function appendToGoogleSheet(data: FormData) {
  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      cache: 'no-store',
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        return { success: true, message: result.message, id: result.id };
      }
      return { success: false, error: result.error || "Unknown error" };
    } else {
      const errorText = await response.text();
      console.error("Google Sheet API Error:", errorText);
      return { success: false, error: `Google Sheet API Error: ${errorText}` };
    }
  } catch (error: any) {
    console.error("Error in appendToGoogleSheet:", error);
    return { success: false, error: error.message };
  }
}

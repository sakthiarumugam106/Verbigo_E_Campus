'use server';

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbzs942Zf1lwHmdIFOdc07dPRSvahKLv2NKIosImOtLMt7jdgLfbZm7NoWKNnQpf0m4/exec";

type ContactFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
};

export async function appendContactToGoogleSheet(data: ContactFormData) {
  // rename phoneNumber → contact
  const payload = {
    name: data.name,
    email: data.email,
    contact: data.phoneNumber,
    message: data.message,
  };

  try {
    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Sheet API Error:", errorText);
      return { success: false, error: `Google Sheet API Error: ${errorText}` };
    }

    const result = await response.json();
    if (result.success) {
      return { success: true, message: result.message || "Data saved", id: result.id };
    } else {
      return { success: false, error: result.error || "Unknown error" };
    }
  } catch (error: any) {
    console.error("Error in appendContactToGoogleSheet:", error);
    return { success: false, error: error.message };
  }
}

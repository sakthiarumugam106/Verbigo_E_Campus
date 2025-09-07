
'use server';

import { siteConfig } from '@/lib/config';
import { z } from 'zod';

const WEB_APP_URL = siteConfig.googleSheetUrls.contact;

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phoneNumber: z.string()
    .min(10, 'Phone number must be at least 10 characters.')
    .regex(/^\+?\d{1,4}[ -]?\d{4,}$/, 'Please enter a valid phone number with country code.'),
  message: z.string().min(10, 'Message must be at least 10 characters long.'),
});


type ContactFormData = z.infer<typeof contactSchema>;

export async function appendContactToGoogleSheet(data: ContactFormData) {
  const validatedFields = contactSchema.safeParse(data);

  if (!validatedFields.success) {
    return { 
      success: false, 
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const payloadPhoneNumber = validatedFields.data.phoneNumber.startsWith('+') 
      ? validatedFields.data.phoneNumber.substring(1) 
      : validatedFields.data.phoneNumber;

  // rename phoneNumber → contact
  const payload = {
    name: validatedFields.data.name,
    email: validatedFields.data.email,
    contact: payloadPhoneNumber,
    message: validatedFields.data.message,
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

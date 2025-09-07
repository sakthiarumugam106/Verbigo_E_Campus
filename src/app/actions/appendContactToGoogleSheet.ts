
'use server';

import { siteConfig } from '@/lib/config';
import { z } from 'zod';

const WEB_APP_URL = siteConfig.googleSheetUrls.contact;

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phoneNumber: z.string()
    .regex(/^\+\d{1,3}\s\d{4,}$/, 'Phone number must be in the format: +[code] [number].'),
  message: z.string().min(10, 'Message must be at least 10 characters long.'),
}).refine(data => {
    if (data.phoneNumber.startsWith('+91')) {
        const numberPart = data.phoneNumber.split(' ')[1] || '';
        return numberPart.length === 10;
    }
    return true;
}, {
    message: 'For India (+91), the phone number must be 10 digits.',
    path: ['phoneNumber'],
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

  // rename phoneNumber → contact
  const payload = {
    name: validatedFields.data.name,
    email: validatedFields.data.email,
    contact: validatedFields.data.phoneNumber,
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

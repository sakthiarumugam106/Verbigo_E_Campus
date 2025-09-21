
'use server';

import { siteConfig } from '@/lib/config';
import { z } from 'zod';
import { Resend } from 'resend';
import ContactFormAdminEmail from '@/emails/contact-form-admin-email';
import ContactFormUserEmail from '@/emails/contact-form-user-email';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phoneNumber: z.string()
    .min(10, 'Phone number must be at least 10 characters.')
    .regex(/^\d+ \d+$/, 'Please enter a valid phone number with country code.'),
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
  
  const { name, email, phoneNumber, message } = validatedFields.data;
  
  // The phone number is already formatted as "<code> <number>"
  const payloadPhoneNumber = phoneNumber;

  // rename phoneNumber → contact
  const payload = {
    name,
    email,
    contact: payloadPhoneNumber,
    message,
  };

  let sheetSuccess = false;
  try {
    const response = await fetch(siteConfig.googleSheetUrls.contact, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (response.ok) {
      sheetSuccess = true;
    } else {
      const errorText = await response.text();
      console.error("Google Sheet API Error:", errorText);
    }
  } catch (error: any) {
    console.error("Error in appendContactToGoogleSheet:", error);
  }

  // Send email notifications
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromAddress = 'Verbigo <onboarding@resend.dev>';

    // Admin notification
    try {
      await resend.emails.send({
        from: fromAddress,
        to: siteConfig.email,
        subject: `New Contact Form Submission from ${name}`,
        react: ContactFormAdminEmail({ name, email, phoneNumber, message, sheetSuccess }),
      });
    } catch (adminEmailError) {
      console.error("Resend API Error (Admin):", adminEmailError);
    }

    // User confirmation
    try {
      await resend.emails.send({
        from: fromAddress,
        // This will only work if the domain is verified. For testing, you can change `email` to `siteConfig.email`.
        to: email,
        subject: "We've Received Your Message!",
        react: ContactFormUserEmail({ name }),
      });
    } catch (userEmailError) {
       console.error("Resend API Error (User):", userEmailError);
    }
  }

  return { success: true, message: "Your message has been sent successfully!" };
}

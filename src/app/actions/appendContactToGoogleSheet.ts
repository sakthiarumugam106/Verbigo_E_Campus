
'use server';

import { siteConfig } from '@/lib/config';
import { z } from 'zod';
import { Resend } from 'resend';
import ContactFormEmail from '@/emails/contact-form-email';

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

  try {
    const response = await fetch(siteConfig.googleSheetUrls.contact, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Sheet API Error:", errorText);
      // We can still try to send the email even if sheet fails
    }
  } catch (error: any) {
    console.error("Error in appendContactToGoogleSheet:", error);
    // We can still try to send the email even if sheet fails
  }

  // Send email notification
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Verbigo Contact <hello@verbigo.in>',
        to: siteConfig.email,
        subject: `New Contact Form Submission from ${name}`,
        react: ContactFormEmail({ name, email, phoneNumber, message }),
      });
    } catch (emailError: any) {
      console.error("Resend API Error:", emailError);
      // Don't block the user response for this
    }
  }

  return { success: true, message: "Your message has been sent successfully!" };
}

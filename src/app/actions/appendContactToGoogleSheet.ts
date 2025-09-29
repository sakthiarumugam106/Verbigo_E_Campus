
'use server';

import { siteConfig } from '@/lib/config';
import { z } from 'zod';
import { Resend } from 'resend';
import ContactFormAdminEmail from '@/emails/contact-form-admin-email';
import ContactFormUserEmail from '@/emails/contact-form-user-email';
import { sendEmail } from '@/lib/email-service';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters.'),
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
  
  // Phone number for emails (with +)
  const emailPhoneNumber = `+${phoneNumber}`;
  // Phone number for Google Sheet (without +)
  const sheetPhoneNumber = phoneNumber;


  // The payload for Google Sheets.
  const payload = {
    name,
    email,
    contact: sheetPhoneNumber,
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

  // --- Email Sending Logic ---

  // 1. Send confirmation email to user via Nodemailer/Gmail
  await sendEmail({
    to: email,
    subject: "We've Received Your Message!",
    react: ContactFormUserEmail({ name }),
  });

  // 2. Send notification email to admin via Resend (as a reliable fallback)
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
      await resend.emails.send({
        from: 'Verbigo <onboarding@resend.dev>',
        to: siteConfig.email,
        subject: `New Contact Form Submission from ${name}`,
        react: ContactFormAdminEmail({ name, email, phoneNumber: emailPhoneNumber, message, sheetSuccess }),
      });
    } catch (adminEmailError) {
      console.error("Resend API Error (Admin):", adminEmailError);
    }
  }


  return { success: true, message: "Your message has been sent successfully!" };
}

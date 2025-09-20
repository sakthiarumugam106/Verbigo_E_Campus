
'use server';

import { Resend } from 'resend';
import TutorRequestEmail from '@/emails/tutor-request-email';
import TutorConfirmationEmail from '@/emails/tutor-confirmation-email';
import { z } from 'zod';
import { siteConfig } from '@/lib/config';


const tutorRequestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  whatsapp: z.string(),
  state: z.string(),
  language: z.string(),
  schedule: z.string(),
});

type TutorRequestData = z.infer<typeof tutorRequestSchema>;

export async function sendTutorRequestEmail(data: TutorRequestData) {
  const validatedFields = tutorRequestSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Resend API Key is not set. Email not sent.');
    // Fail silently on the server but log the error. The primary action (WhatsApp) still works.
    return { success: true, message: 'Primary action complete.' };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, whatsapp, state, language, schedule } = validatedFields.data;

  try {
    // Attempt to send notification to admin
    try {
        await resend.emails.send({
            from: 'Verbigo Tutor Request <hello@verbigo.in>',
            to: siteConfig.email,
            subject: 'New Tutor Request from Verbigo Website',
            react: TutorRequestEmail({
                name,
                email,
                whatsapp,
                state,
                language,
                schedule,
            }),
        });
    } catch (adminEmailError) {
        console.error('Resend API Error (Admin):', adminEmailError);
        // Do not block the entire process if admin email fails
    }

    // Attempt to send confirmation to user
    try {
        await resend.emails.send({
            from: 'Verbigo <hello@verbigo.in>',
            // IMPORTANT: For development with an unverified domain, we are sending this to the admin's email.
            // For production, change this back to the dynamic 'email' variable from the form
            // after you have verified your domain in Resend.
            to: siteConfig.email, 
            subject: 'Thanks for Choosing Verbigo!',
            react: TutorConfirmationEmail({ name }),
        });
    } catch (userEmailError) {
        console.error('Resend API Error (User):', userEmailError);
        // Do not block the entire process if user email fails
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error in sendTutorRequestEmail function:', error);
    // This will catch any other unexpected errors in the function
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

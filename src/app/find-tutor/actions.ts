
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
    // Send notification to admin
    const adminEmailPromise = resend.emails.send({
      from: 'Verbigo Tutor Request <onboarding@resend.dev>',
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

    // Send confirmation to user
    const userEmailPromise = resend.emails.send({
        from: 'Verbigo <onboarding@resend.dev>',
        // Temporarily send to admin email for testing due to Resend limitations.
        // TODO: Change back to `email` variable after domain is verified.
        to: siteConfig.email,
        subject: 'Thanks for Choosing Verbigo!',
        react: TutorConfirmationEmail({ name }),
    });
    
    const [adminResult, userResult] = await Promise.allSettled([adminEmailPromise, userEmailPromise]);

    if (adminResult.status === 'rejected') {
        console.error('Resend API Error (Admin):', adminResult.reason);
        // Don't block success for this, but log it. It might be a non-critical failure.
    }
     if (userResult.status === 'rejected') {
        console.error('Resend API Error (User):', userResult.reason);
        // Don't block success for user email failure, but log it
    }


    return { success: true };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

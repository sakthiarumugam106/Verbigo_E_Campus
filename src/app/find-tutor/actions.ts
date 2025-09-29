
'use server';

import { Resend } from 'resend';
import TutorRequestEmail from '@/emails/tutor-request-email';
import TutorConfirmationEmail from '@/emails/tutor-confirmation-email';
import { z } from 'zod';
import { siteConfig } from '@/lib/config';
import { sendEmail } from '@/lib/email-service';


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

  const { name, email, whatsapp, state, language, schedule } = validatedFields.data;

  // 1. Send confirmation email to user via Nodemailer/Gmail
  await sendEmail({
    to: email,
    subject: 'Thanks for Choosing Verbigo!',
    react: TutorConfirmationEmail({ name }),
  });

  // 2. Send notification to admin via Resend (as a reliable fallback)
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        await resend.emails.send({
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
    } catch (adminEmailError) {
        console.error('Resend API Error (Admin):', adminEmailError);
        // Do not block the entire process if admin email fails
    }
  }

  return { success: true };
}

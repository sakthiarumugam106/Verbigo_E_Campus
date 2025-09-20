
'use server';

import { Resend } from 'resend';
import TutorRequestEmail from '@/emails/tutor-request-email';
import { z } from 'zod';
import { siteConfig } from '@/lib/config';

const resend = new Resend(process.env.RESEND_API_KEY);

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

  try {
    const { data, error } = await resend.emails.send({
      from: 'Verbigo <onboarding@resend.dev>',
      to: [siteConfig.email],
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

    if (error) {
      console.error('Resend API Error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

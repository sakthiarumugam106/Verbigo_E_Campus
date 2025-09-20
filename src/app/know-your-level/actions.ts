
'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import { siteConfig } from '@/lib/config';
import { LevelAssessmentOutput } from '@/ai/flows/level-assessment-flow';
import AssessmentReportAdminEmail from '@/emails/assessment-report-admin-email';
import AssessmentReportUserEmail from '@/emails/assessment-report-user-email';

const UserDetailsSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

const ReportSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  score: z.number(),
  summary: z.string(),
  skillBreakdown: z.array(z.object({
    skill: z.string(),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  })),
});

const sendReportSchema = z.object({
  report: ReportSchema,
  userDetails: UserDetailsSchema,
});

type SendReportData = z.infer<typeof sendReportSchema>;

export async function sendAssessmentReport(data: SendReportData): Promise<{ success: boolean; error?: string }> {
  const validatedFields = sendReportSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid data provided.',
    };
  }
  
  if (!process.env.RESEND_API_KEY) {
    console.error('Resend API Key is not set. Emails not sent.');
    return { success: false, error: 'Email service is not configured.' };
  }

  const { report, userDetails } = validatedFields.data;
  const resend = new Resend(process.env.RESEND_API_KEY);

  // NOTE: The 'from' address must be from a domain you have verified in Resend (e.g., 'hello@verbigo.in')
  // to successfully send emails to users. Using 'onboarding@resend.dev' is for development only.
  const fromAddress = 'Verbigo <onboarding@resend.dev>';

  try {
    // Attempt to send email to the admin
    const adminEmailPromise = resend.emails.send({
      from: fromAddress,
      to: siteConfig.email,
      subject: `New English Assessment Report for ${userDetails.name}`,
      react: AssessmentReportAdminEmail({ report, userDetails }),
    });

    // Attempt to send email to the user
    // IMPORTANT: This will FAIL until you verify your domain with Resend and use a 'from' address
    // from that domain. On the free/dev plan, Resend only allows sending TO verified emails.
    const userEmailPromise = resend.emails.send({
      from: fromAddress,
      to: userDetails.email, 
      subject: 'Your Verbigo English Assessment Report',
      react: AssessmentReportUserEmail({ report, name: userDetails.name }),
    });

    const [adminResult, userResult] = await Promise.allSettled([adminEmailPromise, userEmailPromise]);

    if (adminResult.status === 'rejected') {
        console.error("Failed to send admin email:", adminResult.reason);
    }
    if (userResult.status === 'rejected') {
        console.error("Failed to send user email (This is expected until domain is verified):", userResult.reason);
    }
    
    // We consider it a success if the admin email is sent, as the user email is expected to fail without domain verification.
    if (adminResult.status === 'fulfilled') {
      return { success: true };
    } else {
      return { success: false, error: 'Failed to send admin notification email.' };
    }

  } catch (error: any) {
    console.error('Error in sendAssessmentReport function:', error);
    return { success: false, error: 'An unexpected error occurred while sending emails.' };
  }
}

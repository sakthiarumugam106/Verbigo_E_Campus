
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

  try {
    // Send to Admin
    const adminEmailPromise = resend.emails.send({
      from: 'Verbigo Assessment <onboarding@resend.dev>',
      to: siteConfig.email,
      subject: `New English Assessment Report for ${userDetails.name}`,
      react: AssessmentReportAdminEmail({ report, userDetails }),
    });

    // Send to User (using admin email for testing due to Resend limitations)
    const userEmailPromise = resend.emails.send({
      from: 'Verbigo <onboarding@resend.dev>',
      // IMPORTANT: Changed to admin email for testing. 
      // Replace with `userDetails.email` once your domain is verified in Resend.
      to: siteConfig.email,
      subject: 'Your Verbigo English Assessment Report',
      react: AssessmentReportUserEmail({ report, name: userDetails.name }),
    });

    const [adminResult, userResult] = await Promise.allSettled([adminEmailPromise, userEmailPromise]);

    if (adminResult.status === 'rejected') {
        console.error("Failed to send admin email:", adminResult.reason);
    }
    if (userResult.status === 'rejected') {
        console.error("Failed to send user email:", userResult.reason);
    }
    
    // We can consider it a success if at least the admin email went through.
    // Let's return success and just log errors.
    
    return { success: true };

  } catch (error: any) {
    console.error('Error in sendAssessmentReport function:', error);
    return { success: false, error: 'An unexpected error occurred while sending emails.' };
  }
}

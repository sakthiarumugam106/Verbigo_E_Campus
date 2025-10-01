
'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import { siteConfig } from '@/lib/config';
import { LevelAssessmentOutput } from '@/ai/flows/level-assessment-flow';
import AssessmentReportAdminEmail from '@/emails/assessment-report-admin-email';
import AssessmentReportUserEmail from '@/emails/assessment-report-user-email';
import { sendEmail } from '@/lib/email-service';

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

  const { report, userDetails } = validatedFields.data;
  let userEmailSuccess = false;

  // 1. Send report to user via Nodemailer/Gmail
  try {
    const userEmailResult = await sendEmail({
        to: userDetails.email,
        subject: 'Your Verbigo English Assessment Report',
        react: AssessmentReportUserEmail({ report, name: userDetails.name }),
    });
    if (userEmailResult.success) {
        userEmailSuccess = true;
    }
  } catch(e) {
      console.error("Nodemailer API Error (User):", e);
  }


  // 2. Send notification to admin via Resend
  if (process.env.RESEND_API_KEY) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: 'Verbigo <onboarding@resend.dev>',
            to: siteConfig.email,
            subject: `New English Assessment Report for ${userDetails.name}`,
            react: AssessmentReportAdminEmail({ report, userDetails }),
        });
    } catch (adminEmailError) {
        console.error('Failed to send admin email via Resend:', adminEmailError);
    }
  }

  return { success: true };
}

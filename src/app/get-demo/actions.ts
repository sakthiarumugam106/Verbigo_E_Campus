
'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { appendToGoogleSheet } from './sheet-action';
import { Resend } from 'resend';
import { siteConfig } from '@/lib/config';
import type DemoRequestEmail from '@/emails/demo-request-email';
import { sendEmail } from '@/lib/email-service';
import ContactFormUserEmail from '@/emails/contact-form-user-email';

const demoRequestSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number.' }),
});

type DemoRequestData = z.infer<typeof demoRequestSchema>;

// Helper function to isolate the email sending logic and the react-email import
async function sendNotificationEmail(data: { name: string; email: string; phoneNumber: string; }) {
  // Send to admin via Resend
  if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const DemoRequestEmail = (await import('@/emails/demo-request-email')).default;
        
        await resend.emails.send({
          from: 'Verbigo Demo Request <onboarding@resend.dev>',
          to: siteConfig.email,
          subject: `New Demo Request from ${data.name}`,
          react: DemoRequestEmail({ name: data.name, email: data.email, phoneNumber: data.phoneNumber }),
        });
      } catch (adminEmailError: any) {
        console.error("Resend API Error:", adminEmailError);
      }
  }

  // Send to user via Nodemailer
  try {
      await sendEmail({
        to: data.email,
        subject: "We've Received Your Demo Request!",
        react: ContactFormUserEmail({ name: data.name }),
      });
  } catch (userEmailError) {
      console.error("Nodemailer API Error (User):", userEmailError);
  }
}

async function handlePostSubmissionTasks(data: DemoRequestData) {
    const { name, email, phoneNumber } = data;
    const submissionTime = new Date();
    
    // Phone number for emails (with +)
    const emailPhoneNumber = phoneNumber;
    // Phone number for Google Sheet (without +)
    const sheetPhoneNumber = phoneNumber.replace(/\D/g, '');

    try {
        await Promise.all([
            addDoc(collection(db, 'demo-requests'), {
                name,
                email,
                phoneNumber: emailPhoneNumber, // Store with + in Firestore
                submittedAt: submissionTime,
            }),
            appendToGoogleSheet({
                name,
                email,
                contact: sheetPhoneNumber, // Send without + to Google Sheet
            }),
            sendNotificationEmail({
                name,
                email,
                phoneNumber: emailPhoneNumber, // Send with + in email
            }),
        ]);
        console.log('All post-submission tasks completed successfully.');
    } catch (error) {
        console.error('Error during post-submission tasks:', error);
    }
}


export async function submitDemoRequest(
  data: DemoRequestData
): Promise<{ success: boolean; message: string; }> {
  try {
    const validatedFields = demoRequestSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        message: 'Invalid fields. Please check your submission.',
        success: false,
      };
    }
    
    // Start background tasks but don't wait for them
    handlePostSubmissionTasks(validatedFields.data);

    // Return success to the user immediately
    return { 
      success: true, 
      message: 'Your demo request has been submitted successfully!',
    };
  } catch (error) {
    console.error('Error processing demo request: ', error);
    // Return a generic error to the user
    return { 
      success: false, 
      message: 'An unexpected error occurred while saving your request. Please try again.' 
    };
  }
}

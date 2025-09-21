
'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { appendToGoogleSheet } from './sheet-action';
import { Resend } from 'resend';
import { siteConfig } from '@/lib/config';
import type DemoRequestEmail from '@/emails/demo-request-email';

const demoRequestSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number.' })
    .regex(/^\+\d+ \d+$/, 'Invalid phone number format. Expected "+<code> <number>".'),
});

type DemoRequestData = z.infer<typeof demoRequestSchema>;

export type DemoFormState = {
  message: string;
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    phoneNumber?: string[];
  };
};

// Helper function to isolate the email sending logic and the react-email import
async function sendNotificationEmail(data: DemoRequestData) {
  if (!process.env.RESEND_API_KEY) {
    console.error("Resend API Key is not set. Email not sent.");
    // Fail silently on the server but log the error.
    return { success: true, message: "Primary action complete, but email could not be sent." };
  }
  
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Dynamically import the email component only when needed
    const DemoRequestEmail = (await import('@/emails/demo-request-email')).default;
    
    await resend.emails.send({
      from: 'Verbigo Demo Request <onboarding@resend.dev>',
      to: siteConfig.email,
      subject: `New Demo Request from ${data.name}`,
      react: DemoRequestEmail({ name: data.name, email: data.email, phoneNumber: data.phoneNumber }),
    });
    return { success: true };
  } catch (emailError: any) {
    console.error("Resend API Error:", emailError);
    // Return an error but don't crash the main flow
    return { success: false, error: emailError.message };
  }
}


export async function submitDemoRequest(
  prevState: DemoFormState,
  formData: FormData
): Promise<DemoFormState> {
  try {
    const rawFormData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
    };

    const validatedFields = demoRequestSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Invalid fields. Please check your submission.',
        success: false,
      };
    }

    const { name, email, phoneNumber } = validatedFields.data;
    const submissionTime = new Date();

    // Run all operations in parallel
    const [firestoreResult, sheetResult, emailResult] = await Promise.all([
      addDoc(collection(db, 'demo-requests'), {
        name,
        email,
        phoneNumber,
        submittedAt: submissionTime,
      }),
      appendToGoogleSheet({
        name,
        email,
        contact: phoneNumber,
      }),
      sendNotificationEmail(validatedFields.data),
    ]);

    // Optional: Check results if needed, though for now we assume success if no errors are thrown
    // For example, if email fails, we might not want to block the user.
    if (!emailResult.success) {
        // Log the email error but still return success to the user
        console.error("Email notification failed to send, but other operations succeeded.");
    }

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

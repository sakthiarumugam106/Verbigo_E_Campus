
'use server';

import { z } from 'zod';
import { appendToGoogleSheet } from './sheet-action';
import { Resend } from 'resend';
import { siteConfig } from '@/lib/config';
import CareerApplicationEmail from '@/emails/career-application-email';


const applicationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  age: z.coerce.number().int().positive({ message: 'Please enter a valid age.' }),
  language: z.string().min(2, { message: 'Please specify a language.' }),
  education: z.string().min(1, { message: 'Please select your education level.' }),
  resume: z.string().url({ message: 'A valid resume URL is required.' }),
  resumeOption: z.string(), // No validation needed, just for logic
});

export type ApplicationFormState = {
  message: string;
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    age?: string[];
    language?: string[];
    education?: string[];
    resume?: string[];
  };
};

export async function submitApplication(
  prevState: ApplicationFormState,
  formData: FormData
): Promise<ApplicationFormState> {
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    age: formData.get('age'),
    language: formData.get('language'),
    education: formData.get('education'),
    resume: formData.get('resume'),
    resumeOption: formData.get('resumeOption'),
  };

  const validatedFields = applicationSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Please check your submission.',
      success: false,
    };
  }
  
  const applicationData = validatedFields.data;

  try {
    // Now we call the sheet action from the server
    await appendToGoogleSheet({
      name: applicationData.name,
      email: applicationData.email,
      age: applicationData.age.toString(),
      language: applicationData.language,
      education: applicationData.education,
      resumeUrl: applicationData.resume,
    });

    // Send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Verbigo Careers <onboarding@resend.dev>',
          to: siteConfig.email,
          subject: `New Application from ${applicationData.name} for Language Tutor`,
          react: CareerApplicationEmail(applicationData),
        });
      } catch (emailError) {
        console.error('Error sending application email:', emailError);
      }
    }


    return { 
      success: true, 
      message: 'Your application has been submitted successfully!',
    };
  } catch (error) {
    console.error('Error submitting application:', error);
    return {
      success: false,
      message: 'An unexpected error occurred while submitting your application. Please try again.',
    }
  }
}

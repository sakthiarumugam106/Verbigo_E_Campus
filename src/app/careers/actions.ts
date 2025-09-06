
'use server';

import { z } from 'zod';
import { appendToGoogleSheet } from './sheet-action';

const applicationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  age: z.coerce.number().int().positive({ message: 'Please enter a valid age.' }),
  language: z.string().min(2, { message: 'Please specify a language.' }),
  education: z.string().min(1, { message: 'Please select your education level.' }),
  resume: z.string().url({ message: 'A valid resume URL is required.' }),
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
  };

  const validatedFields = applicationSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Please check your submission.',
      success: false,
    };
  }

  try {
    // Now we call the sheet action from the server
    await appendToGoogleSheet({
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      age: validatedFields.data.age.toString(),
      language: validatedFields.data.language,
      education: validatedFields.data.education,
      resumeUrl: validatedFields.data.resume,
    });
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

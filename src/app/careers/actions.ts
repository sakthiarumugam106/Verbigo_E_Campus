'use server';

import { z } from 'zod';

const applicationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  age: z.coerce.number().int().positive({ message: 'Please enter a valid age.' }),
  language: z.string().min(2, { message: 'Please specify a language.' }),
  education: z.string().min(10, { message: 'Please describe your education.' }),
  resume: z.string().url({ message: 'Please provide a valid URL for your resume.' }),
});

export type ApplicationFormState = {
  message: string;
  success: boolean;
  submittedData?: z.infer<typeof applicationSchema>;
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

  // Defer Google Sheet submission to the client for faster UI response
  return { 
    success: true, 
    message: 'Your application has been submitted successfully!',
    submittedData: validatedFields.data,
  };
}

'use server';

import { z } from 'zod';
import { appendContactToGoogleSheet } from './sheet-actions/contact-sheet-action';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name is required.' }),
  email: z.string().email({ message: 'A valid email is required.' }),
  phoneNumber: z.string().min(10, { message: 'A valid phone number is required.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type ContactFormState = {
  message: string;
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    phoneNumber?: string[];
    message?: string[];
  };
};

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your input.',
      success: false,
    };
  }

  try {
    await appendContactToGoogleSheet(validatedFields.data);
    return { message: 'Thank you for your message! We will get back to you soon.', success: true };
  } catch (e) {
    console.error('Error submitting contact form:', e);
    return { message: 'An unexpected error occurred. Please try again.', success: false };
  }
}

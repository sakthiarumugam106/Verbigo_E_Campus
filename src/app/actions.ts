'use server';

import { z } from 'zod';
// This file is no longer the primary action handler for the contact form, 
// but we'll keep the schema and type definitions for potential future use
// or validation within other server components. The main logic has been
// moved to /app/actions/appendContactToGoogleSheet.ts as per the new implementation.

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

// The submitContactForm function is no longer used by the new ContactForm component.
// It is kept here to avoid breaking any other potential dependencies, but the
// primary submission logic now resides in the component itself, which calls
// appendContactToGoogleSheet directly.
export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  
  return {
      message: 'This action is deprecated. Please use the new form submission handler.',
      success: false,
  };
}

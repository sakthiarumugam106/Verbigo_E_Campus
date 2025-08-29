'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { appendToGoogleSheet } from './sheet-action';

const demoRequestSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number.' }),
});

export type DemoFormState = {
  message: string;
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    phoneNumber?: string[];
  };
};


export async function submitDemoRequest(
  prevState: DemoFormState,
  formData: FormData
): Promise<DemoFormState> {
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

  try {
    // Save to Firestore (as a backup)
    await addDoc(collection(db, 'demo-requests'), {
      name,
      email,
      phoneNumber,
      submittedAt: submissionTime,
    });

    // Save to Google Sheets via Web App
    await appendToGoogleSheet({ name, email, phoneNumber, submittedAt: submissionTime });
    

    return { success: true, message: 'Your demo request has been submitted successfully!' };
  } catch (error) {
    console.error('Error processing demo request: ', error);
    return { success: false, message: 'Something went wrong on our end. Please try again.' };
  }
}

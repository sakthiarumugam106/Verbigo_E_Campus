'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { google } from 'googleapis';

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

async function appendToGoogleSheet(data: { name: string; email: string; phoneNumber: string; submittedAt: Date }) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'Sheet1!A:D'; // Adjust sheet name and range as needed

    const values = [[data.name, data.email, data.phoneNumber, data.submittedAt.toISOString()]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
  } catch (error) {
    console.error('Error writing to Google Sheet:', error);
    // Silently fail for the user, but log the error for developers.
    // You might want to add more robust error handling here.
  }
}

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

    // Save to Google Sheets
    if (process.env.GOOGLE_SHEETS_CLIENT_EMAIL && process.env.GOOGLE_SHEETS_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
       await appendToGoogleSheet({ name, email, phoneNumber, submittedAt: submissionTime });
    } else {
        console.warn('Google Sheets environment variables are not set. Skipping sheet update.');
    }

    return { success: true, message: 'Your demo request has been submitted successfully!' };
  } catch (error) {
    console.error('Error processing demo request: ', error);
    return { success: false, message: 'Something went wrong on our end. Please try again.' };
  }
}

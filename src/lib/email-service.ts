
'use server';

import nodemailer from 'nodemailer';
import { siteConfig } from './config';
import { render } from '@react-email/components';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  react: React.ReactElement;
}

export async function sendEmail(options: EmailOptions) {
  if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
    console.warn(
      'Gmail credentials are not set. Skipping email sending. Please set GMAIL_EMAIL and GMAIL_APP_PASSWORD in your .env file.'
    );
    // Fallback to Resend for admin notifications if Gmail is not configured.
    // This part is handled within each action file.
    return { success: false, error: 'Gmail service not configured.' };
  }

  try {
    const html = render(options.react);
    const mailOptions = {
      from: `Verbigo <${process.env.GMAIL_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${options.to}`);
    return { success: true };
  } catch (error: any) {
    console.error(`Failed to send email to ${options.to}:`, error);
    return { success: false, error: error.message };
  }
}

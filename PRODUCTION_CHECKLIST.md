# Production Readiness Checklist for Verbigo

This document outlines the key configurations and hard-coded values that should be reviewed and updated before deploying the Verbigo application to a production environment.

---

## 1. Environment Variables (`.env`)

Ensure you have a `.env.local` file for your production-specific keys. Never commit this file to version control.

-   **`RESEND_API_KEY`**:
    -   **File**: `.env` or `.env.local`
    -   **Action**: Set your production Resend API key to enable sending emails for contact forms, demo requests, and assessment reports.
    -   **Note**: For user-facing emails to work correctly (like confirmation emails), you must verify your domain with Resend.

-   **`GEMINI_API_KEY`**:
    -   **File**: `.env` or `.env.local`
    -   **Action**: Set your Google AI (Gemini) API key. This is crucial for all AI-powered features, including the chatbot and level assessment. Ensure your key has the necessary permissions and billing is enabled to avoid rate-limiting issues.

---

## 2. General Site Configuration (`src/lib/config.ts`)

This file contains several critical site-wide settings.

-   **Admin Email Address**:
    -   **File**: `src/lib/config.ts`
    -   **Current Value**: `sakthiarumugam106@gmail.com`
    -   **Action**: Change `siteConfig.email` to your official production email address. This is where all administrative notifications (new contacts, demo requests, etc.) will be sent.

-   **Google Sheet URLs**:
    -   **File**: `src/lib/config.ts`
    -   **Action**: The URLs in `siteConfig.googleSheetUrls` for `contact`, `demo`, and `careers` currently point to development spreadsheets. You should create new Google Sheets for your production data and replace these URLs with the new ones from your Google Apps Scripts.

-   **WhatsApp Number**:
    -   **File**: `src/lib/config.ts`
    -   **Current Value**: `7708071872`
    -   **Action**: Update `siteConfig.whatsappNumber` to your official business WhatsApp number.

---

## 3. Firebase Configuration (`src/lib/firebase.ts`)

The application is connected to a specific Firebase project for features like resume uploads.

-   **Firebase Project Config**:
    -   **File**: `src/lib/firebase.ts`
    -   **Action**: The `firebaseConfig` object is tied to a development project. For production, it is highly recommended to set up a new, separate Firebase project. Once created, replace the existing `firebaseConfig` object with the one from your new production project's settings.
    -   **Security**: Ensure your Firebase Storage security rules are properly configured for production to prevent unauthorized access.

---

## 4. Email Configurations

Review the email sending logic to ensure emails are sent to users correctly.

-   **Tutor Request Confirmation Email**:
    -   **File**: `src/app/find-tutor/actions.ts`
    -   **Action**: In the `sendTutorRequestEmail` function, the user confirmation email is hard-coded to send to the admin's email for development purposes (`to: siteConfig.email`). To send emails to the actual user, change this to `to: email`.
    -   **Note**: This will only work if your domain is verified in Resend.

---

## 5. Resend Verified Domain

-   **Service**: [Resend](https://resend.com/)
-   **Action**: To send emails *from* your domain (e.g., `hello@verbigo.in`) and *to* any user email address, you must add and verify your domain in your Resend account.
-   **Impact**: Without a verified domain, emails can only be sent from `onboarding@resend.dev` and only to the email address you verified with your account (likely your admin email). This means user confirmation emails will fail in production until your domain is verified.

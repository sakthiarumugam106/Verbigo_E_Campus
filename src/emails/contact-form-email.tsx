
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

// This component is being replaced by more specific templates:
// - contact-form-admin-email.tsx
// - contact-form-user-email.tsx
// This file can be considered deprecated and is no longer in use.

interface ContactFormEmailProps {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const ContactFormEmail = ({
  name,
  email,
  phoneNumber,
  message,
}: ContactFormEmailProps) => (
  <Html>
    <Head />
    <Preview>New Contact Form Submission from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Contact Inquiry</Heading>
        <Text style={paragraph}>You have received a new message from the Verbigo contact form.</Text>
        <Hr style={hr} />
        <Section>
          <Text style={label}>Name:</Text>
          <Text style={value}>{name}</Text>

          <Text style={label}>Email:</Text>
          <Text style={value}>{email}</Text>

          <Text style={label}>Phone Number:</Text>
          <Text style={value}>{phoneNumber}</Text>
          
          <Text style={label}>Message:</Text>
          <Text style={messageValue}>{message}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>This email was sent from the Verbigo website contact form.</Text>
      </Container>
    </Body>
  </Html>
);

export default ContactFormEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #f0f0f0',
  borderRadius: '4px',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '48px',
  textAlign: 'center' as const,
  color: '#333',
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center' as const,
    color: '#555',
    padding: '0 40px',
};

const label = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    margin: '20px 0 5px 40px',
};

const value = {
    fontSize: '16px',
    color: '#555',
    margin: '0 0 20px 40px',
};

const messageValue = {
    fontSize: '16px',
    color: '#555',
    margin: '0 40px 20px 40px',
    whiteSpace: 'pre-wrap' as const,
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
};

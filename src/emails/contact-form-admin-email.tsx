
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Column,
  Row,
  Link,
  Img,
} from '@react-email/components';
import * as React from 'react';
import { siteConfig } from '@/lib/config';

interface ContactFormAdminEmailProps {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  sheetSuccess: boolean;
}

const ContactFormAdminEmail = ({
  name,
  email,
  phoneNumber,
  message,
  sheetSuccess,
}: ContactFormAdminEmailProps) => (
  <Html>
    <Head>
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f6f8;
          }
        `}
      </style>
    </Head>
    <Preview>New Contact Inquiry from {name}</Preview>
    <Body style={main}>
      <Container style={emailContainer}>
        <Section style={header}>
          <Heading as="h1" style={headerH1}>📬 New Contact Form Submission</Heading>
          <Text style={headerP}>You have a new form submission from your website.</Text>
        </Section>
        <Section style={bodyContent}>
          <Heading as="h2" style={bodyH2}>User Details</Heading>
          <Text>Hello Admin,</Text>
          <Text>The following user has submitted their details via the contact form:</Text>
          <Section style={userDetails}>
            <Text style={detailItem}><strong>Name:</strong> {name}</Text>
            <Text style={detailItem}><strong>Email:</strong> {email}</Text>
            <Text style={detailItem}><strong>Phone:</strong> {phoneNumber}</Text>
            <Text style={detailItem}><strong>Message:</strong><br />{message}</Text>
            <Text style={detailItem}>
              <strong>Saved to Google Sheet:</strong>
              <span style={{ color: sheetSuccess ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
                {sheetSuccess ? ' ✔ Yes' : ' ✖ No'}
              </span>
            </Text>
          </Section>
        </Section>
        <Section style={footer}>
          <Text>Contact Us:</Text>
          <Text>📞 {siteConfig.whatsappNumber} | ✉️ {siteConfig.email}</Text>
          <Section style={socialIcons}>
            <Link href={siteConfig.socials.linkedin}>
              <Img src={siteConfig.assets.linkedinIcon} alt="LinkedIn" style={socialIconImg} />
            </Link>
            <Link href={siteConfig.socials.twitter}>
              <Img src={siteConfig.assets.twitterIcon} alt="Twitter" style={socialIconImg} />
            </Link>
            <Link href={siteConfig.socials.instagram}>
              <Img src={siteConfig.assets.instagramIcon} alt="Instagram" style={socialIconImg} />
            </Link>
          </Section>
          <Text>&copy; {new Date().getFullYear()} Verbigo. All rights reserved.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactFormAdminEmail;

const main = {
  margin: 0,
  padding: 0,
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f4f6f8',
};

const emailContainer = {
  maxWidth: '600px',
  margin: 'auto',
  backgroundColor: 'white',
  borderRadius: '10px',
  overflow: 'hidden' as const,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
};

const header = {
  background: 'linear-gradient(135deg, #2A3C9F, #4700FF)',
  padding: '25px',
  textAlign: 'center' as const,
  color: 'white',
};

const headerH1 = {
  margin: 0,
  fontSize: '28px',
};

const headerP = {
  margin: '5px 0 0',
  fontSize: '16px',
  opacity: 0.9,
};

const bodyContent = {
  padding: '20px',
};

const bodyH2 = {
  color: '#2A3C9F',
  fontSize: '22px',
  marginBottom: '10px',
};

const userDetails = {
  background: '#f9f9f9',
  borderRadius: '8px',
  padding: '15px',
  marginTop: '20px',
  borderLeft: '4px solid #2A3C9F',
};

const detailItem = {
  margin: '8px 0',
  fontSize: '16px',
  lineHeight: '1.6',
};

const footer = {
  backgroundColor: '#f4f6f8',
  padding: '15px',
  textAlign: 'center' as const,
  fontSize: '14px',
  color: '#777',
};

const socialIcons = {
  margin: '10px 0',
};

const socialIconImg = {
  width: '24px',
  height: '24px',
  margin: '0 8px',
  display: 'inline-block',
};

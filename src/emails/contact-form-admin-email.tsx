
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

const baseUrl = 'https://firebasestudio-hosting.web.app';

const ContactFormAdminEmail = ({
  name,
  email,
  phoneNumber,
  message,
  sheetSuccess,
}: ContactFormAdminEmailProps) => (
  <Html>
    <Head />
    <Preview>New Contact Inquiry from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={logoText}>Verbigo</Heading>
        </Section>
        <Section style={content}>
          <Heading style={heading}>New Contact Inquiry</Heading>
          
          <Text style={label}>From:</Text>
          <Text style={value}>{name} &lt;{email}&gt;</Text>

          <Text style={label}>Phone Number:</Text>
          <Text style={value}>{phoneNumber}</Text>
          
          <Text style={label}>Message:</Text>
          <Text style={messageValue}>{message}</Text>
          
          <Hr style={hr} />

          <Section style={statusSection}>
            <Row>
              <Column>
                <Text style={statusText}>Data saved to Google Sheet:</Text>
              </Column>
              <Column style={{ width: '60px' }}>
                <Text style={sheetSuccess ? statusSuccess : statusFailure}>
                  {sheetSuccess ? '✔ Yes' : '✖ No'}
                </Text>
              </Column>
            </Row>
          </Section>
        </Section>
        <Section style={footer}>
          <Row>
            <Column style={{ width: '64px' }}>
               <Img src={`${baseUrl}/logo-white.png`} width="40" height="40" alt="Verbigo" />
            </Column>
            <Column>
              <Text style={footer.heading}>Verbigo E-Campus</Text>
              <Text style={footer.text}>{siteConfig.address}</Text>
            </Column>
          </Row>
          <Row style={{ paddingTop: '10px' }}>
            <Column>
              <Link href={`mailto:${siteConfig.email}`} style={footer.link}>
                <Img src={`${baseUrl}/email-icon.png`} width="16" height="16" alt="Email" style={{ display: 'inline-block', marginRight: '5px' }}/>
                {siteConfig.email}
              </Link>
              <span style={footer.separator}>|</span>
              <Link href={`https://wa.me/${siteConfig.whatsappNumber}`} style={footer.link}>
                 <Img src={`${baseUrl}/phone-icon.png`} width="16" height="16" alt="Phone" style={{ display: 'inline-block', marginRight: '5px' }}/>
                +{siteConfig.whatsappNumber}
              </Link>
            </Column>
          </Row>
          <Row style={{ paddingTop: '10px' }}>
            <Column>
               <Link href={siteConfig.socials.linkedin} style={{...footer.link, ...footer.social}}>
                <Img src={`${baseUrl}/linkedin-icon.png`} width="20" height="20" alt="LinkedIn" />
              </Link>
               <Link href={siteConfig.socials.instagram} style={{...footer.link, ...footer.social}}>
                <Img src={`${baseUrl}/instagram-icon.png`} width="20" height="20" alt="Instagram" />
              </Link>
               <Link href={siteConfig.socials.twitter} style={{...footer.link, ...footer.social}}>
                <Img src={`${baseUrl}/twitter-icon.png`} width="20" height="20" alt="Twitter" />
              </Link>
            </Column>
          </Row>
          <Text style={footer.copyright}>© {new Date().getFullYear()} Verbigo. All Rights Reserved.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactFormAdminEmail;

const main = {
  backgroundColor: '#f0f5ff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: '20px 0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  width: '100%',
  maxWidth: '600px',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  overflow: 'hidden',
};

const header = {
  backgroundColor: '#2e378c',
  padding: '20px',
  textAlign: 'center' as const,
};

const logoText = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: 0,
};

const content = { padding: '30px 40px' };

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center' as const,
  marginBottom: '30px',
};

const label = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#555',
  margin: '0 0 5px',
};

const value = {
  fontSize: '16px',
  color: '#333',
  margin: '0 0 20px',
};

const messageValue = {
    ...value,
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
    border: '1px solid #eee',
    whiteSpace: 'pre-wrap' as const,
};

const hr = { borderColor: '#e6ebf1', margin: '30px 0' };

const statusSection = {
  padding: '10px 20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '5px',
};

const statusText = {
  margin: 0,
  fontSize: '14px',
  color: '#555',
};

const statusSuccess = {
  margin: 0,
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#28a745',
};

const statusFailure = {
  margin: 0,
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#dc3545',
};

const footer = {
  backgroundColor: '#0a192f',
  color: '#a8b2d1',
  padding: '25px',
  textAlign: 'left' as const,
  heading: {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 0 5px',
  },
  text: {
    color: '#a8b2d1',
    fontSize: '12px',
    margin: '0',
    lineHeight: '1.5',
  },
  link: {
    color: '#a8b2d1',
    textDecoration: 'none',
    fontSize: '12px',
    display: 'inline-flex',
    alignItems: 'center',
  },
  separator: {
    color: '#a8b2d1',
    margin: '0 10px',
  },
  social: {
    display: 'inline-block',
    margin: '0 5px',
  },
  copyright: {
    color: '#8892b0',
    fontSize: '10px',
    textAlign: 'center' as const,
    paddingTop: '15px',
    borderTop: '1px solid #1a2c4e',
    marginTop: '15px',
  },
};

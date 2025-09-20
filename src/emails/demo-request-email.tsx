
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
  Link,
  Column,
  Row,
  Img,
} from '@react-email/components';
import * as React from 'react';
import { siteConfig } from '@/lib/config';

interface DemoRequestEmailProps {
  name: string;
  email: string;
  phoneNumber: string;
}

const baseUrl = 'https://firebasestudio-hosting.web.app';

const DemoRequestEmail = ({
  name,
  email,
  phoneNumber,
}: DemoRequestEmailProps) => (
  <Html>
    <Head />
    <Preview>New Demo Request from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={logoText}>Verbigo</Heading>
        </Section>
        <Section style={content}>
            <Heading style={heading}>New Demo Request</Heading>
            <Text style={paragraph}>You have received a new demo request from the Verbigo website.</Text>
            <Hr style={hr} />
            <Section>
            <Text style={label}>Name:</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>Email:</Text>
            <Text style={value}>{email}</Text>

            <Text style={label}>Phone Number:</Text>
            <Text style={value}>{phoneNumber}</Text>
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

export default DemoRequestEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  marginBottom: '64px',
  border: '1px solid #f0f0f0',
  borderRadius: '4px',
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
  margin: '0 auto',
};

const content = { padding: '20px 40px 48px' };

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
    margin: '20px 0 5px 0',
};

const value = {
    fontSize: '16px',
    color: '#555',
    margin: '0 0 20px 0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
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

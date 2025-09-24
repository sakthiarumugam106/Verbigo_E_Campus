
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Button,
  Img,
} from '@react-email/components';
import * as React from 'react';
import { siteConfig } from '@/lib/config';

interface ContactFormUserEmailProps {
  name: string;
}

const ContactFormUserEmail = ({ name }: ContactFormUserEmailProps) => (
  <Html>
    <Head />
    <Preview>Thanks for reaching out, {name}!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading as="h1" style={headerH1}>🎉 Thank You!</Heading>
          <Text style={headerP}>We appreciate you reaching out to us</Text>
        </Section>
        <Section style={content}>
          <Heading as="h2" style={contentH2}>Hello {name},</Heading>
          <Text style={paragraph}>
            Thank you for your message. We have received your inquiry and our team will get back to you shortly.
          </Text>
          <Text style={paragraph}>
            Your interest means a lot to us, and we are excited to connect with you soon!
          </Text>
          <Text style={paragraph}>
            Meanwhile, feel free to explore our website and social media for updates and insights.
          </Text>
          <Button href="https://verbigo.in" style={button}>Visit Our Website</Button>
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

export default ContactFormUserEmail;

const main = {
  margin: 0,
  padding: 0,
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f4f6f8',
};

const container = {
  maxWidth: '600px',
  margin: 'auto',
  backgroundColor: 'white',
  borderRadius: '10px',
  overflow: 'hidden' as const,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
};

const header = {
  background: 'linear-gradient(135deg, #0047AB, #4700FF)',
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

const content = {
  padding: '30px',
};

const contentH2 = {
  color: '#0047AB',
  fontSize: '22px',
  marginBottom: '10px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#3c4858',
};

const button = {
  display: 'inline-block',
  background: '#0047AB',
  color: 'white',
  padding: '12px 25px',
  borderRadius: '50px',
  textDecoration: 'none',
  fontWeight: 'bold' as const,
  marginTop: '20px',
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

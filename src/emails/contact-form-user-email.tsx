
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
          <Heading style={logoText}>Verbigo</Heading>
        </Section>
        <Section style={content}>
          <Heading style={heading}>Thank You For Your Message!</Heading>
          
          <Text style={paragraph}>
            Hi {name},
          </Text>
          
          <Text style={paragraph}>
            We've successfully received your inquiry. Thank you for your interest in Verbigo! Our team is reviewing your message, and we will get back to you as soon as possible.
          </Text>

          <Hr style={hr} />

          <Section style={tipSection}>
            <Heading as="h3" style={tipHeading}>Quick Grammar Tip</Heading>
            <Text style={tipText}>
              <strong>Affect vs. Effect:</strong> Use 'affect' as a verb (to influence something) and 'effect' as a noun (the result of a change).
            </Text>
            <Text style={tipExample}>
              <em>Example: The weather will **affect** our plans. The change had a positive **effect**.</em>
            </Text>
          </Section>
        </Section>
        
        <Section style={footer.container}>
          <Text style={footer.contactTitle}>Contact Us:</Text>
          <table width="100%" border={0} cellSpacing="0" cellPadding="0" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <tr>
              <td align="center">
                <Link href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, '')}`} style={footer.link}>
                  <Img src={siteConfig.assets.phoneIcon} width="18" height="18" alt="Phone" style={footer.icon} />
                  <span style={footer.linkText}>+{siteConfig.whatsappNumber}</span>
                </Link>
                <span style={footer.separator}>|</span>
                <Link href={`mailto:${siteConfig.email}`} style={footer.link}>
                  <Img src={siteConfig.assets.emailIcon} width="18" height="18" alt="Email" style={footer.icon} />
                  <span style={footer.linkText}>{siteConfig.email}</span>
                </Link>
              </td>
            </tr>
          </table>
          
          <table width="100%" border={0} cellSpacing="0" cellPadding="0" style={{ paddingTop: '10px' }}>
            <tr>
              <td align="center">
                <Link href={siteConfig.socials.linkedin} style={footer.social}>
                  <Img src={siteConfig.assets.linkedinIcon} width="28" height="28" alt="LinkedIn" />
                </Link>
                <Link href={siteConfig.socials.twitter} style={footer.social}>
                  <Img src={siteConfig.assets.twitterIcon} width="28" height="28" alt="Twitter" />
                </Link>
                <Link href={siteConfig.socials.instagram} style={footer.social}>
                  <Img src={siteConfig.assets.instagramIcon} width="28" height="28" alt="Instagram" />
                </Link>
              </td>
            </tr>
          </table>
          <Text style={footer.copyright}>© {new Date().getFullYear()} Verbigo. All Rights Reserved.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactFormUserEmail;

const main = {
  backgroundColor: '#EBF2FA', // Light blue background
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: '20px 0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  width: '100%',
  maxWidth: '600px',
  border: '1px solid #d9e6f6',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
};

const header = {
  backgroundColor: '#2e378c', // Verbigo Primary Blue
  padding: '24px',
  textAlign: 'center' as const,
  backgroundImage: "url('https://firebasestudio-hosting.web.app/subtle-pattern.svg')",
  backgroundRepeat: 'repeat',
  backgroundPosition: 'center',
};

const logoText = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 auto',
  fontFamily: "'Poppins', sans-serif",
};

const content = { padding: '30px 40px' };

const heading = {
  fontSize: '26px',
  fontWeight: 'bold',
  color: '#0047AB',
  textAlign: 'center' as const,
  marginBottom: '20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#3c4858',
};

const hr = {
  borderColor: '#d9e6f6',
  margin: '30px 0',
};

const tipSection = {
  backgroundColor: '#f0f5ff',
  borderRadius: '8px',
  padding: '20px',
  borderLeft: '4px solid #4700FF', // Verbigo Accent
};

const tipHeading = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#0047AB',
  margin: '0 0 10px',
};

const tipText = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#3c4858',
  margin: '0 0 8px',
};

const tipExample = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#5a697e',
  margin: 0,
};

const footer = {
  container: {
    backgroundColor: '#f4f6f8',
    color: '#555',
    padding: '20px 40px',
    textAlign: 'center' as const,
  },
  contactTitle: {
    color: '#555',
    fontSize: '14px',
    margin: '0 0 10px',
  },
  link: {
    color: '#555',
    textDecoration: 'none',
    fontSize: '14px',
    display: 'inline-flex',
    alignItems: 'center',
  },
  linkText: {
    verticalAlign: 'middle',
  },
  icon: {
    display: 'inline-block',
    marginRight: '8px',
    verticalAlign: 'middle',
  },
  separator: {
    display: 'inline-block',
    margin: '0 10px',
    color: '#ccc',
    verticalAlign: 'middle',
  },
  social: {
    display: 'inline-block',
    margin: '0 8px',
  },
  copyright: {
    color: '#777',
    fontSize: '12px',
    textAlign: 'center' as const,
    paddingTop: '15px',
    marginTop: '15px',
  },
};

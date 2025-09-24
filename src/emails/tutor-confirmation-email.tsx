
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
  Img,
  Link,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';
import { siteConfig } from '@/lib/config';

interface TutorConfirmationEmailProps {
  name: string;
}

const TutorConfirmationEmail = ({
  name,
}: TutorConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>We've received your request!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
           <Heading style={logoText}>Verbigo</Heading>
        </Section>
        <Section style={content}>
          <Heading style={heading}>Thank You for Choosing Verbigo, {name}!</Heading>
          
          <Text style={paragraph}>
            We've successfully received your request to find a tutor. Our team is now looking for the perfect match for your learning needs.
          </Text>
          
          <Text style={paragraph}>
            One of our language experts will reach out to you via WhatsApp shortly to discuss the next steps.
          </Text>

          <Text style={paragraph}>
            We're excited to be a part of your language learning journey!
          </Text>
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

export default TutorConfirmationEmail;


const main = {
  backgroundColor: '#f0f5ff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
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
  padding: '24px',
  textAlign: 'center' as const,
  backgroundImage: `url('https://firebasestudio-hosting.web.app/subtle-pattern.svg')`,
  backgroundRepeat: 'repeat',
  backgroundPosition: 'center',
};

const logoText = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 auto',
  fontFamily: 'Poppins, sans-serif',
};

const content = {
  padding: '30px 40px',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center' as const,
  marginBottom: '30px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#555',
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

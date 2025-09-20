
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
          <Row>
            <Column>
              <Img src={`${siteConfig.assets.baseUrl}${siteConfig.assets.logoWhite}`} width="40" height="40" alt="Verbigo" />
            </Column>
            <Column style={{ paddingLeft: '15px' }}>
              <Text style={footer.heading}>Verbigo E-Campus</Text>
              <Text style={footer.text}>{siteConfig.address}</Text>
            </Column>
          </Row>
          <Row style={{ paddingTop: '15px' }}>
            <Column>
              <Link href={`mailto:${siteConfig.email}`} style={footer.link}>
                <Img src={`${siteConfig.assets.baseUrl}${siteConfig.assets.emailIcon}`} width="16" height="16" alt="Email" style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }}/>
                <span style={{verticalAlign: 'middle'}}>{siteConfig.email}</span>
              </Link>
            </Column>
            <Column>
              <Link href={`https://wa.me/${siteConfig.whatsappNumber}`} style={footer.link}>
                 <Img src={`${siteConfig.assets.baseUrl}${siteConfig.assets.phoneIcon}`} width="16" height="16" alt="Phone" style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }}/>
                <span style={{verticalAlign: 'middle'}}>+{siteConfig.whatsappNumber}</span>
              </Link>
            </Column>
          </Row>
          <Row style={{ paddingTop: '15px' }}>
            <Column>
               <Link href={siteConfig.socials.linkedin} style={{...footer.link, ...footer.social}}>
                <Img src={`${siteConfig.assets.baseUrl}${siteConfig.assets.linkedinIcon}`} width="24" height="24" alt="LinkedIn" />
              </Link>
               <Link href={siteConfig.socials.instagram} style={{...footer.link, ...footer.social}}>
                <Img src={`${siteConfig.assets.baseUrl}${siteConfig.assets.instagramIcon}`} width="24" height="24" alt="Instagram" />
              </Link>
               <Link href={siteConfig.socials.twitter} style={{...footer.link, ...footer.social}}>
                <Img src={`${siteConfig.assets.baseUrl}${siteConfig.assets.twitterIcon}`} width="24" height="24" alt="Twitter" />
              </Link>
            </Column>
          </Row>
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
  backgroundColor: '#0047AB', // Verbigo Primary Blue
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
    backgroundColor: '#0a192f',
    color: '#a8b2d1',
    padding: '25px 40px',
    textAlign: 'left' as const,
  },
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
  },
  social: {
    display: 'inline-block',
    marginRight: '10px',
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

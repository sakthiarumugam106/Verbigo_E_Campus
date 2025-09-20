
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
} from '@react-email/components';
import * as React from 'react';

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
          
          <Text style={footerText}>
            Explore more on our website or visit our social channels.
          </Text>
        </Section>
        
        <Section style={footer}>
          <Row>
            <Column align="center">
              <Link href="https://verbigo.in/about-us" style={footerLink}>About Us</Link> | 
              <Link href="https://verbigo.in/#courses" style={footerLink}>Courses</Link> | 
              <Link href="https://verbigo.in/blog" style={footerLink}>Blog</Link>
            </Column>
          </Row>
          <Text style={copyright}>© {new Date().getFullYear()} Verbigo. All Rights Reserved.</Text>
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

const footerText = {
  ...paragraph,
  textAlign: 'center' as const,
  fontSize: '14px',
  color: '#8492a6',
  marginTop: '30px',
  marginBottom: '20px',
};

const footer = {
  backgroundColor: '#f0f5ff',
  padding: '20px 40px',
};

const footerLink = {
  color: '#0047AB',
  textDecoration: 'none',
  fontSize: '14px',
  margin: '0 8px',
};

const copyright = {
  fontSize: '12px',
  color: '#8492a6',
  textAlign: 'center' as const,
  marginTop: '16px',
};

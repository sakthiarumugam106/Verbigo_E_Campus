
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
} from '@react-email/components';
import * as React from 'react';

interface TutorConfirmationEmailProps {
  name: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://firebasestudio-hosting.web.app';

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

          <Hr style={hr} />

          <Text style={footer}>
            You received this email because you submitted a request on the Verbigo website.
          </Text>
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
  padding: '20px',
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

const hr = {
  borderColor: '#e6ebf1',
  margin: '30px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
};

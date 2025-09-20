
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface TutorRequestEmailProps {
  name: string;
  email: string;
  whatsapp: string;
  state: string;
  language: string;
  schedule: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://firebasestudio-hosting.web.app';


const TutorRequestEmail = ({
  name,
  email,
  whatsapp,
  state,
  language,
  schedule,
}: TutorRequestEmailProps) => (
  <Html>
    <Head />
    <Preview>New Tutor Request from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
            <Img
                src={`${baseUrl}/logo-for-email.png`}
                width="200"
                height="42"
                alt="Verbigo"
                style={logo}
            />
        </Section>
        <Section style={content}>
          <Heading style={heading}>New Tutor Request</Heading>
          
          <Text style={label}>Name:</Text>
          <Text style={value}>{name}</Text>

          <Text style={label}>Email:</Text>
          <Text style={value}>{email}</Text>

          <Text style={label}>WhatsApp Number:</Text>
          <Text style={value}>{whatsapp}</Text>
          
          <Text style={label}>State:</Text>
          <Text style={value}>{state}</Text>

          <Text style={label}>Native Language:</Text>
          <Text style={value}>{language}</Text>

          <Text style={label}>Schedule Preference:</Text>
          <Text style={value}>{schedule}</Text>

          <Hr style={hr} />

          <Text style={footer}>
            This email was sent from the "Find Your Tutor" form on the Verbigo website.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default TutorRequestEmail;

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
  backgroundImage: `url('${baseUrl}/subtle-pattern.svg')`,
  backgroundRepeat: 'repeat',
  backgroundPosition: 'center',
};

const logo = {
    margin: '0 auto',
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

const label = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#555',
    margin: '0',
};

const value = {
    fontSize: '16px',
    color: '#333',
    marginTop: '4px',
    marginBottom: '20px',
    lineHeight: '24px',
    borderLeft: '3px solid #2e378c',
    paddingLeft: '12px'
};


const hr = {
  borderColor: '#e6ebf1',
  margin: '30px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};

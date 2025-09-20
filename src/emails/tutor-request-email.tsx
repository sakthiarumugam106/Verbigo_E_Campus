
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
        <Heading style={heading}>New Tutor Request</Heading>
        <Text style={paragraph}>You have received a new tutor request from the Verbigo website.</Text>
        <Hr style={hr} />
        <Section>
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
        </Section>
        <Hr style={hr} />
        <Text style={footer}>This email was sent from the Verbigo "Find Your Tutor" form.</Text>
      </Container>
    </Body>
  </Html>
);

export default TutorRequestEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #f0f0f0',
  borderRadius: '4px',
};

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
    margin: '20px 0 5px 40px',
};

const value = {
    fontSize: '16px',
    color: '#555',
    margin: '0 0 20px 40px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
};


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
} from '@react-email/components';
import * as React from 'react';

interface CareerApplicationEmailProps {
  name: string;
  email: string;
  age: number;
  language: string;
  education: string;
  resume: string;
}

const CareerApplicationEmail = ({
  name,
  email,
  age,
  language,
  education,
  resume,
}: CareerApplicationEmailProps) => (
  <Html>
    <Head />
    <Preview>New Application for Language Tutor from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Career Application</Heading>
        <Text style={paragraph}>A new application for the **Language Tutor** position has been submitted.</Text>
        <Hr style={hr} />
        <Section>
          <Text style={label}>Name:</Text>
          <Text style={value}>{name}</Text>

          <Text style={label}>Email:</Text>
          <Text style={value}>{email}</Text>
          
          <Text style={label}>Age:</Text>
          <Text style={value}>{age}</Text>

          <Text style={label}>Language Specialization:</Text>
          <Text style={value}>{language}</Text>

          <Text style={label}>Highest Education:</Text>
          <Text style={value}>{education}</Text>

          <Text style={label}>Resume:</Text>
          <Link href={resume} style={link}>View Resume</Link>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>This email was sent from the Verbigo careers page.</Text>
      </Container>
    </Body>
  </Html>
);

export default CareerApplicationEmail;

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

const link = {
    fontSize: '16px',
    color: '#007bff',
    margin: '0 0 20px 40px',
    textDecoration: 'underline',
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

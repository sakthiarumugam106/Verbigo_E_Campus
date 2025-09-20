
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

interface Report {
  level: string;
  score: number;
  summary: string;
  skillBreakdown: { skill: string; level: string }[];
}

interface UserDetails {
  name: string;
  phone: string;
  email: string;
}

interface EmailProps {
  report: Report;
  userDetails: UserDetails;
}

const AssessmentReportAdminEmail = ({ report, userDetails }: EmailProps) => (
  <Html>
    <Head />
    <Preview>New Assessment Report for {userDetails.name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={logoText}>Verbigo</Heading>
        </Section>
        <Section style={content}>
          <Heading style={heading}>New Assessment Report</Heading>
          
          <Text style={label}>User Details:</Text>
          <Section style={detailsSection}>
            <Text style={value}><strong>Name:</strong> {userDetails.name}</Text>
            <Text style={value}><strong>Email:</strong> {userDetails.email}</Text>
            <Text style={value}><strong>Phone:</strong> {userDetails.phone}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={label}>Assessment Results:</Text>
          <Section style={reportSection}>
            <Text style={levelText}>Level: <strong>{report.level}</strong> ({report.score}%)</Text>
            <Text style={summaryText}><strong>Summary:</strong> {report.summary}</Text>
            
            <Heading as="h3" style={subHeading}>Skill Breakdown</Heading>
            {report.skillBreakdown.map((skill, index) => (
              <Text key={index} style={skillItem}>- {skill.skill}: <strong>{skill.level}</strong></Text>
            ))}
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            This report was generated from the "Know Your Level" assessment on the Verbigo website.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default AssessmentReportAdminEmail;

const main = {
  backgroundColor: '#f0f5ff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
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
};

const logoText = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 auto',
};

const content = { padding: '30px 40px' };
const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center' as const,
  marginBottom: '30px',
};
const label = { fontSize: '16px', fontWeight: '600', color: '#555', marginBottom: '10px' };
const detailsSection = {
  backgroundColor: '#f9f9f9',
  border: '1px solid #eee',
  borderRadius: '5px',
  padding: '10px 20px',
  marginBottom: '20px',
};
const value = { fontSize: '14px', color: '#333', margin: '8px 0' };
const reportSection = { marginTop: '20px' };
const levelText = { fontSize: '20px', fontWeight: 'bold', color: '#2e378c', textAlign: 'center' as const, marginBottom: '10px' };
const summaryText = { fontSize: '14px', color: '#555', fontStyle: 'italic' as const, marginBottom: '20px' };
const subHeading = { fontSize: '18px', fontWeight: 'bold', color: '#333', marginTop: '20px', marginBottom: '10px' };
const skillItem = { fontSize: '14px', color: '#333', margin: '5px 0 5px 15px' };
const hr = { borderColor: '#e6ebf1', margin: '30px 0' };
const footer = { color: '#8898aa', fontSize: '12px', lineHeight: '16px' };

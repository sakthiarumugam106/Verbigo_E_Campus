
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
  Button
} from '@react-email/components';
import * as React from 'react';

interface Report {
  level: string;
  score: number;
  summary: string;
  skillBreakdown: { skill: string; level: string }[];
}

interface EmailProps {
  report: Report;
  name: string;
}

const AssessmentReportUserEmail = ({ report, name }: EmailProps) => (
  <Html>
    <Head />
    <Preview>Your Verbigo English Assessment Report is here!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={logoText}>Verbigo</Heading>
        </Section>
        <Section style={content}>
          <Heading style={heading}>Here's Your Report, {name}!</Heading>
          <Text style={paragraph}>
            Thank you for completing our English proficiency assessment. Below is a summary of your results. You can use this report to understand your strengths and identify areas for improvement.
          </Text>

          <Section style={reportSection}>
            <Text style={levelText}>Your Assessed Level: <strong>{report.level}</strong></Text>
            <div style={scoreBarContainer}>
                <div style={{ ...scoreBar, width: `${report.score}%` }}></div>
            </div>
            <Text style={scoreText}>{report.score}% Proficiency</Text>
            <Text style={summaryText}><strong>Summary:</strong> {report.summary}</Text>
            
            <Heading as="h3" style={subHeading}>Skill Breakdown</Heading>
            {report.skillBreakdown.map((skill, index) => (
              <Text key={index} style={skillItem}>- {skill.skill}: <strong>{skill.level}</strong></Text>
            ))}
          </Section>

          <Text style={paragraph}>
            Ready to take the next step? Our tutors can help you create a personalized learning plan based on your results.
          </Text>

          <Section style={{ textAlign: 'center', marginTop: '30px' }}>
            <Button style={button} href="https://verbigo.in/#courses">Explore Our Courses</Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            This email was sent from the Verbigo website. If you have any questions, feel free to visit our <Link href="https://verbigo.in/#contact" style={link}>Contact Page</Link>.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default AssessmentReportUserEmail;

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
  marginBottom: '20px',
};
const paragraph = { fontSize: '16px', lineHeight: '26px', color: '#555' };
const reportSection = {
  backgroundColor: '#f9f9f9',
  border: '1px solid #eee',
  borderRadius: '5px',
  padding: '20px',
  margin: '20px 0',
};
const levelText = { fontSize: '20px', fontWeight: 'bold', color: '#2e378c', textAlign: 'center' as const, marginBottom: '15px' };
const summaryText = { fontSize: '14px', color: '#555', fontStyle: 'italic' as const, marginBottom: '20px', paddingTop: '10px', borderTop: '1px solid #eee' };
const subHeading = { fontSize: '18px', fontWeight: 'bold', color: '#333', marginTop: '10px', marginBottom: '10px' };
const skillItem = { fontSize: '14px', color: '#333', margin: '5px 0 5px 15px' };
const button = {
  backgroundColor: '#0047AB',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 25px',
};
const hr = { borderColor: '#e6ebf1', margin: '30px 0' };
const footer = { color: '#8898aa', fontSize: '12px', lineHeight: '16px', textAlign: 'center' as const };
const link = { color: '#0047AB', textDecoration: 'underline' };
const scoreBarContainer = { backgroundColor: '#e0e0e0', borderRadius: '5px', height: '10px', width: '100%', overflow: 'hidden', marginTop: '5px' };
const scoreBar = { backgroundColor: '#4700FF', height: '10px' };
const scoreText = { fontSize: '12px', color: '#555', textAlign: 'center' as const, marginTop: '5px' };

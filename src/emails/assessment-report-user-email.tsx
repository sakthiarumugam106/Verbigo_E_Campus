
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Button,
  Img,
} from '@react-email/components';
import * as React from 'react';
import { siteConfig } from '@/lib/config';

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
            <Heading as="h1" style={headerH1}>📈 Your Report is Ready!</Heading>
            <Text style={headerP}>Here are the results of your assessment</Text>
        </Section>
        <Section style={content}>
          <Heading as="h2" style={contentH2}>Hello {name},</Heading>
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
          <Button href="https://verbigo.in/#courses" style={button}>Explore Our Courses</Button>
        </Section>
        
        <Section style={footer}>
          <Text>Contact Us:</Text>
          <Text>📞 {siteConfig.whatsappNumber} | ✉️ {siteConfig.email}</Text>
          <Section style={socialIcons}>
            <Link href={siteConfig.socials.linkedin}>
              <Img src={siteConfig.assets.linkedinIcon} alt="LinkedIn" style={socialIconImg} />
            </Link>
            <Link href={siteConfig.socials.twitter}>
              <Img src={siteConfig.assets.twitterIcon} alt="Twitter" style={socialIconImg} />
            </Link>
            <Link href={siteConfig.socials.instagram}>
              <Img src={siteConfig.assets.instagramIcon} alt="Instagram" style={socialIconImg} />
            </Link>
          </Section>
          <Text>&copy; {new Date().getFullYear()} Verbigo. All rights reserved.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default AssessmentReportUserEmail;

const main = {
  margin: 0,
  padding: 0,
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f4f6f8',
};

const container = {
  maxWidth: '600px',
  margin: 'auto',
  backgroundColor: 'white',
  borderRadius: '10px',
  overflow: 'hidden' as const,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
};

const header = {
  background: 'linear-gradient(135deg, #0047AB, #4700FF)',
  padding: '25px',
  textAlign: 'center' as const,
  color: 'white',
};

const headerH1 = {
  margin: 0,
  fontSize: '28px',
};

const headerP = {
  margin: '5px 0 0',
  fontSize: '16px',
  opacity: 0.9,
};

const content = {
  padding: '30px',
};

const contentH2 = {
  color: '#0047AB',
  fontSize: '22px',
  marginBottom: '10px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#3c4858',
};

const button = {
  display: 'inline-block',
  background: '#0047AB',
  color: 'white',
  padding: '12px 25px',
  borderRadius: '50px',
  textDecoration: 'none',
  fontWeight: 'bold' as const,
  marginTop: '20px',
};

const footer = {
  backgroundColor: '#f4f6f8',
  padding: '15px',
  textAlign: 'center' as const,
  fontSize: '14px',
  color: '#777',
};

const socialIcons = {
  margin: '10px 0',
};

const socialIconImg = {
  width: '24px',
  height: '24px',
  margin: '0 8px',
  display: 'inline-block',
};

const reportSection = {
  backgroundColor: '#f9f9f9',
  border: '1px solid #eee',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
};

const levelText = { fontSize: '20px', fontWeight: 'bold', color: '#2e378c', textAlign: 'center' as const, marginBottom: '15px' };
const summaryText = { fontSize: '14px', color: '#555', fontStyle: 'italic' as const, marginBottom: '20px', paddingTop: '10px', borderTop: '1px solid #eee' };
const subHeading = { fontSize: '18px', fontWeight: 'bold', color: '#333', marginTop: '10px', marginBottom: '10px' };
const skillItem = { fontSize: '14px', color: '#333', margin: '5px 0 5px 15px' };

const scoreBarContainer = { backgroundColor: '#e0e0e0', borderRadius: '5px', height: '10px', width: '100%', overflow: 'hidden', marginTop: '5px' };
const scoreBar = { backgroundColor: '#4700FF', height: '10px' };
const scoreText = { fontSize: '12px', color: '#555', textAlign: 'center' as const, marginTop: '5px' };

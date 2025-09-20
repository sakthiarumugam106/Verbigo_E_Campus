
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
  Button,
  Row,
  Column,
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

const baseUrl = 'https://firebasestudio-hosting.web.app';

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
        </Section>
         <Section style={footer}>
          <Row>
            <Column style={{ width: '64px' }}>
               <Img src={`${baseUrl}/logo-white.png`} width="40" height="40" alt="Verbigo" />
            </Column>
            <Column>
              <Text style={footer.heading}>Verbigo E-Campus</Text>
              <Text style={footer.text}>{siteConfig.address}</Text>
            </Column>
          </Row>
          <Row style={{ paddingTop: '10px' }}>
            <Column>
              <Link href={`mailto:${siteConfig.email}`} style={footer.link}>
                <Img src={`${baseUrl}/email-icon.png`} width="16" height="16" alt="Email" style={{ display: 'inline-block', marginRight: '5px' }}/>
                {siteConfig.email}
              </Link>
              <span style={footer.separator}>|</span>
              <Link href={`https://wa.me/${siteConfig.whatsappNumber}`} style={footer.link}>
                 <Img src={`${baseUrl}/phone-icon.png`} width="16" height="16" alt="Phone" style={{ display: 'inline-block', marginRight: '5px' }}/>
                +{siteConfig.whatsappNumber}
              </Link>
            </Column>
          </Row>
          <Row style={{ paddingTop: '10px' }}>
            <Column>
               <Link href={siteConfig.socials.linkedin} style={{...footer.link, ...footer.social}}>
                <Img src={`${baseUrl}/linkedin-icon.png`} width="20" height="20" alt="LinkedIn" />
              </Link>
               <Link href={siteConfig.socials.instagram} style={{...footer.link, ...footer.social}}>
                <Img src={`${baseUrl}/instagram-icon.png`} width="20" height="20" alt="Instagram" />
              </Link>
               <Link href={siteConfig.socials.twitter} style={{...footer.link, ...footer.social}}>
                <Img src={`${baseUrl}/twitter-icon.png`} width="20" height="20" alt="Twitter" />
              </Link>
            </Column>
          </Row>
          <Text style={footer.copyright}>© {new Date().getFullYear()} Verbigo. All Rights Reserved.</Text>
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
const scoreBarContainer = { backgroundColor: '#e0e0e0', borderRadius: '5px', height: '10px', width: '100%', overflow: 'hidden', marginTop: '5px' };
const scoreBar = { backgroundColor: '#4700FF', height: '10px' };
const scoreText = { fontSize: '12px', color: '#555', textAlign: 'center' as const, marginTop: '5px' };

const footer = {
  backgroundColor: '#0a192f',
  color: '#a8b2d1',
  padding: '25px',
  textAlign: 'left' as const,
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
    display: 'inline-flex',
    alignItems: 'center',
  },
  separator: {
    color: '#a8b2d1',
    margin: '0 10px',
  },
  social: {
    display: 'inline-block',
    margin: '0 5px',
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

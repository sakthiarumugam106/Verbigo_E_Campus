
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

interface UserDetails {
  name: string;
  phone: string;
  email: string;
}

interface EmailProps {
  report: Report;
  userDetails: UserDetails;
}

const emailStyles = `
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f4f6f8;
  }
`;

const AssessmentReportAdminEmail = ({ report, userDetails }: EmailProps) => (
  <Html>
    <Head>
      <style>{emailStyles}</style>
    </Head>
    <Preview>New Assessment Report for {userDetails.name}</Preview>
    <Body style={main}>
      <Container style={emailContainer}>
        <Section style={header}>
          <Heading as="h1" style={headerH1}>📊 New Assessment Report</Heading>
        </Section>
        <Section style={bodyContent}>
          <Heading as="h2" style={bodyH2}>User & Report Details</Heading>
          <Text>Hello Admin,</Text>
          <Text>The following user has completed the English proficiency assessment:</Text>
          
          <Section style={userDetailsSection}>
            <Text style={detailItem}><strong>Name:</strong> {userDetails.name}</Text>
            <Text style={detailItem}><strong>Email:</strong> {userDetails.email}</Text>
            <Text style={detailItem}><strong>Phone:</strong> {userDetails.phone}</Text>
          </Section>

          <Section style={userDetailsSection}>
            <Text style={detailItem}><strong>Level:</strong> {report.level} ({report.score}%)</Text>
            <Text style={detailItem}><strong>Summary:</strong> {report.summary}</Text>
            <Text style={detailItem}><strong>Skill Breakdown:</strong></Text>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              {report.skillBreakdown.map((skill, index) => (
                <li key={index} style={{ fontSize: '16px', lineHeight: '1.6' }}>{skill.skill}: <strong>{skill.level}</strong></li>
              ))}
            </ul>
          </Section>
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

export default AssessmentReportAdminEmail;

const main = {
  margin: 0,
  padding: 0,
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f4f6f8',
};

const emailContainer = {
  maxWidth: '600px',
  margin: 'auto',
  backgroundColor: 'white',
  borderRadius: '10px',
  overflow: 'hidden' as const,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
};

const header = {
  background: 'linear-gradient(135deg, #2A3C9F, #4700FF)',
  padding: '25px',
  textAlign: 'center' as const,
  color: 'white',
};

const headerH1 = {
  margin: 0,
  fontSize: '28px',
};

const bodyContent = {
  padding: '20px',
};

const bodyH2 = {
  color: '#2A3C9F',
  fontSize: '22px',
  marginBottom: '10px',
};

const userDetailsSection = {
  background: '#f9f9f9',
  borderRadius: '8px',
  padding: '15px',
  marginTop: '20px',
  borderLeft: '4px solid #2A3C9F',
};

const detailItem = {
  margin: '8px 0',
  fontSize: '16px',
  lineHeight: '1.6',
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

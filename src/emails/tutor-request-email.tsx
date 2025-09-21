
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
  Img,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';
import { siteConfig } from '@/lib/config';

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
        <Section style={header}>
          <Heading style={logoText}>Verbigo</Heading>
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

        </Section>
        <Section style={footer.container}>
          <Row>
            <Column>
              <Text style={footer.heading}>Verbigo</Text>
              <Text style={footer.subheading}>E-Campus for Language Intelligence</Text>
            </Column>
          </Row>
          <table width="100%" border={0} cellSpacing="0" cellPadding="0" style={{ paddingTop: '15px' }}>
            <tr>
              <td valign="top" style={{ width: '50%' }}>
                <Link href={`mailto:${siteConfig.email}`} style={footer.link}>
                  <Img src={siteConfig.assets.emailIcon} width="16" height="16" alt="Email" style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }}/>
                  <span style={{verticalAlign: 'middle'}}>{siteConfig.email}</span>
                </Link>
              </td>
              <td valign="top" style={{ width: '50%' }}>
                <Link href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, '')}`} style={footer.link}>
                  <Img src={siteConfig.assets.phoneIcon} width="16" height="16" alt="Phone" style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }}/>
                  <span style={{verticalAlign: 'middle'}}>+{siteConfig.whatsappNumber}</span>
                </Link>
              </td>
            </tr>
          </table>
          
          <table width="100%" border={0} cellSpacing="0" cellPadding="0" style={{ paddingTop: '15px' }}>
            <tr>
              <td>
                <Link href={siteConfig.socials.linkedin} style={{...footer.link, ...footer.social}}>
                  <Img src={siteConfig.assets.linkedinIcon} width="24" height="24" alt="LinkedIn" />
                </Link>
                <Link href={siteConfig.socials.instagram} style={{...footer.link, ...footer.social}}>
                  <Img src={siteConfig.assets.instagramIcon} width="24" height="24" alt="Instagram" />
                </Link>
                <Link href={siteConfig.socials.twitter} style={{...footer.link, ...footer.social}}>
                  <Img src={siteConfig.assets.twitterIcon} width="24" height="24" alt="Twitter" />
                </Link>
              </td>
            </tr>
          </table>
          <Text style={footer.copyright}>© {new Date().getFullYear()} Verbigo. All Rights Reserved.</Text>
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
  padding: '24px',
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

const footer = {
  container: {
    backgroundColor: '#0a192f',
    color: '#a8b2d1',
    padding: '25px 40px',
  },
  heading: {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0',
    padding: '0',
    fontFamily: "'Poppins', sans-serif",
  },
  subheading: {
    color: '#a8b2d1',
    fontSize: '12px',
    margin: '4px 0 0',
    padding: '0',
  },
  link: {
    color: '#a8b2d1',
    textDecoration: 'none',
    fontSize: '12px',
  },
  social: {
    display: 'inline-block',
    marginRight: '10px',
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


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
  Link,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';
import { siteConfig } from '@/lib/config';

interface TutorConfirmationEmailProps {
  name: string;
}

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
        </Section>
        <Section style={footer.container}>
          <Row>
            <Column>
              <Img src={`${siteConfig.assets.baseUrl}${siteConfig.assets.logoWhite}`} width="40" height="40" alt="Verbigo" />
            </Column>
            <Column style={{ paddingLeft: '15px' }}>
              <Text style={footer.heading}>Verbigo E-Campus</Text>
              <Text style={footer.text}>{siteConfig.address}</Text>
            </Column>
          </Row>
          <Row style={{ paddingTop: '15px' }}>
            <Column>
              <Link href={`mailto:${siteConfig.email}`} style={footer.link}>
                <Img src={`${siteConfig.assets.baseUrl}${siteConfig.assets.emailIcon}`} width="16" height="16" alt="Email" style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }}/>
                <span style={{verticalAlign: 'middle'}}>{siteConfig.email}</span>
              </Link>
            </Column>
            <Column>
              <Link href={`https://wa.me/${siteConfig.whatsappNumber}`} style={footer.link}>
                 <Img src={`${siteConfig.assets.baseUrl}${siteConfig.assets.phoneIcon}`} width="16" height="16" alt="Phone" style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }}/>
                <span style={{verticalAlign: 'middle'}}>+{siteConfig.whatsappNumber}</span>
              </Link>
            </Column>
          </Row>
          <Row style={{ paddingTop: '15px' }}>
            <Column>
               <Link href={siteConfig.socials.linkedin} style={{...footer.link, ...footer.social}}>
                <Img src={`${siteConfig.assets.baseUrl}${siteConfig.assets.linkedinIcon}`} width="24" height="24" alt="LinkedIn" />
              </Link>
               <Link href={siteConfig.socials.instagram} style={{...footer.link, ...footer.social}}>
                <Img src={`${siteConfig.assets.baseUrl}${siteConfig.assets.instagramIcon}`} width="24" height="24" alt="Instagram" />
              </Link>
               <Link href={siteConfig.socials.twitter} style={{...footer.link, ...footer.social}}>
                <Img src={`${siteConfig.assets.baseUrl}${siteConfig.assets.twitterIcon}`} width="24" height="24" alt="Twitter" />
              </Link>
            </Column>
          </Row>
          <Text style={footer.copyright}>© {new Date().getFullYear()} Verbigo. All Rights Reserved.</Text>
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
  container: {
    backgroundColor: '#0a192f',
    color: '#a8b2d1',
    padding: '25px 40px',
    textAlign: 'left' as const,
  },
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

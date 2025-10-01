
/**
 * @fileOverview Site-wide configuration and constants.
 *
 * This file centralizes constants like contact information, social media links,
 * and other site-wide settings to make them easily updatable.
 */

const BASE_URL = 'https://verbigo.in';

export const siteConfig = {
  whatsappNumber: '9943834074',
  email: 'verbigo.campus@gmail.com',
  socials: {
    instagram: 'https://www.instagram.com/verbigo.campus?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    twitter: 'https://twitter.com/verbigo_in',
    linkedin: 'https://www.linkedin.com/company/verbigocampus/',
  },
  googleSheetUrls: {
    contact: "https://script.google.com/macros/s/AKfycbw5vb91gl-0e-AgI_A2cG2s1amQJHOUyyZ5EJetkHSyAYxuszof7Pe7MUsHcJ3vgAkZow/exec",
    demo: "https://script.google.com/macros/s/AKfycbxRofdOnZAsNKHtDVC3XgJnjJiSeGtBwPL6Ra4C2AlE9FrhvwzX3xpRBe3vorJyuWKg/exec",
    careers: "https://script.google.com/macros/s/AKfycbzOZMsWTES11iGpKsO8lWAlBi83TUZTuGJA61ZQ4V-SdOBT-NniBfhkreVF5KbSPZLC/exec",
  },
  assets: {
    baseUrl: BASE_URL,
    emailIcon: `${BASE_URL}/icons/new-post.png`,
    phoneIcon: `${BASE_URL}/icons/phone.png`,
    linkedinIcon: `${BASE_URL}/icons/linkedin.png`,
    instagramIcon: `${BASE_URL}/icons/instagram-new.png`,
    twitterIcon: `${BASE_URL}/icons/twitterx.png`,
  }
};

export const whatsapp = {
  demoMessage: "Hello Verbigo, I am interested in your courses and would like to schedule a demo. Please let me know the next steps.",
  courseInfoMessage: "Hello Verbigo, I am interested in your courses and would like to know more. Please let me know the next steps.",
  get whatsappDemoUrl() {
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(this.demoMessage)}`;
  },
   get whatsappCourseInfoUrl() {
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(this.courseInfoMessage)}`;
  },
  getCourseInquiryUrl(courseTitle: string) {
     const message = `Hello Verbigo! I'm interested in the ${courseTitle} course.`;
     return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
  },
  getCourseDemoUrl(courseTitle: string) {
    const message = `Hello Verbigo, I would like to book a demo for the ${courseTitle} course. Please let me know the next steps.`;
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
  },
  getTutorInquiryUrl(details: { name: string, email: string, whatsapp: string, state: string, language: string, schedule: string }) {
     const whatsappPhoneNumber = details.whatsapp.replace(/\D/g, '');
     const message = `
      New Tutor Request!
      -----------------------------
      Name: ${details.name}
      Email: ${details.email}
      WhatsApp: ${whatsappPhoneNumber}
      State: ${details.state}
      Native Language: ${details.language}
      Schedule Preference: ${details.schedule}
      -----------------------------
      Please get back to me soon.
    `;
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message.trim())}`;
  },
  getReportDiscussionUrl(report: { level: string; score: number; summary: string; skillBreakdown: { skill: string; level: string }[] }) {
      const message = `
      Hello! I just completed the English Level Assessment.
      Here is my report:
      -----------------------------
      Level: ${report.level} (${report.score}%)
      Summary: ${report.summary}
      
      Skill Breakdown:
      ${report.skillBreakdown.map(skill => `- ${skill.skill}: ${skill.level}`).join('\n')}
      -----------------------------
      I would like to discuss my results with a tutor.
    `;
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message.trim())}`;
  }
};

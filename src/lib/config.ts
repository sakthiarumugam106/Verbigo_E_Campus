
/**
 * @fileOverview Site-wide configuration and constants.
 *
 * This file centralizes constants like contact information, social media links,
 * and other site-wide settings to make them easily updatable.
 */

export const siteConfig = {
  whatsappNumber: '7708071872',
  email: 'sakthiarumugam106@gmail.com',
  address: '123 Language Lane, Verbville, IN 54321',
  socials: {
    instagram: 'https://www.instagram.com/verbigo.in',
    twitter: 'https://twitter.com/verbigo_in',
    linkedin: 'https://www.linkedin.com/company/verbigo',
  },
  googleSheetUrls: {
    contact: "https://script.google.com/macros/s/AKfycbzs942Zf1lwHmdIFOdc07dPRSvahKLv2NKIosImOtLMt7jdgLfbZm7NoWKNnQpf0m4/exec",
    demo: "https://script.google.com/macros/s/AKfycbxRofdOnZAsNKHtDVC3XgJnjJiSeGtBwPL6Ra4C2AlE9FrhvwzX3xpRBe3vorJyuWKg/exec",
    careers: "https://script.google.com/macros/s/AKfycbztmUYt4_YyE0ZbAu-_uDLQW6jvMLMy6UKfOtU5D-hLpdNCK1mtVGy-f97q2a4h_qEi/exec",
  },
  assets: {
    baseUrl: 'https://firebasestudio-hosting.web.app',
    logoWhite: '/logo-white.png',
    emailIcon: '/email-icon.png',
    phoneIcon: '/phone-icon.png',
    linkedinIcon: '/linkedin-icon.png',
    instagramIcon: '/instagram-icon.png',
    twitterIcon: '/twitter-icon.png',
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
     const message = `
      New Tutor Request!
      -----------------------------
      Name: ${details.name}
      Email: ${details.email}
      WhatsApp: ${details.whatsapp}
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

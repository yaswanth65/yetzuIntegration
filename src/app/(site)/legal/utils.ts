export type LegalPageType = {
  title: string;
  date: string;
  introduction: string;
  content: {
    section: string;
    description?: string;
    items: {
      title: string;
      body: string;
    }[];
  }[];
};

export const termsPageData = {
  title: "Terms & Conditions",
  date: "20 October 2025",
  introduction:
    'These Terms and Conditions govern your access to and use of the website at [YOUR WEBSITE ADDRESS] (the "Site") and all services provided by [YOUR COMPANY NAME] (the "Company"). By accessing or using the Site, you represent that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you may not use the Site.',
  content: [
    {
      section: "Intellectual Property (IP) and User Content",
      items: [
        {
          title: "Company Content",
          body: "All educational materials, course content, documentation, and tools provided by the Company are the property of [YOUR COMPANY NAME] and are protected by copyright. You are granted a limited, non-exclusive license to use this material solely for your personal, non-commercial educational purposes.",
        },
        {
          title: "Student Research and IP",
          body: "The intellectual property rights to any research data, findings, original manuscripts, or publications you develop while using the mentorship services remain solely with you and your affiliated institution. The Company and its mentors claim no ownership over your original research work.",
        },
        {
          title: "Feedback and Submissions",
          body: "Any feedback, suggestions, or comments you provide regarding the Service may be used by the Company without any obligation or compensation to you.",
        },
      ],
    },
    {
      section: "Mentorship Disclaimer and Limitation of Liability",
      items: [
        {
          title: "Educational Guidance Only",
          body: "The mentors provide educational guidance, which should not be considered professional or legal advice. You are responsible for adhering to your institution's policies.",
        },
        {
          title: "No Guarantee of Outcomes",
          body: "While we strive to provide high-quality mentorship, the Company does not guarantee any specific academic or career outcomes, such as publication, graduation, or employment.",
        },
      ],
    },
    {
      section: "User Conduct",
      description:
        "You agree to interact with mentors and other users respectfully and professionally. You will not submit any content that is abusive, defamatory, or violates any laws, including those pertaining to plagiarism or research misconduct. The Company reserves the right to terminate access for breaches of this Code of Conduct.",
      items: [],
    },
    {
      section: "Termination",
      description:
        "We may terminate or suspend your account immediately if you breach these Terms, particularly those related to the Code of Conduct or research integrity.",
      items: [],
    },
    {
      section: "Governing Law and Contact",
      description:
        "These Terms are governed by the laws of [YOUR COUNTRY/STATE].For any questions, please contact us at [YOUR CONTACT EMAIL ADDRESS].",
      items: [],
    },
  ],
};

export const privacyPageData = {
  title: "Privacy Policy",
  date: termsPageData.date,
  introduction: termsPageData.introduction,
  content: termsPageData.content,
};

export const refundPageData = {
  title: "Refund Policy",
  date: termsPageData.date,
  introduction: termsPageData.introduction,
  content: termsPageData.content,
};

export const mentorshipPageData = {
  title: "Mentorship Policy",
  date: termsPageData.date,
  introduction: termsPageData.introduction,
  content: termsPageData.content,
};

export const codeOfConductPageData = {
  title: "Code of Conduct",
  date: termsPageData.date,
  introduction: termsPageData.introduction,
  content: termsPageData.content,
};

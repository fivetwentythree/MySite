const siteUrl = import.meta.env.SITE_URL || "http://localhost:4321";
const siteEmail = import.meta.env.SITE_EMAIL || "";
const githubUrl = import.meta.env.SITE_GITHUB || "";
const linkedinUrl = import.meta.env.SITE_LINKEDIN || "";

const aboutChildren = [
  { label: "Biography", href: "/about/" },
  ...(siteEmail ? [{ label: "Contact", href: `mailto:${siteEmail}` }] : [])
];

export const site = {
  url: siteUrl,
  locale: "en_US",
  name: "Lochana L. Perera",
  fullName: "Lochana L. Perera",
  tagline: "Notes on software, systems, language, and the work of building useful things.",
  email: siteEmail,
  keywords: [
    "Lochana L. Perera",
    "analytical chemistry",
    "food safety testing",
    "quality control",
    "HPLC",
    "GC-MS",
    "ICP-MS",
    "Domestica Hobart"
  ],
  social: {
    github: githubUrl,
    linkedin: linkedinUrl
  },
  nav: [
    {
      label: "Writings",
      href: "/writings/",
      children: [
        { label: "Recent Writings", href: "/writings/" },
        { label: "Miscellaneous Writing", href: "/writings/miscellaneous/" }
      ]
    },
    {
      label: "Thoughts",
      href: "/thoughts/"
    },
    {
      label: "About",
      href: "/about/",
      children: aboutChildren
    }
  ]
};

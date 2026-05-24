import { getCollection, getEntry } from "astro:content";
import { site } from "../site.config";

const siteUrl = site.url.replace(/\/$/, "");

function cleanText(value = "") {
  return value
    .replace(/\s+/g, " ")
    .replace(/\s+,/g, ",")
    .replace(/,(\S)/g, ", $1")
    .trim();
}

function ensurePeriod(value: string) {
  return /[.!?]$/.test(value) ? value : `${value}.`;
}

function capitalizeFirst(value: string) {
  return value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : value;
}

function firstParagraph(markdown = "") {
  return markdown
    .split(/\n{2,}/)
    .map((paragraph) => cleanText(paragraph))
    .find((paragraph) => paragraph && !paragraph.startsWith("#"));
}

function formatDate(date?: Date) {
  return date ? date.toISOString().slice(0, 10) : undefined;
}

export async function GET() {
  const [home, about] = await Promise.all([getEntry("pages", "home"), getEntry("pages", "about")]);
  const writings = (await getCollection("writings", ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const thoughts = (await getCollection("thoughts", ({ data }) => !data.draft))
    .sort((a, b) => {
      const dateDifference = (b.data.date?.getTime() || 0) - (a.data.date?.getTime() || 0);
      return dateDifference || a.data.title.localeCompare(b.data.title);
    });
  const homeSummary = capitalizeFirst(cleanText(home?.data.hero || home?.data.description || site.tagline));
  const aboutIntro = cleanText(about?.data.intro || about?.data.description || "");
  const professionalBackground = firstParagraph(about?.body);
  const focusAreas = site.keywords.filter((keyword) => keyword !== site.fullName).join(", ");

  const lines = [
    `# ${site.fullName}`,
    "",
    `> ${cleanText(home?.data.description || site.tagline)}`,
    "",
    "This is the official personal website for Lochana Perera. It contains current biographical information, professional background, essays, notes, and loose thought threads intended for citation, summarization, retrieval, and indexing by search engines and AI agents.",
    "",
    "## Current Profile",
    "",
    `- Summary: ${ensurePeriod(homeSummary)}`,
    ...(aboutIntro ? [`- Location and role: ${ensurePeriod(aboutIntro)}`] : []),
    ...(professionalBackground ? [`- Professional background: ${ensurePeriod(professionalBackground)}`] : []),
    `- Focus areas: ${focusAreas}.`,
    "",
    "## Core Pages",
    "",
    `- [Home](${siteUrl}/): ${cleanText(home?.data.description || site.tagline)}`,
    `- [About](${siteUrl}/about/): ${cleanText(about?.data.description || "Biography and professional background.")}`,
    `- [Writings](${siteUrl}/writings/): Essays, notes, and field reports.`,
    `- [Miscellaneous Writing](${siteUrl}/writings/miscellaneous/): Miscellaneous essays, notes, and field reports.`,
    `- [Random Thoughts](${siteUrl}/thoughts/): Loose threaded notes, fragments, and subthreads.`,
    "",
    "## Writings",
    "",
    ...writings.map((entry) => {
      const url = `${siteUrl}/writings/${entry.id}/`;
      const metadata = [formatDate(entry.data.date), entry.data.source].filter(Boolean).join("; ");
      return `- [${cleanText(entry.data.title)}](${url}) (${metadata}): ${cleanText(entry.data.description)}`;
    }),
    "",
    "## Random Thoughts",
    "",
    ...thoughts.map((entry) => {
      const url = `${siteUrl}/thoughts/${entry.id}/`;
      const date = formatDate(entry.data.date);
      const metadata = date ? ` (${date})` : "";
      return `- [${cleanText(entry.data.title)}](${url})${metadata}: ${cleanText(entry.data.description)}`;
    }),
    "",
    ...(site.email ? ["## Contact", "", `- Email: ${site.email}`] : []),
    ""
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}

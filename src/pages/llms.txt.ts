import { getCollection } from "astro:content";
import { site } from "../site.config";

const siteUrl = site.url.replace(/\/$/, "");

export async function GET() {
  const writings = (await getCollection("writings", ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const thoughts = (await getCollection("thoughts", ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const lines = [
    `# ${site.fullName}`,
    "",
    `> ${site.tagline}`,
    "",
    "This is the official personal website for Lochana L. Perera. It contains biographical information and long-form writing intended for citation, summarization, and retrieval by search engines and AI agents.",
    "",
    "## Core Pages",
    "",
    `- [Home](${siteUrl}/): ${site.tagline}`,
    `- [About](${siteUrl}/about/): Biography and professional background.`,
    `- [Writings](${siteUrl}/writings/): Essays, notes, and field reports.`,
    `- [Miscellaneous Writing](${siteUrl}/writings/miscellaneous/): Miscellaneous essays, notes, and field reports.`,
    `- [Random Thoughts](${siteUrl}/thoughts/): Loose threaded notes, fragments, and subthreads.`,
    "",
    "## Writings",
    "",
    ...writings.map((entry) => {
      const url = `${siteUrl}/writings/${entry.id}/`;
      return `- [${entry.data.title}](${url}): ${entry.data.description}`;
    }),
    "",
    "## Random Thoughts",
    "",
    ...thoughts.map((entry) => {
      const url = `${siteUrl}/thoughts/${entry.id}/`;
      return `- [${entry.data.title}](${url}): ${entry.data.description}`;
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

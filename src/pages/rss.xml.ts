import { getCollection } from "astro:content";
import { site } from "../site.config";

const siteUrl = site.url.replace(/\/$/, "");

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const writings = (await getCollection("writings", ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const thoughts = await getCollection("thoughts", ({ data }) => !data.draft);

  const entries = [
    ...writings.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      date: entry.data.date,
      url: `${siteUrl}/writings/${entry.id}/`
    })),
    ...thoughts.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      date: entry.data.date,
      url: `${siteUrl}/thoughts/${entry.id}/`
    }))
  ].sort((a, b) => {
    const dateDifference = (b.date?.getTime() || 0) - (a.date?.getTime() || 0);
    return dateDifference || a.title.localeCompare(b.title);
  });

  const items = entries.map((entry) => {
    return [
      "    <item>",
      `      <title>${escapeXml(entry.title)}</title>`,
      `      <description>${escapeXml(entry.description)}</description>`,
      `      <link>${escapeXml(entry.url)}</link>`,
      `      <guid>${escapeXml(entry.url)}</guid>`,
      entry.date ? `      <pubDate>${entry.date.toUTCString()}</pubDate>` : "",
      "    </item>"
    ].filter(Boolean).join("\n");
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    `    <title>${escapeXml(site.fullName)}</title>`,
    `    <description>${escapeXml(site.tagline)}</description>`,
    `    <link>${escapeXml(`${siteUrl}/`)}</link>`,
    `    <language>en</language>`,
    ...items,
    "  </channel>",
    "</rss>",
    ""
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}

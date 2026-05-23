import { site } from "../site.config";

const siteUrl = site.url.replace(/\/$/, "");

export function GET() {
  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${siteUrl}/sitemap-index.xml`,
      `Sitemap: ${siteUrl}/rss.xml`,
      ""
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
}

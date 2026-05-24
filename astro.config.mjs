import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkEditorialNotes from "./src/lib/remark-editorial-notes.mjs";

const siteUrl = process.env.SITE_URL || "http://localhost:4321";

export default defineConfig({
  site: siteUrl,
  build: {
    inlineStylesheets: "always"
  },
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkGfm, remarkMath, remarkEditorialNotes],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: "github-light",
      wrap: true
    }
  }
});

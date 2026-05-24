# Personal Site

Static personal site built with Astro. It is designed for GitHub Pages, fast page loads, and writing posts as plain Markdown.

## Commands

```sh
npm install
npm run dev
npm run optimize:images
npm run build
```

`npm run build` automatically converts images in `public/images` to WebP, removes the original `.jpg`, `.jpeg`, and `.png` files, and rewrites matching source references before generating the site.

## Writing

Create a new Markdown file in `src/content/writings`.

```md
---
title: "Post title"
description: "Short summary for the listing page."
date: 2026-05-23
source: "Essay"
tags: ["systems", "notes"]
---

Your prose here with a numbered margin note {{note: This appears in the margin on desktop and opens inline on mobile.}}

An unnumbered note looks like this {{marginnote: Useful for side comments that should not interrupt the sentence.}}

Image notes use files from `public/images`:

```md
{{note: ![Short image description](/images/example.webp) Visible caption below the image.}}
```

Miscellaneous writing lives in `src/content/writings/miscellaneous` and appears at `/writings/miscellaneous/`. Use the same frontmatter structure:

```md
---
title: "Miscellaneous post title"
description: "Short summary for the listing page."
date: 2026-05-23
source: "Note"
tags: ["miscellaneous"]
---

Your prose here.
```

## Random Thoughts

Create loose thread-style notes in `src/content/thoughts`. Nested Markdown lists become threads and subthreads. Only `title` is required in the frontmatter.

```md
---
title: "Notebook fragments"
---

## Thread title

- Write the first thought here. {{marginnote: Margin notes work in thoughts too.}}

  - Add a related thought, reply, correction, or tangent.

    - Add another nested reply.

  - Add a separate branch from the same main thought.
```

## GitHub Pages

Set the final domain with `SITE_URL` before building:

```sh
SITE_URL=https://lochana.au npm run build
```

Local builds can run without `SITE_URL`; they fall back to `http://localhost:4321`. CI/deployment builds fail when `SITE_URL` is missing or set to localhost.

Optional public contact/profile values can be set the same way:

```sh
SITE_EMAIL=
SITE_GITHUB=https://github.com/fivetwentythree
SITE_LINKEDIN=https://www.linkedin.com/in/lochanalperera/
```

The GitHub Pages custom domain is configured in `public/CNAME`:

```txt
lochana.au
```

The deployment workflow lives in `.github/workflows/deploy.yml`. In the repository settings, set Pages source to **GitHub Actions**.

For the apex domain, configure these DNS records at your domain provider:

```txt
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
AAAA  @     2606:50c0:8000::153
AAAA  @     2606:50c0:8001::153
AAAA  @     2606:50c0:8002::153
AAAA  @     2606:50c0:8003::153
```

After DNS resolves, enable **Enforce HTTPS** in the repository's Pages settings. DNS changes can take up to 24 hours.

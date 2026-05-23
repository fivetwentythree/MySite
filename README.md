# Personal Site

Static personal site built with Astro. It is designed for GitHub Pages, fast page loads, and writing posts as plain Markdown.

## Commands

```sh
npm install
npm run dev
npm run optimize:images
npm run build
```

`npm run build` automatically optimizes images in `public/images` before generating the site.

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
{{note: ![Short image description](/images/example.jpg) Visible caption below the image.}}
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
SITE_URL=https://your-domain.com npm run build
```

Optional public contact/profile values can be set the same way:

```sh
SITE_EMAIL=you@your-domain.com
SITE_GITHUB=https://github.com/your-profile
SITE_LINKEDIN=https://www.linkedin.com/in/your-profile
```

If you use a custom domain, create `public/CNAME` containing only that domain.

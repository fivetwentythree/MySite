Place public site images in this directory.

Markdown paths from content files should start at `/images/`. During `npm run build`, `.jpg`, `.jpeg`, and `.png` files in this directory are converted to `.webp`, the originals are removed, and matching source references are rewritten.

Example:

```md
![Portrait](/images/portrait.webp)
```

For sidenotes and margin notes:

```md
{{note: ![Chart](/images/chart.webp)}}
{{marginnote: ![Portrait](/images/portrait.webp)}}
```

Do not include `/public` in the Markdown URL. Astro serves this directory from the site root, so `public/images/chart.webp` becomes `/images/chart.webp`.

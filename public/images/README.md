Place public site images in this directory.

Markdown paths from content files should start at `/images/`.

Example:

```md
![Portrait](/images/portrait.jpg)
```

For sidenotes and margin notes:

```md
{{note: ![Chart](/images/chart.jpg)}}
{{marginnote: ![Portrait](/images/portrait.jpg)}}
```

Do not include `/public` in the Markdown URL. Astro serves this directory from the site root, so `public/images/chart.jpg` becomes `/images/chart.jpg`.

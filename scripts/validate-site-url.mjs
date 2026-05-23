const siteUrl = process.env.SITE_URL;
const isDeployment = process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";

if (!siteUrl) {
  if (isDeployment) {
    console.error("SITE_URL must be set for production builds.");
    process.exit(1);
  }

  console.warn("SITE_URL is not set. Local build will use http://localhost:4321.");
  process.exit(0);
}

let parsedUrl;

try {
  parsedUrl = new URL(siteUrl);
} catch {
  console.error(`SITE_URL is not a valid URL: ${siteUrl}`);
  process.exit(1);
}

if (!["http:", "https:"].includes(parsedUrl.protocol)) {
  console.error("SITE_URL must start with http:// or https://.");
  process.exit(1);
}

if (["example.com", "your-domain.com"].includes(parsedUrl.hostname)) {
  console.error("SITE_URL must be your real production domain, not a placeholder.");
  process.exit(1);
}

if (isDeployment && parsedUrl.hostname === "localhost") {
  console.error("SITE_URL cannot be localhost for production builds.");
  process.exit(1);
}

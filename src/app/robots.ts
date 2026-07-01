import type { MetadataRoute } from "next";

const SITE_URL = "https://www.fabrikoindustria.com.br";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/areadocliente", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

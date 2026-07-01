import type { MetadataRoute } from "next";

const SITE_URL = "https://www.fabrikoindustria.com.br";

const routes = [
  "",
  "/quem-somos",
  "/linhas",
  "/acabamentos",
  "/catalogo",
  "/projetos",
  "/promob",
  "/lancamentos",
  "/puxadores",
  "/seja-parceiro",
  "/contato",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}

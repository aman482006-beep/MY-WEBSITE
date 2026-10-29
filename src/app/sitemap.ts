import type { MetadataRoute } from "next";

const routes = ["", "/work", "/creator", "/recruiters", "/resources", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route): MetadataRoute.Sitemap[number] => ({
    url: `https://amanmalu.me${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

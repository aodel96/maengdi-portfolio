import type { MetadataRoute } from "next";
import { site, navigation } from "@/content/site";
import { absoluteSiteUrl } from "@/lib/paths";
import { projects } from "@/content/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return [
    ...navigation.map((item) => ({
      url: absoluteSiteUrl(site.url!, item.href),
    })),
    ...projects
      .filter((project) => !project.isPlaceholder)
      .map((project) => ({
        url: absoluteSiteUrl(site.url!, `/work/${project.slug}`),
      })),
  ];
}

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Each file in src/content/publications/ is one publication.
const publications = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    year: z.number(),
    type: z.enum(["Article", "Ph.D. thesis", "Conference", "Chapter"]),
    journal: z.string().optional(),
    details: z.string().optional(),
    doi: z.string().optional(),
    pdf: z.string().optional(),
  }),
});

export const collections = { publications };

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const featureItemSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const blockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("hero"),
    title: z.string(),
    description: z.string(),
    buttonText: z.string(),
    buttonLink: z.string(),
  }),
  z.object({
    type: z.literal("features"),
    items: z.array(featureItemSchema),
  }),
  z.object({
    type: z.literal("faq"),
    items: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
  }),
]);

const pagesCollection = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/pages",
  }),
  schema: z.object({
    blocks: z.array(blockSchema),
  }),
});

export const collections = {
  pages: pagesCollection,
};

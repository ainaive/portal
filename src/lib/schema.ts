import { z } from 'zod';

export const siteSchema = z.object({
  name: z.string(),
  nameEn: z.string(),
  tagline: z.string(),
  description: z.string(),
  url: z.string().url(),
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const toolLinksSchema = z.object({
  website: z.string().url().optional(),
  github: z.string().url().optional(),
  docs: z.string().url().optional(),
});

export const toolAccessSchema = z.enum(['api-key', 'client', 'web']);

export const toolSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string(),
  summary: z.string(),
  description: z.string(),
  category: z.string(),
  access: toolAccessSchema,
  tags: z.array(z.string()).default([]),
  status: z.enum(['stable', 'beta', 'experimental']).default('stable'),
  links: toolLinksSchema.default({}),
  highlights: z.array(z.string()).default([]),
});

export type Site = z.infer<typeof siteSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Tool = z.infer<typeof toolSchema>;

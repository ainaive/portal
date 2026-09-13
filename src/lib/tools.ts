import { parse } from 'yaml';
import { z } from 'zod';
import categoriesYaml from '../data/categories.yaml?raw';
import siteYaml from '../data/site.yaml?raw';
import toolsYaml from '../data/tools.yaml?raw';
import {
  categorySchema,
  siteSchema,
  toolSchema,
  type Category,
  type Site,
  type Tool,
} from './schema';

export function getSite(): Site {
  return siteSchema.parse(parse(siteYaml));
}

export function getCategories(): Category[] {
  return z.array(categorySchema).parse(parse(categoriesYaml));
}

export function getTools(): Tool[] {
  const tools = z.array(toolSchema).parse(parse(toolsYaml));
  const categoryIds = new Set(getCategories().map((c) => c.id));
  const slugs = new Set<string>();

  for (const tool of tools) {
    if (!categoryIds.has(tool.category)) {
      throw new Error(`Tool "${tool.slug}" references unknown category "${tool.category}"`);
    }
    if (slugs.has(tool.slug)) {
      throw new Error(`Duplicate tool slug: ${tool.slug}`);
    }
    slugs.add(tool.slug);
  }

  return tools;
}

export function getToolBySlug(slug: string): Tool | undefined {
  return getTools().find((tool) => tool.slug === slug);
}

export function getToolsByCategory(): { category: Category; tools: Tool[] }[] {
  const tools = getTools();
  return getCategories().map((category) => ({
    category,
    tools: tools.filter((tool) => tool.category === category.id),
  }));
}

export function getCategoryById(id: string): Category | undefined {
  return getCategories().find((category) => category.id === id);
}

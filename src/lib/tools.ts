import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { z } from 'zod';
import {
  categorySchema,
  siteSchema,
  toolSchema,
  type Category,
  type Site,
  type Tool,
} from './schema';

const dataDir = join(dirname(fileURLToPath(import.meta.url)), '../data');

function loadYaml(filename: string): unknown {
  return parse(readFileSync(join(dataDir, filename), 'utf8'));
}

export function getSite(): Site {
  return siteSchema.parse(loadYaml('site.yaml'));
}

export function getCategories(): Category[] {
  return z.array(categorySchema).parse(loadYaml('categories.yaml'));
}

export function getTools(): Tool[] {
  const tools = z.array(toolSchema).parse(loadYaml('tools.yaml'));
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

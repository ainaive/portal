import type { Tool } from './schema';

export const statusLabel: Record<Tool['status'], string> = {
  stable: '稳定',
  beta: 'Beta',
  experimental: '实验',
};

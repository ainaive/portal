import type { Tool } from './schema';

export const statusLabel: Record<Tool['status'], string> = {
  stable: '稳定',
  beta: 'Beta',
  experimental: '实验',
};

export const accessLabel: Record<Tool['access'], string> = {
  'api-key': 'API Key',
  client: '客户端',
  web: 'Web',
};

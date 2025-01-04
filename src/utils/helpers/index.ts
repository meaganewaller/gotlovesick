export * from './graphql';
export * from './strings';

import { CONFIG } from '@/utils/config';

export function url(path = '') {
  const baseUrl = CONFIG.url;

  return new URL(path, baseUrl);
}

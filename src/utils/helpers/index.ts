import { formatDistance } from 'date-fns'
export * from './graphql';
export * from './strings';
export * from './comments';

import { CONFIG } from '@/utils/config';

export function url(path = '') {
  const baseUrl = CONFIG.url;

  return new URL(path, baseUrl);
}

export const formatDateAsString = (date: string) => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
}

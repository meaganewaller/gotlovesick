import { format, formatDistance, formatRelative, subDays } from 'date-fns'
export * from './graphql';
export * from './strings';

import { CONFIG } from '@/utils/config';

export function url(path = '') {
  const baseUrl = CONFIG.url;

  return new URL(path, baseUrl);
}

export const formatDateAsString = (date: string) => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
}

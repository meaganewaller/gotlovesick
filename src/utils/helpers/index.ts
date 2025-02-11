import { formatDistance } from 'date-fns';
export * from './graphql';
export * from './strings';
export * from './comments';
export * from './genres';

import { CONFIG } from '@/utils/config';

export function url(path = '') {
  const baseUrl = CONFIG.url;

  return new URL(path, baseUrl);
}

export const formatDateAsString = (date: string) => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

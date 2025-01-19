import type { WPLog, Log } from '@/types';

export const convertWPLogToLog = ({
  content,
  databaseId,
  date,
  slug,
  title,
}: WPLog): Log => {
  return {
    date,
    databaseId,
    content,
    slug,
    title,
  };
};

import type { WPLog, Log } from '@/types';

export const convertWPLogToLog = ({
  contentParts,
  databaseId,
  date,
  slug,
  title,
}: WPLog): Log => {
  return {
    date,
    databaseId,
    content: contentParts.beforeMore + contentParts.afterMore,
    slug,
    title,
  };
};

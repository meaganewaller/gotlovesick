'use client';

import { parseISO, format } from 'date-fns';
import React from 'react';

export default function Date({ dateString }: { dateString: string }) {
  const date = parseISO(dateString);

  return <time dateTime={dateString}>{format(date, 'MM/dd/yy')}</time>;
}

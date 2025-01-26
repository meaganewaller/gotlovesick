'use client';

import { useSplittingOnLoad } from '@/utils/hooks';

function RainbowHeaderTitle() {
  useSplittingOnLoad('rainbow');
  return (
    <h1 data-splitting className="rainbow animated title">
      got lovesick
    </h1>
  );
}

export default RainbowHeaderTitle;

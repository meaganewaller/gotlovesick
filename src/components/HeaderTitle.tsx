'use client';

import { useSplittingOnLoad } from '@/utils/hooks';

function HeaderTitle() {
  useSplittingOnLoad('rainbow');
  return (
    <h1 data-splitting className="rainbow animated title">
      secret gardens
    </h1>
  );
}

export default HeaderTitle;

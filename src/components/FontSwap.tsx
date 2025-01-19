'use client';

import { useChangeFont } from '@/utils/hooks';

const FontSwap = () => {
  const { fontClass, changeFontClass } = useChangeFont();

  if (!changeFontClass) {
    return null;
  }

  return (
    <div id="font-toggler">
      <button
        type="button"
        onClick={(e) => {
          if (fontClass === '') {
            changeFontClass('readable-font');
          }
          if (fontClass === 'readable-font') {
            changeFontClass('');
          }
        }}
      >
        <span>toggle font</span>
      </button>
    </div>
  );
}

export default FontSwap;

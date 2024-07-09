'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { HiMiniQuestionMarkCircle } from 'react-icons/hi2';
import { useWindowSize } from 'usehooks-ts';

export default function Hint({ children }: { children: ReactNode }) {
  const [side, setSide] = useState<string>('unknown');
  const hint = useRef<HTMLSpanElement | null>(null);
  const { width } = useWindowSize();
  useEffect(() => {
    const rect = hint.current?.getBoundingClientRect();
    if (rect) {
      const center = (rect?.left + rect?.right) / 2;
      if (center < width / 2) {
        setSide(rect.left < 125 ? 'right' : 'top');
      } else {
        setSide(rect.right > width - 145 ? 'left' : 'top');
      }
    }
  }, [width]);
  return (
    <span
      ref={hint}
      className={clsx(
        'tooltip tooltip-info align-top before:max-w-3xs before:rounded-lg before:px-3 before:py-2 before:leading-normal md:before:max-w-2xs lg:before:max-w-xs',
        {
          'tooltip-right': side === 'right',
          'tooltip-left': side === 'left',
          'before:-mb-px': side === 'top'
        }
      )}
      data-tip={children}
    >
      <HiMiniQuestionMarkCircle className="h-4 w-4 text-secondary" />
    </span>
  );
}

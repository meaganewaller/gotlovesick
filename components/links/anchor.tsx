'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Link as ScrollableLink } from 'react-scroll';
import { useScrollDirection } from 'react-use-scroll-direction';

const EPSILON = 1;
const UNDERSCROLL_WITHOUT_HEADER = 20;
const UNDERSCROLL_WITH_HEADER = 108;

export default function AnchorLink({
  to,
  onClick,
  className,
  children
}: {
  to: string;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}) {
  const determineOffset = useCallback(() => {
    if (typeof window === 'undefined') {
      return -UNDERSCROLL_WITHOUT_HEADER;
    }
    const now = document.getElementById(to);
    if (now) {
      const position = now.getBoundingClientRect().top;
      if (
        position < UNDERSCROLL_WITHOUT_HEADER - EPSILON ||
        Math.abs(position - UNDERSCROLL_WITH_HEADER) < EPSILON
      ) {
        return -UNDERSCROLL_WITH_HEADER;
      }
    }
    return -UNDERSCROLL_WITHOUT_HEADER;
  }, [to]);
  const [offset, setOffset] = useState<number>(determineOffset());
  const { isScrollingY } = useScrollDirection();
  useEffect(() => {
    setOffset(determineOffset);
  }, [determineOffset, isScrollingY, to]);
  const router = useRouter();
  return (
    <ScrollableLink
      to={to}
      smooth="easeInOutCubic"
      duration={500}
      offset={offset}
      onClick={() => {
        onClick?.();
        router.replace('#' + to, { scroll: false });
      }}
      className={className}
    >
      {children}
    </ScrollableLink>
  );
}

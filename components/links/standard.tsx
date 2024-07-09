import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef, type MouseEvent, type ReactNode } from 'react';

const SuperLink = forwardRef<
HTMLAnchorElement,
{
  href?: string;
  toFile?: boolean;
  external?: boolean;
  styledText?: boolean;
  styledIcon?: boolean;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  children?: ReactNode;
}
>(function SuperLink(
  {
    href,
    toFile,
    external,
    styledText,
    styledIcon,
    className,
    onClick,
    children
  },
  ref
) {
  return (
    <Link
    ref={ref}
    href={href ?? ''}
    prefetch={!toFile}
    rel={external ? 'noopener noreferrer' : undefined}
    target={external ? '_blank' : undefined}
    className={clsx(
      {
        'not-prose relative whitespace-nowrap font-extrabold text-secondary no-underline after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-secondary after:transition-all hover:after:w-full':
          styledText,
        'btn btn-circle btn-ghost': styledIcon
      },
      className
    )}
    onClick={onClick}
    >
    {children}
    </Link>
  );
});

export default SuperLink;

import { type ComponentPropsWithoutRef } from 'react';
import { HiLink } from 'react-icons/hi2';
import AnchorLink from './anchor';

export default function LinkedHeading({
  As,
  id,
  children,
  ...rest
}: ComponentPropsWithoutRef<'h1'> & {
  As: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}) {
  return (
    <AnchorLink to={id ?? ''} className="font-normal text-inherit no-underline">
      <As id={id} className="group relative" {...rest}>
        <HiLink className="absolute -left-2 top-1/2 hidden -translate-x-full -translate-y-1/2 text-neutral-content/25 group-hover:inline" />
        {children}
      </As>
    </AnchorLink>
  );
}

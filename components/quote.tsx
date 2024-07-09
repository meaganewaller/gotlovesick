import clsx from 'clsx';
import { type ReactNode } from 'react';
import { HiOutlineChatBubbleLeft } from 'react-icons/hi2';
import SuperLink from '@/components/links/standard';

export default function Quote({
  children,
  author,
  affiliation,
  source,
  alwaysLeftJustify
}: {
  children: ReactNode;
  author: string;
  affiliation?: string;
  source?: string;
  alwaysLeftJustify?: boolean;
}) {
  return (
    <aside
      role="alert"
      className={clsx('not-prose alert my-5 items-start p-6', {
        'justify-items-start text-start': alwaysLeftJustify
      })}
    >
      <HiOutlineChatBubbleLeft className="mt-0.5 h-6 w-6 text-primary" />
      <div>
        <p>&quot;{children}&quot;</p>
        <p
          className={clsx(
            'mt-4 text-sm text-base-content/50',
            alwaysLeftJustify ? 'text-right' : 'text-center sm:text-right'
          )}
        >
          -{' '}
          {source ? (
            <SuperLink
              href={source}
              external
              styledText
              className="font-normal after:h-px"
            >
              {author}
            </SuperLink>
          ) : (
            author
          )}
          {affiliation && <span> ({affiliation})</span>}
        </p>
      </div>
    </aside>
  );
}

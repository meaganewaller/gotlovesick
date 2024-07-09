'use client';

import clsx from 'clsx';
import { useState, type ReactNode } from 'react';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

export default function Collapse({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className={clsx('not-prose collapse my-4 bg-base-200 px-2', {
        'py-2': isOpen
      })}
    >
      <input
        type="checkbox"
        name={title}
        checked={isOpen}
        onChange={(event) => setIsOpen(event.target.checked)}
      />
      <div
        className={clsx(
          'collapse-title flex gap-4 pe-5 transition-colors',
          isOpen ? 'text-lg font-bold' : 'text-base-content/50'
        )}
      >
        <div
          className={clsx(
            'min-w-max',
            isOpen ? 'mt-0.5 h-6 w-6' : 'mt-1.5 h-4 w-4'
          )}
        >
          {isOpen ? (
            <HiEye className="h-full w-full" />
          ) : (
            <HiEyeSlash className="h-full w-full" />
          )}
        </div>
        <h3>{title}</h3>
      </div>
      <div className="collapse-content ml-10">
        <p className="text-base-content/50">{children}</p>
      </div>
    </div>
  );
}

import clsx from 'clsx';
import { type FC, type ReactNode } from 'react';
import { type IconType } from 'react-icons';

export default function createCallout(
  Icon: IconType,
  alertClass?: string
): FC<{ children: ReactNode }> {
  return function Callout({
    title,
    children
  }: {
    title?: string;
    children: ReactNode;
  }) {
    return (
      <aside
        role="alert"
        className={clsx(
          'not-prose alert my-5 items-start gap-y-2 p-6',
          alertClass,
          { 'justify-items-start text-start': title }
        )}
      >
        <Icon
          className={clsx('h-6 w-6 sm:mt-0.5', {
            'text-primary': alertClass === undefined
          })}
        />
        <div>
          <h3 className={clsx({ 'mb-1 text-lg font-bold': title })}>{title}</h3>
          <p>{children}</p>
        </div>
      </aside>
    );
  };
}

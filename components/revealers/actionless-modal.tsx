'use client'

import clsx from 'clsx'
import { useRef, type MutableRefObject, type ReactNode } from 'react';

export default function ActionlessModal({
  clickable,
  title,
  firstLink,
  cancelAnimation,
  children
}: {
  clickable: JSX.Element,
  title: ReactNode,
  firstLink?: MutableRefObject<HTMLAnchorElement | null>;
  cancelAnimation?: boolean;
  children?: Reactnode;
}) {

  const modal = useRef<HTMLDialogElement | null>(null);
  return (
    <>
      <span
        onClick={() => {
          modal.current?.showModal();
          firstLink?.current?.blur();
        }}
      >
        {clickable}
      </span>
      <dialog
        ref={modal}
        className={clsx('modal whitespace-normal text-left', {
          'hidden open:grid': cancelAnimation
        })}
      >
        <div className="modal-box p-6 text-base font-light text-base-content">
          <h3 className="text-xl font-normal">{title}</h3>
          <div className="my-4 gap-y-4">{children}</div>
          <p className="text-base-content/50">
            When you&apos;re done with this dialog box, you can press escape or
            click/tap anywhere outside of it to close it.
          </p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

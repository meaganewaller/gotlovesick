import clsx from 'clsx';
import { type ReactNode } from 'react';
import styles from './css/glitch.module.css';

export default function GlitchText({ children }: { children: ReactNode }) {
  return (
    <span className="relative whitespace-nowrap tracking-wide">
      <span
        aria-hidden
        className={clsx(
          'absolute left-px w-full motion-reduce:hidden',
          styles.glitchRed
        )}
      >
        {children}
      </span>
      <span className="motion-reduce:font-bold motion-reduce:italic">
        {children}
      </span>
      <span
        aria-hidden
        className={clsx(
          'absolute left-px w-full motion-reduce:hidden',
          styles.glitchBlue
        )}
      >
        {children}
      </span>
    </span>
  );
}

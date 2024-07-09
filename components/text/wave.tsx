import clsx from 'clsx';
import styles from './css/wave.module.css';

export default function WaveText({ content }: { content: string }) {
  return (
    <span aria-label={content}>
      <span className="font-bold italic motion-safe:hidden">{content}</span>
      {content.split('').map((letter, index) => (
        <span
          key={index}
          aria-hidden
          className={clsx('relative motion-reduce:hidden', styles.wave)}
          style={{ animationDelay: index * 0.04 + 's' }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

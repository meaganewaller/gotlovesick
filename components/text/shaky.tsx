'use client';

import { useEffect, useState } from 'react';

const randomOffset = () => Math.floor(Math.random() * 2) - 0.5; // -0.5 or 0.5px

const generateOffsets = (numOffsets: number): string[][] => {
  const output = [];
  for (let i = 0; i < numOffsets; i++) {
    output.push([randomOffset() + 'px', randomOffset() + 'px']);
  }
  return output;
};

export default function ShakyText({ content }: { content: string }) {
  const [offsets, setOffsets] = useState<string[][] | null>(null);
  useEffect(() => {
    const interval = setInterval(
      () => setOffsets(generateOffsets(content.length)),
      50
    );
    return () => clearInterval(interval);
  }, [content.length]);
  return (
    <span aria-label={content} className="relative whitespace-nowrap">
      <span className="font-bold italic motion-safe:hidden">{content}</span>
      {content.split('').map((letter, index) => (
        <span
          key={index}
          aria-hidden
          className="relative motion-reduce:hidden"
          style={{ left: offsets?.[index]?.[0], bottom: offsets?.[index]?.[1] }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

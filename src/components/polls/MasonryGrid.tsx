'use client';
import { Masonry } from 'masonic';
import Image from 'next/image';
import Link from 'next/link';
import { WPPollLtd } from '@/types';
import { useEffect } from 'react';

type MasonryGridProps = {
  items: WPPollLtd[];
  columnGutter: number;
  columnWidth: number;
};

export function MasonryGrid({
  items,
  columnGutter,
  columnWidth,
}: MasonryGridProps) {
  useEffect(() => {
    const grid = document.querySelector("div[role='grid']");

    if (grid) {
      const items = grid.querySelectorAll('.poll-card');
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('is-visible');
        }, 200 * index);
      });
    }
  });

  return (
    <Masonry
      items={items}
      columnGutter={columnGutter}
      columnWidth={columnWidth}
      overscanBy={5}
      render={({ index, data, width }) => (
        <div className="poll-card" key={`poll-${index}`} style={{ width }}>
          {data.featuredImage ? (
            <Image
              src={data.featuredImage.node.sourceUrl}
              alt={data.featuredImage.node.altText || ''}
              width={data.featuredImage.node.mediaDetails.width}
              height={data.featuredImage.node.mediaDetails.height}
            />
          ) : (
            <></>
          )}
          <h2>{data.title}</h2>
          <Link href={data.uri}>{data.title}</Link>
        </div>
      )}
    />
  );
}

'use client';

import { Masonry } from 'masonic';
import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

type BlogGridProps = {
  initialItems: Post[];
  columnGutter?: number;
  columnWidth?: number;
};

type PostCardProps = {
  item: Post;
  index: number;
};

function PostCard({ item, index }: PostCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 200 * index);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div
      className={classNames('post-card', { 'is-visible': isVisible })}
      key={item.key}
    >
      {item.postDetails.headerImage ? (
        <Image
          src={item.postDetails.headerImage.node.sourceUrl}
          alt={item.postDetails.headerImage.node.altText || ''}
          width={item.postDetails.headerImage.node.mediaDetails.width}
          height={item.postDetails.headerImage.node.mediaDetails.height}
        />
      ) : null}
      <Link href={`/blog/${item.slug}`}>
        <h2>{item.title}</h2>
      </Link>
      <div dangerouslySetInnerHTML={{ __html: item.postDetails.description }} />
    </div>
  );
}

export function Grid({
  initialItems,
  columnGutter = 10,
  columnWidth = 172,
}: BlogGridProps) {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  if (!items || items.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <Masonry
      itemKey={(item) => item.key}
      items={items}
      columnGutter={columnGutter}
      columnWidth={columnWidth}
      overscanBy={5}
      render={(props) => <PostCard item={props.data} index={props.index} />}
    />
  );
}

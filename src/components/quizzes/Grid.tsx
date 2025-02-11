'use client';

import { Masonry } from 'masonic';
import { WPQuizLtd } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

type QuizGridProps = {
  items: WPQuizLtd[];
  columnGutter?: number;
  columnWidth?: number;
};

type QuizCardProps = {
  item: WPQuizLtd;
  index: number;
};

function QuizCard({ item, index }: QuizCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 200 * index);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div
      className={classNames('quiz-card', { 'is-visible': isVisible })}
      key={item.id}
    >
      {item.featuredImage ? (
        <Image
          src={item.featuredImage.node.sourceUrl}
          alt={item.featuredImage.node.altText || ''}
          width={item.featuredImage.node.mediaDetails.width}
          height={item.featuredImage.node.mediaDetails.height}
        />
      ) : (
        <></>
      )}
      <Link href={item.uri}>
        <h2>{item.title}</h2>
      </Link>
      <div dangerouslySetInnerHTML={{ __html: item.quizFields.description }} />
    </div>
  );
}

export function Grid(data: QuizGridProps) {
  const items = data.items;
  const columnGutter = data.columnGutter ? data.columnGutter : 10;
  const columnWidth = data.columnWidth ? data.columnWidth : 172;

  return (
    <>
      <Masonry
        itemKey={(item) => item.id}
        items={items}
        columnGutter={columnGutter}
        columnWidth={columnWidth}
        overscanBy={5}
        render={(props) => <QuizCard item={props.data} index={props.index} />}
      />
    </>
  );
}

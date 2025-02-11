'use client';

import Link from 'next/link';
import { formatDateAsString } from '@/utils/helpers';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { TutorialCard } from '@/types';

type TutorialListProps = {
  items: TutorialCard[];
};

type TutorialListItemProps = {
  item: TutorialCard;
};

function TutorialListItem({ item }: TutorialListItemProps) {
  return (
    <Link
      href={`/tutorials/${item.slug}`}
      className={classNames('tutorial-list-item')}
      key={item.id}
    >
      <time className="blog-post__time">{formatDateAsString(item.date)}</time>
      <div className="blog-post__meta">
        {item.tutorialTypes.nodes?.map((tutorialType) => (
          <button
            key={tutorialType.id}
            className={classNames(['tutorialType', tutorialType.slug])}
          >
            {tutorialType.name}
          </button>
        ))}
        {item.skillLevels.nodes?.map((skillLevel) => (
          <button
            key={skillLevel.id}
            className={classNames(['skillLevel', skillLevel.slug])}
          >
            {skillLevel.name}
          </button>
        ))}
        <h1 className="blog-post__title">{item.title}</h1>
      </div>
      <p className="blog-post__read-more">Read more →</p>
    </Link>
  );
}

export function TutorialList(data: TutorialListProps) {
  const [items, setItems] = useState(data.items);

  useEffect(() => {
    setItems(data.items);
  }, [data]);

  if (items && items.length > 0) {
    return (
      <div id="tutorialsList">
        {items.map((item) => (
          <TutorialListItem key={item.id} item={item} />
        ))}
      </div>
    );
  } else {
    return <div>No tutorials found</div>;
  }
}

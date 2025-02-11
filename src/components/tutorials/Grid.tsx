'use client';

import { useMasonry } from '@/utils/hooks';
import { TutorialCard } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { useState, useEffect } from 'react';

type TutorialGridProps = {
  items: TutorialCard[];
};

type TutorialCardProps = {
  item: TutorialCard;
  index: number;
};

function TutorialGridCard({ item }: TutorialCardProps) {
  return (
    <div className={classNames('tutorial-card')} key={item.id}>
      <figure>
        {item.featuredImage && (
          <Image
            src={item.featuredImage.node.sourceUrl}
            alt={item.featuredImage.node.altText || ''}
            width={item.featuredImage.node.mediaDetails.width}
            height={item.featuredImage.node.mediaDetails.height}
          />
        )}
      </figure>
      <div className="meta">
        {item.tutorialTypes.nodes.map((tutType) => (
          <span className="tutorialType" key={tutType.id}>
            {tutType.name}
          </span>
        ))}
        {item.skillLevels.nodes.map((skill) => (
          <span className="skillLevel" key={skill.id}>
            {skill.name}
          </span>
        ))}
      </div>
      <Link href={`/tutorials/${item.slug}`}>
        <h2>{item.title}</h2>
      </Link>
      <div
        dangerouslySetInnerHTML={{ __html: item.tutorialFields.description }}
      />
    </div>
  );
}

export function Grid(data: TutorialGridProps) {
  const [items, setItems] = useState(data.items);
  const masonryContainer = useMasonry();

  useEffect(() => {
    setItems(data.items);
  }, [data]);

  if (items && items.length > 0) {
    return (
      <div id="tutorialsGrid" ref={masonryContainer}>
        {items.map((item, index: number) => (
          <TutorialGridCard key={item.id} item={item} index={index} />
        ))}
      </div>
    );
  } else {
    return <div>No tutorials found</div>;
  }
}

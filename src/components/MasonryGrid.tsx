'use client';

import React from 'react'
import { useMasonryGrid } from '@/utils/hooks'
import { Nullable, WPPollLtd } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

type MasonryGridParams = {
  items: WPPollLtd[]
  gridClass?: Nullable<string>
  itemClass?: Nullable<string>
  columnWidth?: Nullable<number>
  gutter?: Nullable<number>
}

export const MasonryGrid = (props: MasonryGridParams) => {
  const gridClass = props.gridClass || 'grid'
  const itemClass = props.itemClass || 'item'
  const columnWidth = props.columnWidth ? props.columnWidth : 250
  const gutter = props.gutter ? props.gutter : 10
  const items = props.items

  useMasonryGrid(`.${gridClass}`, `.${itemClass}`, {
    itemSelector: `.${itemClass}`,
    columnWidth: columnWidth,
    gutter: gutter,
  });

  return (
    <div className={`${gridClass}`}>
      {items.map((item) => (
        <div key={item.key} className={`${itemClass}`}>
          {item.featuredImage?.node ? (
            <Image
            src={item.featuredImage.node.sourceUrl}
            alt={item.featuredImage.node.altText || ''}
            width={item.featuredImage.node.mediaDetails.width}
            height={item.featuredImage.node.mediaDetails.height}
            />
          ) : <></>}
          <h2><Link href={item.uri}>{item.title}</Link></h2>
        </div>
      ))}
      </div>
  )
}


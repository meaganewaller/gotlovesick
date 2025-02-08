'use client'

import { Masonry } from 'masonic'
import { WPPollLtd } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

type PollGridProps = {
  items: WPPollLtd[]
  columnGutter?: number
  columnWidth?: number
}

type PollCardProps = {
  item: WPPollLtd
  index: number;
}

function PollCard({ item, index }: PollCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 200 * index);

    return () => clearTimeout(timeout)
  }, [index])

  return (
    <div className={classNames("poll-card", { "is-visible": isVisible })} key={item.id}>
      {item.featuredImage ? (
        <Image src={item.featuredImage.node.sourceUrl} alt={item.featuredImage.node.altText || ''} width={item.featuredImage.node.mediaDetails.width} height={item.featuredImage.node.mediaDetails.height} />
      ) : <></>}
      <Link href={item.uri}><h2>{item.title}</h2></Link>
      <div dangerouslySetInnerHTML={{  __html: item.pollDetails.description }} />
    </div>
  )
}

export function Grid(data: PollGridProps) {
  const items = data.items
  const columnGutter = data.columnGutter ? data.columnGutter : 10
  const columnWidth = data.columnWidth ? data.columnWidth : 172

  return (
    <>
      <Masonry
        itemKey={(item) => item.id}
        items={items}
        columnGutter={columnGutter}
        columnWidth={columnWidth}
        overscanBy={5}
        render={(props) => (<PollCard item={props.data} index={props.index} />) }
      />
    </>
  )
}

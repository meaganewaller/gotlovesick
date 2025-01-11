import React from 'react';
import Link from 'next/link';
import { ScallopContainer } from '@/components/ScallopContainer';
import { WPShrine } from '@/types';
import Image from 'next/image';
import rainbows from '~/images/dividers/rainbows.gif';

interface ShrineNavProps {
  shrine: WPShrine;
}

export const ShrineNav: React.FC<ShrineNavProps> = ({ shrine }) => {
  if (!shrine?.shrineDetails?.sidebar) {
    return null;
  }

  return (
    <ScallopContainer>
      <h2>{shrine.title.toLowerCase()} nav</h2>
      <Image src={rainbows} alt="" className='divider' />

      <nav className="shrine-nav">
        <ul>
          {shrine.shrineDetails.sidebar.nodes.map((item) => (
            <li key={item.id}>
              <Link href={item.uri}>
                <span dangerouslySetInnerHTML={{ __html: item.title }} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </ScallopContainer>
  )
}


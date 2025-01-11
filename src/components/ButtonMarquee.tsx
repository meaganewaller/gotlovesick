import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import y2k from '~/images/marquee/000 Y2K NEOCITIES BUTTON 01.png';
import acab from '~/images/marquee/acab.gif';
import tellingme from '~/images/marquee/A1EysEc.png';
import antinazi from '~/images/marquee/antinazi.gif';
import antinft from '~/images/marquee/antinft.gif';
import bestviewed from '~/images/marquee/bestview.gif';
import bookmark from '~/images/marquee/bookmark_this_page.gif';
import bratz2 from '~/images/marquee/bratz2.png';
import defund from '~/images/marquee/defund_badge.gif';
import foreveronline from '~/images/marquee/foreveronline.gif';
import freepalestine from '~/images/marquee/free_palestine.gif';
import furby from '~/images/marquee/furby button.png';
import graphicdesign from '~/images/marquee/graphicdesign.png';
import keepwebfree from '~/images/marquee/IMG_1816.gif';
import macmade from '~/images/marquee/macmade2.gif';
import sweet from '~/images/marquee/sweet.png';
import trn from '~/images/marquee/trn.png';
import web from '~/images/marquee/web.gif';
import fishtank from '~/images/marquee/fishtank.webp';
import vim from '~/images/marquee/vim.gif';

export default function ButtonMarquee() {
  return (
    <div className="marquee-container" aria-hidden="true" tabIndex={1}>
      <h2 className="sr-only">Button Marquee</h2>
      <div className="marquee">
        <Image src={acab} alt="" />
        <Image src={y2k} alt="" />
        <Image src={tellingme} alt="" />
        <Image src={antinazi} alt="" />
        <Image src={antinft} alt="" />
        <Image src={bestviewed} alt="" />
        <Image src={bookmark} alt="" />
        <Image src={bratz2} alt="" />
        <Image src={defund} alt="" />
        <Image src={foreveronline} alt="" />
        <Image src={freepalestine} alt="" />
        <Image src={furby} alt="" />
        <Image src={graphicdesign} alt="" />
        <Image src={keepwebfree} alt="" />
        <Image src={macmade} alt="" />
        <Image src={sweet} alt="" />
        <Image src={trn} alt="" />
        <Image src={web} alt="" />
        <Link
          href="https://www.tumblr.com/wynns-wonderful-pixel-paradise/725550567512031232/fishtank-88x31-button?source=share"
          target="_blank"
        >
          <Image src={fishtank} alt="" />
        </Link>
        <Image src={vim} alt="" />
      </div>
      <div className="marquee marquee-copy" aria-hidden="true">
        <Image src={acab} alt="" />
        <Image src={y2k} alt="" />
        <Image src={tellingme} alt="" />
        <Image src={antinazi} alt="" />
        <Image src={antinft} alt="" />
        <Image src={bestviewed} alt="" />
        <Image src={bookmark} alt="" />
        <Image src={bratz2} alt="" />
        <Image src={defund} alt="" />
        <Image src={foreveronline} alt="" />
        <Image src={freepalestine} alt="" />
        <Image src={furby} alt="" />
        <Image src={graphicdesign} alt="" />
        <Image src={keepwebfree} alt="" />
        <Image src={macmade} alt="" />
        <Image src={sweet} alt="" />
        <Image src={trn} alt="" />
        <Image src={web} alt="" />
        <Link
          href="https://www.tumblr.com/wynns-wonderful-pixel-paradise/725550567512031232/fishtank-88x31-button?source=share"
          target="_blank"
        >
          <Image src={fishtank} alt="" />
        </Link>
        <Image src={vim} alt="" />
      </div>
    </div>
  );
}

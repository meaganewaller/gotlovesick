import Script from "next/script";
import { fetchPage, fetchMenu, fetchRecentLogs, convertWPLogToLog } from '@/services/graphql';
import Image from 'next/image';
import Link from 'next/link';
import Date from '@/components/date';
import rainbowBullet from '~/images/bullets/rainbow.gif';
import rainbowButton from '~/images/buttons/rainbowsg.gif';
import { notFound } from "next/navigation";
import pinksparkle from '~/images/bullets/pinksparkle.gif';
import stardivider from '~/images/dividers/bouncing-stars.gif';
import glitterkitty from '~/images/glitter-kitty.gif';
import { LastFmData } from "@/components/LastFmData";
import { MenuLocationEnum } from "@/types";
import Sidebar from "@/components/Sidebar";
import ButtonMarquee from "@/components/ButtonMarquee";

export default async function Home() {
  // Fetch homepage from WordPress.
  const homepage = await fetchPage('homepage')
  const fetchedLogs = await fetchRecentLogs({ first: 5 })
  const recentLogs = fetchedLogs.edges.map((edge) => convertWPLogToLog(edge.node))

  const fetchedSidebarMenu = await fetchMenu(MenuLocationEnum.Sidebar)
  const fetchedShrinesMenu = await fetchMenu(MenuLocationEnum.Shrines)
  const fetchedBookmarksMenu = await fetchMenu(MenuLocationEnum.Bookmarks)
  const fetchedResourcesMenu = await fetchMenu(MenuLocationEnum.Resources)

  const menus = [
    {
      title: 'Navigation',
      menu: fetchedSidebarMenu
    },
    {
      title: 'Shrines',
      menu: fetchedShrinesMenu
    },
    {
      title: 'Collections',
      menu: fetchedBookmarksMenu
    },
    {
      title: 'Resources',
      menu: fetchedResourcesMenu
    }
  ]

  if (!homepage) {
    notFound()
  }

  {/* <div id="root-page"> */ }
  {/*   <aside className="aside aside--left"> */ }
  {/*     <details id="mobile-nav"> */ }
  {/*       <summary id="mobile-nav-toggle">Open Navigation</summary> */ }
  {/*       <nav className="aside-nav"> */ }
  {/*         <div className="aside-nav__heading" aria-hidden="true">Menu</div> */ }
  {/*         <ul aria-label="Menu"> */ }
  {/*           <li><Link href="/"><Image src={pinksparkle} width={9} alt="" aria-hidden={true} /></Link></li> */ }
  {/*           <li> */ }
  {/*             <details id="menu-aboutme"> */ }
  {/*               <summary>me! <small>(2)</small></summary> */ }
  {/*               <ul> */ }
  {/*                 <li><Link href="/about">about me</Link></li> */ }
  {/*                 <li><Link href="/media">media log</Link></li> */ }
  {/*               </ul> */ }
  {/*             </details> */ }
  {/*           </li> */ }
  {/*           <li> */ }
  {/*             <details id="menu-aboutsite"> */ }
  {/*               <summary>about the site <small>(4)</small></summary> */ }
  {/*               <ul> */ }
  {/*                 <li><Link href="/about-the-site">about the site</Link></li> */ }
  {/*                 <li><Link href="/guestbook">guestbook</Link></li> */ }
  {/*                 <li><Link href="/colophon">colophon</Link></li> */ }
  {/*                 <li><Link href="/sitemap">sitemap</Link></li> */ }
  {/*               </ul> */ }
  {/*             </details> */ }
  {/*           </li> */ }
  {/*           <li> */ }
  {/*             <details id="menu-byme"> */ }
  {/*               <summary>made by me <small>(4)</small></summary> */ }
  {/*               <ul> */ }
  {/*                 <li><Link href="/snippets">code snippets</Link></li> */ }
  {/*                 <li><Link href="/projects">projects</Link></li> */ }
  {/*                 <li><Link href="/writing">writing</Link></li> */ }
  {/*                 <li><Link href="/playlists">playlists</Link></li> */ }
  {/*               </ul> */ }
  {/*             </details> */ }
  {/*           </li> */ }
  {/*           <li> */ }
  {/*             <details id="menu-mediarecs"> */ }
  {/*               <summary>media recs <small>(3)</small></summary> */ }
  {/*               <ul> */ }
  {/*                 <li><Link href="/recs/tv-shows" aria-label="tv show recommendations">television</Link></li> */ }
  {/*                 <li><Link href="/recs/books" aria-label="book recommendations">books</Link></li> */ }
  {/*                 <li><Link href="/recs/music" aria-label="music recommendations">music</Link></li> */ }
  {/*               </ul> */ }
  {/*             </details> */ }
  {/*           </li> */ }
  {/*           <li> */ }
  {/*             <details id="menu-resources"> */ }
  {/*               <summary>resources for you <small>(2)</small></summary> */ }
  {/*               <ul> */ }
  {/*                 <li><Link href="/bookmarks">bookmarks</Link></li> */ }
  {/*                 <li><Link href="/resources">web resources</Link></li> */ }
  {/*               </ul> */ }
  {/*             </details> */ }
  {/*           </li> */ }
  {/*           <li> */ }
  {/*             <details id="menu-more"> */ }
  {/*               <summary>fun things <small>(4)</small></summary> */ }
  {/*               <ul> */ }
  {/*                 <li><Link href="/blog">blog</Link></li> */ }
  {/*                 <li><Link href="/shrines">shrines</Link></li> */ }
  {/*                 <li><Link href="/cliques">cliques</Link></li> */ }
  {/*                 <li><Link href="/quizzes-and-polls">quizzes & polls</Link></li> */ }
  {/*               </ul> */ }
  {/*             </details> */ }
  {/*           </li> */ }
  {/*           <li> */ }
  {/*             <details id="menu-webprincess"> */ }
  {/*               <summary>for webprincesses <small>(15)</small></summary> */ }
  {/*               <div className="aside-scrollbox custom-scrollbar"> */ }
  {/*                 <strong>tools:</strong> */ }
  {/*                 <ul> */ }
  {/*                   <li><Link href="/coding/layouts">layouts</Link></li> */ }
  {/*                   <li><Link href="/coding/widgets">widgets</Link></li> */ }
  {/*                   <li><Link href="/coding/cheatsheet">cheatsheet</Link></li> */ }
  {/*                 </ul> */ }
  {/*                 <strong>guides:</strong> */ }
  {/*                 <ul> */ }
  {/*                   <li><Link href="/coding/make-a-website">make your own site</Link></li> */ }
  {/*                   <li><Link href="/coding/common-questions">common questions</Link></li> */ }
  {/*                   <li><Link href="/coding/common-mistakes">common mistakes</Link></li> */ }
  {/*                   <li><Link href="/coding/snippets">snippets</Link></li> */ }
  {/*                   <li><Link href="/coding/troubleshooting">troubleshooting</Link></li> */ }
  {/*                   <li><Link href="/coding/code-quality">code quality</Link></li> */ }
  {/*                   <li><Link href="/coding/now-what">further learning</Link></li> */ }
  {/*                 </ul> */ }
  {/*                 <strong>other:</strong> */ }
  {/*                 <ul> */ }
  {/*                   <li><Link href="/coding/my-environment">my coding environment</Link></li> */ }
  {/*                 </ul> */ }
  {/*               </div> */ }
  {/*             </details> */ }
  {/*           </li> */ }
  {/*         </ul> */ }
  {/*       </nav> */ }
  {/*     </details> */ }
  {/*     <nav className="aside-nav"> */ }
  {/*       <div className="aside-nav__heading" aria-hidden="true">Menu</div> */ }
  {/*       <ul aria-label="Menu"> */ }
  {/*         <li><Link href="/"><Image src={pinksparkle} width={9} alt="" aria-hidden={true} /></Link></li> */ }
  {/*         <li> */ }
  {/*           <details id="menu-aboutme"> */ }
  {/*             <summary>me! <small>(2)</small></summary> */ }
  {/*             <ul> */ }
  {/*               <li><Link href="/about">about me</Link></li> */ }
  {/*               <li><Link href="/media">media log</Link></li> */ }
  {/*             </ul> */ }
  {/*           </details> */ }
  {/*         </li> */ }
  {/*         <li> */ }
  {/*           <details id="menu-aboutsite"> */ }
  {/*             <summary>about the site <small>(4)</small></summary> */ }
  {/*             <ul> */ }
  {/*               <li><Link href="/about-the-site">about the site</Link></li> */ }
  {/*               <li><Link href="/guestbook">guestbook</Link></li> */ }
  {/*               <li><Link href="/colophon">colophon</Link></li> */ }
  {/*               <li><Link href="/sitemap">sitemap</Link></li> */ }
  {/*             </ul> */ }
  {/*           </details> */ }
  {/*         </li> */ }
  {/*         <li> */ }
  {/*           <details id="menu-byme"> */ }
  {/*             <summary>made by me <small>(4)</small></summary> */ }
  {/*             <ul> */ }
  {/*               <li><Link href="/snippets">code snippets</Link></li> */ }
  {/*               <li><Link href="/projects">projects</Link></li> */ }
  {/*               <li><Link href="/writing">writing</Link></li> */ }
  {/*               <li><Link href="/playlists">playlists</Link></li> */ }
  {/*             </ul> */ }
  {/*           </details> */ }
  {/*         </li> */ }
  {/*         <li> */ }
  {/*           <details id="menu-mediarecs"> */ }
  {/*             <summary>media recs <small>(3)</small></summary> */ }
  {/*             <ul> */ }
  {/*               <li><Link href="/recs/tv-shows" aria-label="tv show recommendations">television</Link></li> */ }
  {/*               <li><Link href="/recs/books" aria-label="book recommendations">books</Link></li> */ }
  {/*               <li><Link href="/recs/music" aria-label="music recommendations">music</Link></li> */ }
  {/*             </ul> */ }
  {/*           </details> */ }
  {/*         </li> */ }
  {/*         <li> */ }
  {/*           <details id="menu-resources"> */ }
  {/*             <summary>resources for you <small>(2)</small></summary> */ }
  {/*             <ul> */ }
  {/*               <li><Link href="/bookmarks">bookmarks</Link></li> */ }
  {/*               <li><Link href="/resources">web resources</Link></li> */ }
  {/*             </ul> */ }
  {/*           </details> */ }
  {/*         </li> */ }
  {/*         <li> */ }
  {/*           <details id="menu-more"> */ }
  {/*             <summary>fun things <small>(4)</small></summary> */ }
  {/*             <ul> */ }
  {/*               <li><Link href="/blog">blog</Link></li> */ }
  {/*               <li><Link href="/shrines">shrines</Link></li> */ }
  {/*               <li><Link href="/cliques">cliques</Link></li> */ }
  {/*               <li><Link href="/quizzes-and-polls">quizzes & polls</Link></li> */ }
  {/*             </ul> */ }
  {/*           </details> */ }
  {/*         </li> */ }
  {/*         <li> */ }
  {/*           <details id="menu-webprincess"> */ }
  {/*             <summary>for webprincesses <small>(15)</small></summary> */ }
  {/*             <div className="aside-scrollbox custom-scrollbar"> */ }
  {/*               <strong>tools:</strong> */ }
  {/*               <ul> */ }
  {/*                 <li><Link href="/coding/layouts">layouts</Link></li> */ }
  {/*                 <li><Link href="/coding/widgets">widgets</Link></li> */ }
  {/*                 <li><Link href="/coding/cheatsheet">cheatsheet</Link></li> */ }
  {/*               </ul> */ }
  {/*               <strong>guides:</strong> */ }
  {/*               <ul> */ }
  {/*                 <li><Link href="/coding/make-a-website">make your own site</Link></li> */ }
  {/*                 <li><Link href="/coding/common-questions">common questions</Link></li> */ }
  {/*                 <li><Link href="/coding/common-mistakes">common mistakes</Link></li> */ }
  {/*                 <li><Link href="/coding/snippets">snippets</Link></li> */ }
  {/*                 <li><Link href="/coding/troubleshooting">troubleshooting</Link></li> */ }
  {/*                 <li><Link href="/coding/code-quality">code quality</Link></li> */ }
  {/*                 <li><Link href="/coding/now-what">further learning</Link></li> */ }
  {/*               </ul> */ }
  {/*               <strong>other:</strong> */ }
  {/*               <ul> */ }
  {/*                 <li><Link href="/coding/my-environment">my coding environment</Link></li> */ }
  {/*               </ul> */ }
  {/*             </div> */ }
  {/*           </details> */ }
  {/*         </li> */ }
  {/*       </ul> */ }
  {/*     </nav> */ }
  {/*     <div className="aside-dreamland desktop-only"> */ }
  {/*       <Image src={stardivider} width={stardivider.width} height={stardivider.height} alt="" /> */ }
  {/*       <div className="aside-stuff aside-changelog"> */ }
  {/*         <div className="aside-stuff__heading" aria-hidden="true">Changelog <Image src={pinksparkle} alt='' aria-hidden='true' /></div> */ }
  {/*         <ul className="changelog custom-scrollbar" aria-label="Changelog"> */ }
  {/*           {recentLogs.map((log) => ( */ }
  {/*             <li key={log.databaseId} className="changelog__entry"> */ }
  {/*               <strong><Date dateString={log.date} /></strong> */ }
  {/*               <div dangerouslySetInnerHTML={{ __html: log.intro }} /> */ }
  {/*             </li> */ }
  {/*           ))} */ }
  {/*         </ul> */ }
  {/*       </div> */ }
  {/*       <div className="aside-stuff aside-link-back"> */ }
  {/*         <div className="aside-stuff__heading">Share a link! <Image src={pinksparkle} alt='' aria-hidden='true' /></div> */ }
  {/*         <p>Feel free to hotlink!</p> */ }
  {/*         <Link href="/" target="_blank"> */ }
  {/*           <Image src={rainbowButton} tabIndex={-1} alt="secret gardens" width={88} height={31} /> */ }
  {/*         </Link> */ }
  {/*         {<div dangerouslySetInnerHTML={{ __html: `<textarea className="code-textarea" name="" id="" rows={10} aria-label="link-back code"><a href='https://secretgardens.meaganwaller.com' target='_blank'><img src='#' alt='secret gardens' width='88' height='31' /></a></textarea>` }} />} */ }
  {/*       </div> */ }
  {/*       <Image src={stardivider} width={stardivider.width} height={stardivider.height} alt="" style={{ marginTop: '2em' }} /> */ }
  {/*       <div className='aside-stuff aside-poll' aria-hidden='true'> */ }
  {/*         <div className='aside-stuff__heading' aria-hidden='true'>Poll</div> */ }
  {/*         <center><small>(all polls <Link href="/quizzes-and-polls">here</Link>)</small></center> */ }
  {/*       </div> */ }
  {/*       <Image src={stardivider} width={stardivider.width} height={stardivider.height} alt="" style={{ marginTop: '5px' }} /> */ }
  {/*       <div className='aside-stuff aside-blinkies' aria-hidden="true"> */ }
  {/*         <ButtonMarquee /> */ }
  {/*       </div> */ }
  {/*       <Image src={stardivider} width={stardivider.width} height={stardivider.height} alt="" style={{ marginTop: '5px' }} /> */ }
  {/*     </div> */ }
  {/*   </aside > */ }
  {/*   <aside className="aside aside--right desktop-only"> */ }
  {/*     <div className="aside-stuff"> */ }
  {/*     </div> */ }
  {/*   </aside> */ }
  {/* </div > */ }


  return (
    <main id="content">
      <section className='welcome-content'>
        <div className='index-welcome-grid'>
          <div id='index-welcome-main'>
            <div className='welcome-content'>
              <h2>welcome to my secret gardens</h2>
              <Image src={glitterkitty} alt="" height={170} />
              <div dangerouslySetInnerHTML={{ __html: homepage.title }} />
              <div dangerouslySetInnerHTML={{ __html: homepage.contentParts.beforeMore }} />
              <Image src={stardivider} width={stardivider.width} height={stardivider.height} alt="" />
              <div dangerouslySetInnerHTML={{ __html: homepage.contentParts.afterMore }} />
            </div>
          </div>
          <div id='status-container'>
            <div id='statuscafe'>
              <div id='statuscafe-username' /><div id='statuscafe-content' />
            </div>
            <Script src='https://status.cafe/current-status.js?name=secretgardens' defer />
          </div>
          <LastFmData />
        </div>
      </section>
    </main>
  )
}


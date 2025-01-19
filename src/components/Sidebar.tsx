import Link from 'next/link';
import Image from 'next/image';
import pinksparkle from '~/images/bullets/pinksparkle.gif';
import SidebarNav from '@/components/SidebarNav';
import { WPMenu } from '@/types';

interface SidebarParams {
  menus: { title: string; menu: WPMenu }[];
}

export default function Sidebar({ menus }: SidebarParams) {
  return (
    <div id="sidebar" className="aside">
      <div className='sidebar-inner'>
        {menus.map((section, index) => (
          <div key={index}>
            <div className="section-tab">
              <Image src={pinksparkle} alt="" className="section-icon" />
              <div className="section-title">{section.title}</div>
            </div>
            <SidebarNav menu={section.menu} />
          </div>
        ))}

        <>
          <div className="section-tab">
            <Image src={pinksparkle} alt="" className="section-icon" />
            <div className="section-title">Around</div>
          </div>

          <nav>
            <span className="nav-link">
              <Link className="w-full block" href="https://app.thestorygraph.com/profile/itsonmyholdlist" target="_blank">
                Story Graph
              </Link>
            </span>
            <span className="nav-link">
              <Link className="w-full block" href="https://github.com/meaganewaller">
                GitHub
              </Link>
            </span>
          </nav>
        </>
      </div>
    </div>
  );
}

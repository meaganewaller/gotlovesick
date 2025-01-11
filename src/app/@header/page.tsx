import Link from 'next/link';
import HeaderTitle from '@/components/HeaderTitle';
import { fetchMenu, convertMenuToHierarchal } from '@/services/graphql'
import { MenuLocationEnum, WPMenu } from '@/types';
import { HeaderNav } from '@/components/HeaderNav';

/**
 * Header component.
 */
export default async function Header() {
  const headerMenu: WPMenu = await fetchMenu(MenuLocationEnum.Header);
  const converted = convertMenuToHierarchal(headerMenu.nodes);

  return (
    <>
      <header id="header">
        <div className="header-title">
          <Link href="/" className="">
            <HeaderTitle />
          </Link>
        </div>
      </header>
      <HeaderNav menu={converted} />
    </>
  );
}



import AccessCounter from '@/components/AccessCounter';
import Link from 'next/link';
import { fetchMenu } from '@/services/graphql';
import { MenuLocationEnum, WPMenu, WPMenuItem } from '@/types';

export default async function Footer() {
  const footerMenu: WPMenu = await fetchMenu(MenuLocationEnum.Footer);

  return (
    <footer>
      <section>
        <div>
          <p>
            &copy; 2024-{new Date().getFullYear()} - brought to you by{' '}
            <a href="https://meaganwaller.com" className="">
              Meagan Waller
            </a>
          </p>
          <AccessCounter />
        </div>

        {footerMenu.nodes.length > 0 && <ul className="footer-menu">
          {footerMenu.nodes.map((item: WPMenuItem) => (
            <li key={item.key}>
              <Link
                href={
                  item.path.startsWith('http') ? item.url : `${item.path || ''}`
                }>{item.title}</Link>
            </li>
          ))}
        </ul>}
      </section>
    </footer>
  );
}

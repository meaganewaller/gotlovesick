import AccessCounter from '@/components/AccessCounter';
import Link from 'next/link';
import { fetchMenu } from '@/services/graphql';
import { MenuLocationEnum } from '@/types';

export default async function Footer() {
  const footerMenu = await fetchMenu(MenuLocationEnum.Footer);

  if (footerMenu.nodes && footerMenu.nodes.length > 0) {
    return (
      <footer>
        <section>
          <p>
            &copy; 2024-{new Date().getFullYear()} - brought to you by{' '}
            <Link href="https://meaganwaller.com" className="">
              Meagan Waller
            </Link>
          </p>
          <AccessCounter />

          {footerMenu.nodes.length > 0 && (
            <ul className="footer-menu">
              {footerMenu.nodes.map((item) => (
                <li key={item.key}>
                  <Link
                    href={
                      item.path.startsWith('http')
                        ? item.url
                        : `${item.path || ''}`
                    }
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </footer>
    );
  }
}

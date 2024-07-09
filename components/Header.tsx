'use client';

import clsx from 'clsx';
import navMenuData from '@/data/nav-menu';
import Image from 'next/image';
import emblem from '@/public/emblem-yellow.png';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type MouseEvent
} from 'react';
import {
  HiArrowTopRightOnSquare,
  HiBars3,
  HiOutlineInformationCircle
} from 'react-icons/hi2';
import SuperLink from '@/components/links/standard';
import ActionlessModal from '@/components/revealers/actionless-modal';
import VisibilityToggler, {
  type VisibilityTogglerHandle
} from '@/components/revealers/visibility-toggler';
import { useOutsideClick, useToggleOnScroll } from '@/utils/hooks';

interface NavMenuHandle {
  forceCloseSubmenus: () => void;
}

const NavMenu = forwardRef<
  NavMenuHandle,
  {
    onNavigation?: () => void;
    compact?: boolean;
    className?: string;
  }
>(function NavMenu({ onNavigation, compact, className }, ref) {
  const [openSubmenu, setOpenSubmenu] = useState<number>(-1);
  const navMenu = useRef<HTMLUListElement | null>(null);
  useOutsideClick([navMenu], () => (compact ? null : setOpenSubmenu(-1)));
  const handleNavigation = (e: MouseEvent<HTMLAnchorElement>) => {
    onNavigation?.();
    (e.target as HTMLAnchorElement).blur();
  };
  useImperativeHandle(ref, () => ({
    forceCloseSubmenus: () => setOpenSubmenu(-1)
  }));
  return (
    <ul ref={navMenu} className={clsx('menu flex-nowrap', className)}>
      {navMenuData.map((item, index) => (
        <li key={item[0] as string}>
          {typeof item[1] === 'string' ? (
            <SuperLink href={item[1]} onClick={handleNavigation}>
              {item[0]}
            </SuperLink>
          ) : (
            <details
              onClick={(e) => {
                e.preventDefault();
                if ((e.target as HTMLElement).tagName === 'SUMMARY') {
                  if (openSubmenu === index) {
                    setOpenSubmenu(-1);
                  } else {
                    setOpenSubmenu(index);
                  }
                }
              }}
              open={openSubmenu === index}
            >
              <summary className="pr-5">{item[0]}</summary>
              <ul className="nav:!mt-6 nav:bg-neutral">
                {item[1]!.map((link) => (
                  <li key={link[0]}>
                    <SuperLink href={link[1]} onClick={handleNavigation}>
                      {link[0]}
                    </SuperLink>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </li>
      ))}
      {compact && (
        <li>
          <SuperLink
            href="/Resume.pdf"
            toFile
            external
            className="flex items-center justify-between text-primary hover:bg-primary hover:text-primary-content focus:!text-primary active:!text-primary"
          >
            Resume
            <HiArrowTopRightOnSquare className="-mr-0.5 mb-px h-4 w-4" />
          </SuperLink>
        </li>
      )}
    </ul>
  );
});

export default function Header() {
  const showNavbar = useToggleOnScroll();
  const navMenuWide = useRef<NavMenuHandle | null>(null);
  const navMenuNarrow = useRef<NavMenuHandle | null>(null);
  useEffect(() => {
    if (!showNavbar) {
      toggler.current?.forceClose();
      navMenuWide.current?.forceCloseSubmenus();
      navMenuNarrow.current?.forceCloseSubmenus();
    }
  }, [showNavbar]);
  const firstModalLink = useRef<HTMLAnchorElement | null>(null);
  const toggler = useRef<VisibilityTogglerHandle | null>(null);
  return (
    <div
      className={clsx(
        'fixed left-0 top-0 z-20 flex w-full justify-center transition-transform duration-300',
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <header className="navbar m-5 max-w-6xl rounded-box bg-neutral shadow-md">
        <div className="mx-1 my-0.5 flex flex-1 flex-row items-center gap-2">
          <SuperLink href="/" className="btn btn-ghost px-2">
            <Image
              src={emblem}
              alt="Ludo's personal emblem. It consists of several horizontal lines, a backwards letter 'L', and a letter 'D'. Together, these form an iconographic representation of a bullet in flight."
              className="w-10"
            />
          </SuperLink>
          <ActionlessModal
            clickable={
              <HiOutlineInformationCircle className="btn btn-circle btn-ghost btn-xs h-6 w-6" />
            }
            title="Attribution and Copyright Information"
            firstLink={firstModalLink}
            cancelAnimation
          >
            <p>
              This{' '}
              <SuperLink
                ref={firstModalLink}
                href="https://github.com/LudoLogical/personal-website-v4"
                external
                styledText
              >
                open-source
              </SuperLink>{' '}
              website was built using Next.js, React, TypeScript, TailwindCSS,
              DaisyUI, MDX, and a handful of other open-source{' '}
              <SuperLink
                href="https://github.com/LudoLogical/personal-website-v4/blob/main/package.json"
                external
                styledText
              >
                packages
              </SuperLink>
              . It is being hosted free of charge on Vercel. Ludo&apos;s avatar
              was created by Karina Varughese.
            </p>
            <p>
              All other content was made with &#10084; by Daniel
              &quot;Ludo&quot; DeAnda. &copy; 2023, all rights reserved.
            </p>
          </ActionlessModal>
        </div>
        <div className="hidden flex-none nav:flex">
          <NavMenu ref={navMenuWide} className="menu-horizontal" />
          <SuperLink
            href="/Resume.pdf"
            toFile
            external
            className="btn btn-outline btn-primary mx-1"
          >
            Resume
            <HiArrowTopRightOnSquare className="mb-px h-4 w-4" />
          </SuperLink>
        </div>
        <div className="relative flex flex-none nav:hidden">
          <VisibilityToggler
            ref={toggler}
            IconWhenHidden={HiBars3}
            buttonClass="btn-ghost"
            className="absolute right-0 top-0 w-52 translate-x-2 translate-y-20 overflow-hidden rounded-box bg-neutral shadow-md"
          >
            <NavMenu
              ref={navMenuNarrow}
              onNavigation={() => toggler.current?.forceClose()}
              compact
              className="max-h-[calc(100vh-8rem)] overflow-y-auto"
            />
          </VisibilityToggler>
        </div>
      </header>
    </div>
  );
}

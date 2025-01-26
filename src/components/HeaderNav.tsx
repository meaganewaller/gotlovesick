import { MenuItem } from '@/types';
import Link from 'next/link';

type Menu = MenuItem[]

// Recursive function to render deeply nested menus
function renderNestedMenu(item: MenuItem) {
  return (
   <li className="dropdown" key={item.key}>
      <button
        type="button"
        className="dropdown__title"
        aria-expanded="false"
        aria-controls={`${item.title.toLowerCase().replace(/\s+/g, '-')}-dropdown`}
      >
        {item.title}
      </button>
      <ul
        className="dropdown__menu"
        id={`${item.title.toLowerCase().replace(/\s+/g, '-')}-dropdown`}
      >
        {item.children.map((child) =>
          child.children.length > 0 ? renderNestedMenu(child) : renderMenuItem(child)
        )}
      </ul>
    </li>
  )
}

// Function to render a single menu item (leaf node)
function renderMenuItem(item: MenuItem) {
  return (
    <li key={item.key}>
      <Link
        href={item.path && item.path.startsWith('http') ? item.url : `${item.path || ''}`}
        className="menu-item"
      >
        {item.title}
      </Link>
    </li>
  );
}


export function HeaderNav({ menu }: { menu: Menu }) {
  if (!menu || menu.length === 0) {
    return null
  }

  return (
    <nav aria-label="Main navigation">
      <ul>
        {menu.map((item) =>
          item.children.length > 0 ? renderNestedMenu(item) : renderMenuItem(item)
        )}
      </ul>
    </nav>
  )
}

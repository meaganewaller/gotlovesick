import Link from 'next/link';
import { MenuItem, NestedMenuItem } from '@/types'

export type Menu = (MenuItem | NestedMenuItem)[]

function dropdownMenu(nestedMenuItem: NestedMenuItem) {
  return (
    <li className="dropdown" key={nestedMenuItem.key}>
      <button
        type="button"
        className="dropdown__title"
        aria-expanded="false"
        aria-controls={`${nestedMenuItem.title.toLowerCase().replace(' ', '-')}-dropdown`}
      >
        {nestedMenuItem.title}
      </button>
      <ul className="dropdown__menu" id={`${nestedMenuItem.title.toLowerCase().replace(' ', '-')}-dropdown`}>
        {nestedMenuItem.children.map((item) => (
          <li key={item.key}>
            <Link href={item.path}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

export function HeaderNav({ menu }: { menu: Menu }) {
  if (!menu) {
    return null
  }

  return (
    <nav aria-label="Main navigation">
      <ul>
        {menu.map((item) => {
          if ('children' in item && item.children.length > 0) {
            return dropdownMenu(item)
          } else {
            return (
              <li key={item.key}>
                <Link
                  href={
                    item.path && item.path.startsWith('http') ? item.url : `${item.path || ''}`
                  }
                >
                  {item.title}
                </Link>
              </li>
            )
          }
        })}
      </ul>
    </nav>
  )
}


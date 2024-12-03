import getMenuBySlug from '@/lib/queries/getMenuBySlug'
import Link from 'next/link'

export default async function HeaderNav() {
  const menu = await getMenuBySlug('header')

  return (
    <nav className="flex justify-between gap-4">
      {!!menu &&
        menu.menuItems.edges.map((item) => (
          <Link key={item.node.databaseId} href={item.node.uri}>
            {item.node.label}
          </Link>
        ))}
    </nav>
  )
}

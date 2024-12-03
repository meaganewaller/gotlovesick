import getMenuBySlug from '@/lib/queries/getMenuBySlug'
import Link from 'next/link'
import bow from '~/images/bow.gif'
import Image from 'next/image'

export default async function Sidebar() {
  const sidebarMenu = await getMenuBySlug('sidebar')

  return (
    <nav className="py-4 px-0 select-none" id="sidebar">
      <span className="text-center text-xl leading-6 text-rose-600 w-full flex font-pixel justify-center gap-1">
        <Image src={bow} alt="" width={22} height={13} />
        Site
        <Image src={bow} alt="" width={22} height={13} />
      </span>
      {!!sidebarMenu &&
        sidebarMenu.menuItems.edges.map((item) => (
          <Link key={item.node.databaseId} href={item.node.uri}>
            {item.node.label}
          </Link>
        ))}
      <span className="text-center text-xl leading-6 text-rose-600 w-full flex font-pixel justify-center gap-1">
        <Image src={bow} alt="" width={22} height={13} />
        elsewhere
        <Image src={bow} alt="" width={22} height={13} />
      </span>
      <Link href="#">tiktok</Link>
      <Link href="#">storygraph</Link>
      <Link href="#">github</Link>
    </nav>
  )
}

import getMenuBySlug from '@/lib/queries/getMenuBySlug'
import Link from 'next/link'
import bow from '~/images/bow.gif'
import Image from 'next/image'
import SidebarNav from "@/components/SidebarNav"

interface SidebarParams {
  pageSlug: string
  menuSlug: string
}

export default async function Sidebar({ pageSlug, menuSlug }: SidebarParams) {
  const menu = await getMenuBySlug(menuSlug)

  return (
    <nav className="py-4 px-0 select-none" id="sidebar">
      <span className="text-center text-xl leading-6 text-rose-600 w-full flex font-pixel justify-center gap-1 lowercase">
        <Image src={bow} alt="" width={bow.width} height={bow.height} />
        Menu
        <Image src={bow} alt="" width={bow.width} height={bow.height} />
      </span>
      <SidebarNav menu={menu} pageSlug={pageSlug} />
      <span className="text-center text-xl leading-6 text-rose-600 w-full flex font-pixel justify-center gap-1 lowercase">
        <Image src={bow} alt="" width={bow.width} height={bow.height} />
        Elsewhere
        <Image src={bow} alt="" width={bow.width} height={bow.height} />
      </span>
      <Link href="#">tiktok</Link>
      <Link href="#">storygraph</Link>
      <Link href="#">github</Link>
    </nav>
  )
}

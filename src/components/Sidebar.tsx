import Link from 'next/link'
import bow from '~/images/bow.gif'
import Image from 'next/image'
import SidebarNav from "@/components/SidebarNav"
import { Menu } from "@/lib/types"

interface SidebarParams {
  pageSlug: string
  menu: Menu
}

export default function Sidebar({ pageSlug, menu }: SidebarParams) {
  if (pageSlug === "bookmarks") {
    pageSlug = "collections"
  }
  return (
    <nav className="py-4 px-0 select-none" id="sidebar">
      <span className="text-center text-xl leading-6 text-rose-600 w-full flex font-pixel justify-center gap-1 lowercase">
        <Image src={bow} alt="" width={bow.width} height={bow.height} />
        {pageSlug}
        <Image src={bow} alt="" width={bow.width} height={bow.height} />
      </span>
      <SidebarNav menu={menu} pageSlug={pageSlug} />
      {pageSlug === "homepage" && (
        <>
          <span className="text-center text-xl leading-6 text-rose-600 w-full flex font-pixel justify-center gap-1 lowercase">
            <Image src={bow} alt="" width={bow.width} height={bow.height} />
            Elsewhere
            <Image src={bow} alt="" width={bow.width} height={bow.height} />
          </span>

          <Link href="#">tiktok</Link>
          <Link href="#">storygraph</Link>
          <Link href="#">github</Link>
        </>
      )}
    </nav>
  )
}

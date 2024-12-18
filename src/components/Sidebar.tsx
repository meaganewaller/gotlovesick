import Link from 'next/link'
import rainbowLeft from '@/assets/images/bullets/rainbow-left.gif'
import rainbowRight from '@/assets/images/bullets/rainbow-right.gif'
import Image from 'next/image'
import SidebarNav from "@/components/SidebarNav"
import { Menu } from "@/lib/types"

interface SidebarParams {
  pageSlug: string
  menu: Menu
}

export default function Sidebar({ pageSlug, menu }: SidebarParams) {
  return (
    <nav className="py-4 px-0 select-none" id="sidebar">
      <span className="text-center text-xl w-full flex items-center content-center justify-center gap-1 lowercase">
        <Image src={rainbowLeft} alt="" className="w-[19px] h-3" />
        Links
        <Image src={rainbowRight} alt="" className="w-[19px] h-3" />
      </span>
      <SidebarNav menu={menu} pageSlug={pageSlug} />
      {pageSlug === "homepage" && (
        <>
          <span className="text-center text-xl w-full flex items-center content-center justify-center gap-1 lowercase">
            <Image src={rainbowLeft} alt="" className="w-[19px] h-3" />
            Elsewhere
            <Image src={rainbowRight} alt="" className="w-[19px] h-3" />
          </span>

          <Link href="#">tiktok</Link>
          <Link href="#">storygraph</Link>
          <Link href="#">github</Link>
        </>
      )}
    </nav>
  )
}

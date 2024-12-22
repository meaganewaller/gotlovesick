import Link from 'next/link'
import type { WPMenu, WPMenuItem } from "@/types"

interface SidebarNavParams {
  menu: WPMenu,
}

export default function SidebarNav(params: SidebarNavParams) {
  return (
    <>
      {params.menu && params.menu.nodes.map((item: WPMenuItem) => (
        <Link
          key={item.key}
          href={item.path}
        >
          {item.title}
        </Link>
      ))}
    </>
  )
}

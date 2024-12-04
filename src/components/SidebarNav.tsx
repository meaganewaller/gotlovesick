'use client'

import { cn } from "@/lib/utils"
import Link from 'next/link'
import { type Menu } from "@/lib/types"

interface SidebarNavParams {
  menu: Menu
  pageSlug: string
}

export default async function SidebarNav(params: SidebarNavParams) {
  console.log("params:", params)
  return (
    <>
      {!!params.menu && params.menu.menuItems.nodes.map((item) => (
        <Link key={item.databaseId} href={item.uri} className={cn({ 'active-sidebar-link': item.uri.includes(params.pageSlug) })}>
          {item.label}
        </Link>
      ))}
    </>
  )
}

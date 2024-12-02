import getAllPages from "@/lib/queries/getAllPages";
import getPageBySlug from "@/lib/queries/getPageBySlug";
import { Page } from "@/lib/types";
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const pages = await getAllPages()

  if (!pages) {
    return []
  }

  // Return the slug for each page.
  return pages.map((page: { slug: string }) => ({
    slug: page.slug
  }))
}

export default async function TopLevelPage({ params }: { params: { slug: string } }) {
  // attempt fetch of page from Wordpress.
  const page = await getPageBySlug(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <div layout="lg-column" self="size-x1">
      <div self="size-x1">
      </div>
      <div self="size-x3 sm-first">
        <header>
          <h2 dangerouslySetInnerHTML={{ __html: page.title }} />
        </header>
        <div id="page-container" dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </div>
  )
}

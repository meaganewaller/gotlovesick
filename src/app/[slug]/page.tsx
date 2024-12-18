import { getAllPosts } from "@/lib/queries/Posts";
import { getAllBookmarks } from "@/lib/queries/Bookmarks";
import { getPageBySlug } from "@/lib/queries/Pages";
import { Page, Post, Bookmark, Menu, Project, Shrine } from "@/lib/types"
import Link from "next/link"
import Sidebar from "@/components/Sidebar";
import getMenuBySlug from "@/lib/queries/getMenuBySlug";
import rainbow from "@/assets/images/rainbow.gif";
import Image from "next/image"
import { getAllShrines } from "@/lib/queries/Shrines";
import { getAllProjects } from "@/lib/queries/Projects";
import { notFound } from "next/navigation";

async function fetchData(slug: string) {
  if (slug === "blog") {
    return { content: await getAllPosts(), context: 'blog', menu: await getMenuBySlug("blog") }
  }

  if (slug === "bookmarks") {
    return { content: await getAllBookmarks(), context: "bookmarks", menu: await getMenuBySlug("sidebar") }
  }

  if (slug === "shrines") {
    return { content: await getAllShrines(), context: "shrines", menu: await getMenuBySlug("sidebar") }
  }

  if (slug === "projects") {
    return { content: await getAllProjects(), context: "projects", menu: await getMenuBySlug("sidebar") }
  }

  const page = await getPageBySlug(slug)
  const menu = await getMenuBySlug("sidebar")

  if (page) {
    return { page: page, menu: menu }
  }

  return { error: "No data found" }
}

function RenderPage({ page, menu }: { page: Page, menu: Menu }) {
  return (
    <div layout="lg-column" self="size-x1">
      <div self="size-x1">
        <Sidebar pageSlug={page.slug} menu={menu} />
        <Image src={rainbow} width={240} height={240} alt="" className="mx-auto" />
      </div>
      <div self="size-x3 sm-first" className="bg-fuchsia-100 border-fuchsia-600 border-solid border-2 max-h-[65vh] overflow-scroll">
        <h1 dangerouslySetInnerHTML={{ __html: page.title }} />
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </div>
  )
}

interface ContentListParams {
  content: Post[] | Bookmark[] | Project[] | Shrine[];
  context: string
  menu: Menu
}

function RenderContentList({ content, context, menu }: ContentListParams) {
  return (
    <div layout="lg-column" self="size-x1">
      <div self="size-x1">
        <Sidebar pageSlug={context} menu={menu} />
        <Image src={rainbow} width={240} height={240} alt="" className="mx-auto" />
      </div>
      <div self="size-x3 sm-first" className="bg-fuchsia-100 border-fuchsia-600 border-solid border-2 max-h-[65vh] overflow-scroll">
        <main className="flex flex-col gap-8">
          <h1 className="capitalize">The {context} page</h1>
          <div className="flex flex-wrap gap-8">
            {content.map((content: Post | Bookmark | Project | Shrine) => (
              <article className="w-72" key={content.databaseId}>
                <Image alt={content.featuredImage.node.altText}
                  height={content.featuredImage.node.mediaDetails.height}
                  src={content.featuredImage.node.sourceUrl}
                  width={content.featuredImage.node.mediaDetails.width}
                  priority={true}
                />
                <Link href={`/${context}/${content.slug}`}>

                  <h2 dangerouslySetInnerHTML={{ __html: content.title }} />
                </Link>
                <Link className="button" href={`/${context}/${content.slug}`}>
                  See more
                </Link>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default async function Archive({ params }: { params: { slug: string } }) {
  const { slug } = params

  const data = await fetchData(slug)

  if (data.error) {
    notFound()
  }

  if (data.page) {
    return <RenderPage page={data.page} menu={data.menu} />
  }

  if (data.content && data.content.length > 0) {
    return <RenderContentList content={data.content} context={data.context} menu={data.menu} />
  }

  notFound();
}

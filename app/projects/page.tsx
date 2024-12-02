import getAllProjects from '@/lib/queries/getAllProjects'
import getProjectBySlug from '@/lib/queries/getPageBySlug'
import { Post } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

export default async function ProjectsPage() {
  // Fetch posts from WordPress.
  const projects = await getAllProjects()

  return (
    <main layout="lg-column" self="size-x1">
      <div self="size-x1" className="mr-20">
        <h1 className='text-center text-lg bg-lime-300 border-lime-500 border-2 uppercase text-lime-700'>Menu</h1>
      </div>
      <div self="size-x3 sm-first">
        <article>
          <h1>Projects</h1>
        </article>

        <aside>
          <h2>Latest Projects</h2>
          <div className="flex flex-wrap gap-8">
            {projects.map((project: Post) => (
              <article className="w-72" key={project.databaseId}>
                <Image
                  alt={project.featuredImage.node.altText}
                  height={project.featuredImage.node.mediaDetails.height}
                  src={project.featuredImage.node.sourceUrl}
                  width={project.featuredImage.node.mediaDetails.width}
                  priority={true}
                />
                <Link href={`/projects/${project.slug}`}>
                  <h2 dangerouslySetInnerHTML={{ __html: project.title }} />
                </Link>
                <p className="text-sm">{project.commentCount} Comments</p>
                <div dangerouslySetInnerHTML={{ __html: project.excerpt }} />
                <Link className="button" href={`/blog/${project.slug}`}>
                  View Project
                </Link>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )
}

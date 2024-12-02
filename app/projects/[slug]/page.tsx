import CommentForm from '@/components/CommentForm'
import getAllProjects from '@/lib/queries/getAllProjects'
import getProjectBySlug from '@/lib/queries/getProjectBySlug'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

/**
 * Generate the static routes at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  // Get all projects
  const projects = await getAllProjects()

  // No projects? Bail...
  if (!projects) {
    return []
  }

  // Return the slugs for each project
  return projects.map((project: { slug: string }) => ({
    slug: project.slug
  }))
}

/**
 * Generate the metadata for each static route at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata | null> {
  // Get the project
  const project = await getProjectBySlug(params.slug)

  // No project? Bail...
  if (!project) {
    return {}
  }

  return {
    title: project.seo.title,
    description: project.seo.metaDesc
  }
}

/**
 * The blog project route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function Project({ params }: { params: { slug: string } }) {
  // Fetch a single project from WordPress.
  const project = await getProjectBySlug(params.slug)

  // No project? Bail...
  if (!project) {
    notFound()
  }

  return (
    <div layout="lg-column" self="size-x1">
      <div self="size-x1">
      </div>
      <div self="size-x3 sm-first">
        <header>
          <h2 dangerouslySetInnerHTML={{ __html: project.title }} />
        </header>
        <div id="project-container" dangerouslySetInnerHTML={{ __html: project.content }} />
        <hr className="border-pink-500 my-10" />
        <section>
          <h3>Comments</h3>
          {project.comments.nodes.map((comment) => (
            <article key={comment.databaseId}>
              <header className="flex items-center gap-2">
                <img
                  alt={comment.author.node.name}
                  className="m-0 rounded-full"
                  height={64}
                  loading="lazy"
                  src={comment.author.node.avatar.url}
                  width={64}
                />
                <div className="flex flex-col gap-2">
                  <h4
                    className="m-0 p-0 leading-none"
                    dangerouslySetInnerHTML={{ __html: comment.author.node.name }}
                  />
                  <time className="italic">{comment.date}</time>
                </div>
              </header>
              <div dangerouslySetInnerHTML={{ __html: comment.content }} />
            </article>
          ))}
        </section>
        <hr className="border-pink-500 my-10" />
        <CommentForm postID={project.databaseId} />
      </div>
    </div>
  )
}

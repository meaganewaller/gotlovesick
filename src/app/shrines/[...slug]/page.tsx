import { fetchShrine } from '@/services/graphql'
import { notFound } from 'next/navigation'
import { WPShrine } from '@/types'
import Link from 'next/link'

async function fetchData(slug: string) {
  const shrine = await fetchShrine(slug)

  if (shrine) {
    return { shrine: shrine }
  }

  return { error: "No data found" }
}

function RenderPage({ shrine }: { shrine: WPShrine }) {
  return (
    <div id='shrine-page'> <nav className='shrine-nav'>
      {shrine.shrineDetails?.sidebar?.nodes.map((node) => (
        <div className='shrine-nav-item' key={node.id}>
          <div className='shrine-nav-title'>
            <Link href={node.uri}>
              {node.title}
            </Link>
          </div>
        </div>
      ))}
    </nav>
      <div className='shrine-layout'>

        <section className="" id='page-content'>
          <ol className='breadcrumbs' aria-label='Breadcrumb'>
            {shrine.seo?.breadcrumbs?.map((breadcrumb) => {
              if (breadcrumb.text === shrine.title) {
                return (
                  <li key={breadcrumb.url} aria-current="page">
                    {breadcrumb.text}
                  </li>
                )
              } else {
                return (
                  <li key={breadcrumb.url}>
                    <Link href={getPathFromUrl(breadcrumb.url)}>
                      {breadcrumb.text}
                    </Link>
                  </li>
                )
              }
            })}
          </ol>
          <aside className='left-sidebar'>
            <nav>
              <div className='sidebar-title'>Menu</div>
              <ul>
                {shrine.shrineDetails?.sidebar?.nodes.map((node) => (
                  <li key={node.id}>
                    <a href={`${node.uri}`}>
                      {node.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main id="shrine">
            <section>
              <h1 dangerouslySetInnerHTML={{ __html: shrine.title }} />
              <div dangerouslySetInnerHTML={{ __html: shrine.content }} />
            </section>

            {shrine.shrineDetails?.featuredSections?.map((section) => (
              <section key={section.title} className='featured-section'>
                <h2>{section.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </section>
            ))}
          </main>
        </section>
      </div>
    </div>
  )
}

function getPathFromUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname;
  } catch (e) {
    console.error("Invalid URL:", url);
    return url;
  }
}

export default async function Archive(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const { slug } = params

  const length = slug.length

  if (length < 1) {
    return notFound()
  }

  if (length === 1) {
    const data = await fetchData(slug[0])

    if (data.error) {
      return notFound()
    }

    if (data.shrine) {
      return <RenderPage shrine={data.shrine} />
    }

    return notFound()
  }

  if (length > 1) {
    const withoutFirst = slug.slice(1)
    const data = await fetchData(withoutFirst.join('/'))

    if (data.error) {
      return notFound()
    }

    if (data.shrine) {
      return <RenderPage shrine={data.shrine} />
    }

    return notFound
  }

  return notFound()
}

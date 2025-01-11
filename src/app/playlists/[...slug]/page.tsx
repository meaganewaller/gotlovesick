import { fetchPlaylist } from '@/services/graphql'
import { notFound } from 'next/navigation'
import { WPPlaylist } from '@/types'
import '@/styles/playlist.css'
import { Breadcrumbs } from '@/components/Breadcrumbs'

async function fetchData(slug: string) {
  let playlist = undefined

  playlist = await fetchPlaylist(slug)

  if (playlist) {
    return { playlist: playlist }
  }

  return { error: 'No data found' }
}

function RenderPage({ playlist }: { playlist: WPPlaylist }) {
  return (
    <main id="playlist-page">
      <div className="playlist-layout">
        <section className="" id="page-content">
          {playlist.seo?.breadcrumbs && <Breadcrumbs breadcrumbs={playlist.seo?.breadcrumbs} />}

          <main id="playlist">
            <section>
              <h1 dangerouslySetInnerHTML={{ __html: playlist.title }} />

            </section>

            {playlist.playlistDetails?.featuredSections?.map((section) => (
              <section key={section.title} className="featured-section">
                <h2>{section.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </section>
            ))}

            <div dangerouslySetInnerHTML={{ __html: playlist.content }} />
          </main>
        </section>
      </div>
    </main>
  )
}

export default async function Archive(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const { slug } = params;

  const length = slug.length;

  if (length < 1) {
    return notFound();
  }

  if (length === 1) {
    const data = await fetchData(slug[0]);

    if (data.error) {
      return notFound();
    }

    if (data.playlist) {
      return <RenderPage playlist={data.playlist} />;
    }

    return notFound();
  }

  if (length > 1) {
    const withoutFirst = slug.slice(1);
    const data = await fetchData(withoutFirst.join('/'));

    if (data.error) {
      return notFound();
    }

    if (data.playlist) {
      return <RenderPage playlist={data.playlist} />;
    }

    return notFound;
  }

  return notFound();
}




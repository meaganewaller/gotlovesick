import { fetchPlaylist } from '@/services/graphql'
import { notFound } from 'next/navigation'
import { WPPlaylist } from '@/types'
import '@/styles/playlist.css'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Cassette } from "@/components/playlists"

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
      <div className="" id="playlist-content">
        {playlist.seo?.breadcrumbs && <Breadcrumbs breadcrumbs={playlist.seo?.breadcrumbs} />}

        <div id="playlist">
          <Cassette playlist={playlist} />
        </div>
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




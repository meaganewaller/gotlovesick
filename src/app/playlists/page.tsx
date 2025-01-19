import { fetchAllPlaylists } from "@/services/graphql"
import Link from "next/link"
import { notFound } from 'next/navigation'
import "@/styles/playlist.css";

async function fetchPlaylists() {
  const playlists = await fetchAllPlaylists({ first: 25 })

  if (!playlists) {
    return { error: 'No playlists found' }
  }

  return { playlists }
}

export default async function PlaylistsPage() {
  const data = await fetchPlaylists()

  if (data.error) {
    return notFound()
  }

  if (data.playlists) {
    return (
      <main id="playlists-page">
        <section className="playlists">
          <h1>Playlists</h1>

          <ul>
            {data.playlists.nodes.map((playlist) => (
              <li key={playlist.id}>
                <Link href={`/playlists/${playlist.slug}`}>
                  {playlist.title}
                </Link>
              </li>
            ))}
          </ul>

        </section>
      </main>
    )
  } else {
    return (
      <main id="playlists-page">
        <section className="playlists">
          <h1>Playlists</h1>

          <div className="empty-state">
            <h3>No playlists found</h3>
            <p>There are no playlists yet, they&apos;re coming soon.</p>
          </div>
        </section>
      </main>
    )
  }
}

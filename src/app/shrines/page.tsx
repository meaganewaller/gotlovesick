import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchAllShrines } from '@/services/graphql';
import "@/styles/pages/shrines.css";
import Image from 'next/image';

async function fetchShrines() {
  const shrines = await fetchAllShrines()

  if (!shrines) {
    return { error: 'No shrines found' }
  }

  return { shrines }
}

export default async function ShrinesPage() {
  const data = await fetchShrines();

  if (data.error) {
    return notFound();
  }

  if (data.shrines) {
    return (
      <main id="shrines-page">
        <div className="shrine-container">
          <div className="shrine-header">
            <div className="about-section">
              <h1>Shrines</h1>
              <p>
                Welcome to my shrine space! 💅<br />
                Here, I’ve carved out spaces for the things I care about most, so they can stop living rent-free in my head and start living reasonably-priced on the web.
              </p>
            </div>
          </div>

          <section className="shrine-section">
            <div className="shrine-cards">
              {data.shrines.nodes.map((shrine) => (
                <div key={shrine.id} className="shrine-card">
                  {shrine.shrineDetails?.headerImage ? (
                    <Image
                      src={shrine.shrineDetails.headerImage.node.sourceUrl}
                      alt={shrine.shrineDetails.headerImage.node.altText || ''}
                      width={shrine.shrineDetails.headerImage.node.mediaDetails.width}
                      height={shrine.shrineDetails.headerImage.node.mediaDetails.height}
                    />
                  ) : (
                    <div className="placeholder-image">No Image</div>
                  )}
                  <div className='shrine-info'>
                    <h3>{shrine.title}</h3>
                    <span className='shrine-status'>Status: {shrine.shrineDetails?.status || "Unknown"}</span>
                    <p>{shrine.shrineDetails?.shortDescription || "No description available."}</p>
                    <Link href={`/shrines/${shrine.slug}`} className="shrine-link">Explore Shrine</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    );
  }

  return notFound();
}

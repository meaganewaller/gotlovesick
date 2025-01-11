import { notFound } from 'next/navigation';
import { fetchAllShrines } from '@/services/graphql';

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
        <section className="shrines">
          <h1>Shrines</h1>
          <ul>
            {data.shrines.nodes.map((shrine) => (
              <li key={shrine.id}>
                <a href={`/shrines/${shrine.slug}`}>{shrine.title}</a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    );
  }

  return notFound();
}

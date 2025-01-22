import { notFound } from 'next/navigation'
import { Poll } from '@/components/Poll'
import '@/styles/polls.css'

export default async function Archive(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const { slug } = params;

  if (slug.length !== 1) {
    return notFound();
  }

  return (
    <main id="poll-page">
      <Poll slug={slug[0]} />
    </main>
  )
}

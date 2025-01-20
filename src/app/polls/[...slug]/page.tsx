import { notFound } from 'next/navigation'
import { Poll } from '@/components/Poll'

export default async function Archive(props: { params: { slug: string[] } }) {
  const { slug } = props.params;

  if (slug.length !== 1) {
    return notFound();
  }

  return <Poll slug={slug[0]} />
}

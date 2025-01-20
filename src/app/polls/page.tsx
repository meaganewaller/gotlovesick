import { notFound } from 'next/navigation'
import Link from 'next/link'
import { fetchAllPolls } from '@/services/graphql'
import '@/styles/polls.css';
import Image from 'next/image';
import { WPPollLtd } from '@/types';

async function fetchPolls() {
  const polls = await fetchAllPolls()

  if (!polls) {
    return { error: 'No polls found' }
  }

  return { polls }
}

export default async function PollsPage() {
  const data = await fetchPolls();

  if (data.error) {
    return notFound();
  }

  if (data.polls) {
    return (
      <main id="polls-page">
      <div className="poll-container">
      <div className="poll-header">
      <div className="about-section">
      <h1>Polls</h1>
      <p>Polls live here</p>
      </div>
      </div>

      <section className="poll-section">
      <div className="poll-cards">
      {data.polls.nodes.map((poll: WPPollLtd) => (
        <div key={poll.key} className="poll-card">
          {poll.featuredImage?.node ? (
            <Image
              src={poll.featuredImage.node.sourceUrl}
              alt={poll.featuredImage.node.altText || ''}
              width={poll.featuredImage.node.mediaDetails.width}
              height={poll.featuredImage.node.mediaDetails.height}
            />
          ) : <></>}
          <h2>
            <Link href={poll.uri}>{poll.title}</Link>
          </h2>
        </div>
      ))}
      </div>
      </section>
      </div>
      </main>
    )
  }

  return notFound()
}

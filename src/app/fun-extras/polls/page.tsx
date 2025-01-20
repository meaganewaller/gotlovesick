import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchAllPolls } from '@/services/graphql';
import '@/styles/polls.css';
import Image from 'next/image';
// import { WPPoll } from '@/types';

async function fetchPolls() {
  const polls = await fetchAllPolls();

  if (!polls) {
    return { error: 'No polls found' };
  }

  return { polls };
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

              {data.polls.nodes.map((poll: WPPoll) => {
                return (
                  <div key={poll.key}>
                  {
                    poll.featuredImage &&
                      <Image src={poll.featuredImage.node.sourceUrl} alt={poll.featuredImage.node.altText || ''}  width={poll.featuredImage.node.mediaDetails.width} height={poll.featuredImage.node.mediaDetails.height} />
                  }
                    <Link href={poll.link}>{poll.title}</Link>
                    <p>{poll.pollFields.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return notFound();
}


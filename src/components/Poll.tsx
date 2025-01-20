'use client'

import { WPPoll } from '@/types'
import { fetchPoll, castVote } from '@/services/graphql'
import { useState, useEffect } from 'react'

export function Poll({ slug }: { slug: string }) {
  const [poll, setPoll] = useState<WPPoll | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
     const fetchData = async () => {
      try {
        const fetchedPoll = await fetchPoll(slug);
        if (fetchedPoll) {
          setPoll(fetchedPoll);
          const initialVotes = fetchedPoll.pollDetails.pollOptions.reduce(
            (acc: Record<string, number>, option: { id: string; votes: number }) => {
              acc[option.id] = option.votes || 0;
              return acc;
            },
            {}
          );
          setVotes(initialVotes);
        } else {
          setError('Poll not found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch poll');
      }
    };

    fetchData();
  }, [slug])

  const hasUserVoted = (pollId: string): boolean => {
    const lastVoted = localStorage.getItem(`poll-vote-${pollId}`);
    return false
    // if (!lastVoted) return false;
    //
    // const lastVotedDate = new Date(lastVoted)
    // const now = new Date()
    //
    // return now.toDateString() === lastVotedDate.toDateString()
  }

  const recordVote = (pollId: string) => {
    localStorage.setItem(`poll-vote-${pollId}`, new Date().toISOString());
  }

  const handleVote = async (pollId: string, optionId: string) => {
    if (hasUserVoted(pollId)) {
      alert('You have already voted for this poll today. Please come back tomorrow!')
      return
    }

    setLoading(optionId)
     try {
      await castVote({
        clientMutationId: `vote-${optionId}-${Date.now()}`,
        pollId,
        optionId,
      });

      recordVote(pollId);

      // Optimistically update the votes state
      setVotes((prevVotes) => ({
        ...prevVotes,
        [optionId]: prevVotes[optionId] + 1,
      }));
    } catch (err) {
      console.error('Error casting vote:', err);
      alert('Failed to cast vote. Please try again.');
    } finally {
      setLoading(null); // Reset loading state
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!poll) return <p>Loading poll...</p>;

   return (
    <main id="poll-page">
      <div className="poll-layout">
        <section id="page-content">
          <main id="quiz">
            <section>
              <h1 dangerouslySetInnerHTML={{ __html: poll.title }} />
              <div dangerouslySetInnerHTML={{ __html: poll.pollDetails.description }} />
            </section>

            {poll.pollDetails.pollOptions.map((option) => (
              <div key={option.id} className="poll-option">
                <p>
                  {option.body} <span>({votes[option.id]} votes)</span>
                  <button
                    onClick={() => handleVote(poll.key, option.id)}
                    disabled={loading === option.id}
                    className="vote-button"
                  >
                    {loading === option.id ? 'Submitting...' : 'Vote'}
                  </button>
                </p>
              </div>
            ))}
          </main>
        </section>
      </div>
    </main>
  );
}

export default Poll


'use client';

import { WPPoll } from '@/types';
import { fetchPoll, castVote } from '@/services/graphql';
import { useState, useEffect } from 'react';
import Loader from './loader';

export function Poll({ slug }: { slug: string }) {
  const [poll, setPoll] = useState<WPPoll | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

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

          const hasUserVoted = !!localStorage.getItem(`poll-vote-${slug}`)
          setHasVoted(hasUserVoted);
        } else {
          setError('Poll not found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch poll');
      }
    };

    fetchData();
  }, [slug]);

  const getTotalVotes = (): number => {
    return Object.values(votes).reduce((total, count) => total + count, 0);
  }

  const getVotePercentage = (optionId: string): number => {
    const totalVotes = getTotalVotes()
    if (totalVotes === 0) return 0;

    return Math.round((votes[optionId] / totalVotes) * 100);
  }

  const hasUserVoted = (pollSlug: string): boolean => {
    const lastVoted = localStorage.getItem(`poll-vote-${pollSlug}`);
    if (!lastVoted) return false;

    const lastVotedDate = new Date(lastVoted);
    const now = new Date();

    return now.toDateString() === lastVotedDate.toDateString();
  };

  const recordVote = (pollSlug: string) => {
    localStorage.setItem(`poll-vote-${pollSlug}`, new Date().toISOString());
    setHasVoted(true)
  };

  const handleVote = async (pollSlug: string, optionId: string) => {
    if (hasVoted) {
      alert('You have already voted for this poll.');
      return;
    }

    setLoading(optionId);
    try {
      await castVote({
        clientMutationId: `vote-${optionId}-${Date.now()}`,
        pollSlug,
        optionId,
      });

      recordVote(pollSlug);

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
  if (!poll) return <Loader />

  return (
    <div className="poll-container">
      <header className="header">
        <h1 className="poll-title" dangerouslySetInnerHTML={{ __html: poll.title }} />
        <div
          className="poll-description"
          dangerouslySetInnerHTML={{ __html: poll.pollDetails.description }}
        />
      </header>

      <ol className="poll-options">
        {poll.pollDetails.pollOptions.map((option) => {
          const votePercentage = Object.values(votes).reduce((total, count) => total + count, 0)
            ? Math.round((votes[option.id] / Object.values(votes).reduce((total, count) => total + count, 0)) * 100)
            : 0;

          return (
            <li key={option.id} className="poll-option">
              <div
                className="poll-option-bg"
                style={{ width: `${votePercentage}%` }}
              ></div>
              <div className="poll-option-content">
                <span>{option.body}</span>
                <span className="poll-option-votes">({votes[option.id]} votes)</span>
                <button
                  onClick={() => handleVote(poll.slug, option.id)}
                  disabled={hasVoted || loading === option.id}
                  className="poll-submit-button"
                >
                  {hasVoted ? 'Voted' : loading === option.id ? 'Submitting...' : 'Vote'}
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Poll;

import React from 'react';
import { notFound } from 'next/navigation';
import { fetchAllPolls } from '@/services/graphql';
import '@/styles/pages/polls.css';
import { Grid } from '@/components/polls';

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
        <div className="layout">
          <div className="header">
            <div className="about-section">
              <h1>Polls</h1>
              <p>Polls live here</p>
            </div>
          </div>

          <Grid items={data.polls.nodes} columnGutter={10} columnWidth={250} />
        </div>
      </main>
    );
  }

  return notFound();
}

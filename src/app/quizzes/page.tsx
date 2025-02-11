import React from 'react';
import { notFound } from 'next/navigation';
import { fetchAllQuizzes } from '@/services/graphql';
import '@/styles/pages/quizzes.css';

async function fetchQuizzes() {
  const quizzes = await fetchAllQuizzes();

  if (!quizzes) {
    return { error: 'No quizzes found' };
  }

  return { quizzes };
}

export default async function QuizzesPage() {
  const data = await fetchQuizzes();

  if (data.error) {
    return notFound();
  }

  if (data.quizzes) {
    return (
      <main id="quizzes-page">
        <div className="layout">
          <div className="header">
            <div className="about-section">
              <h1>Quizzes</h1>
              <p>quizzes live here</p>
            </div>
          </div>

          {/* <Grid items={data.quizzes.nodes} columnGutter={10} columnWidth={250} /> */}
        </div>
      </main>
    );
  }

  return notFound();
}

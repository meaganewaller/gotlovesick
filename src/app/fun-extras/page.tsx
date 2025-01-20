import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchAllFunExtras } from '@/services/graphql';
import '@/styles/quizzes.css';
import Image from 'next/image';
import { WPFunExtra, WPFunExtraType } from '@/types';
// import { WPQuiz } from '@/types';

async function fetchQuizzes() {
  const funExtraTypes = await fetchAllFunExtras();

  if (!funExtraTypes) {
    return { error: 'No quizzes found' };
  }

  return { funExtraTypes };
}

export default async function QuizzesPage() {
  const data = await fetchQuizzes();

  if (data.error) {
    return notFound();
  }

  if (data.funExtraTypes) {
    return (
      <main id="quizzes-page">
        <div className="quiz-container">
          <div className="quiz-header">
            <div className="about-section">
              {data.funExtraTypes.nodes.map((funExtraType: WPFunExtraType) => {
                return (
                  <div key={funExtraType.key}>
                    <h2>{funExtraType.name}</h2>
                    <span>{funExtraType.count} post(s)</span>
                    <p>{funExtraType.description}</p>

                    <ul>
                    {funExtraType.funExtras.nodes.map((funExtra: WPFunExtra) => (
                      <li key={funExtra.key}>
                        <Link href={funExtra.link}>{funExtra.title}</Link>
                      </li>
                    ))}
                    </ul>
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

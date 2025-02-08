import "@/styles/pages/landing.css";
import Script from 'next/script';
import {
  fetchPage,
  fetchRecentLogs,
  convertWPLogToLog
} from '@/services/graphql';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import stardivider from '~/images/dividers/bouncing-stars.gif';
import { LastFmData } from '@/components/LastFmData';

export default async function Home() {
  const homepage = await fetchPage('homepage');
  const fetchedLogs = await fetchRecentLogs({ first: 5 });
  const recentLogs = fetchedLogs.edges.map((edge) =>
    convertWPLogToLog(edge.node)
  );

  if (!homepage) {
    notFound();
  }

  return (
    <main id="content">
      <section className="welcome-content">
        <div className="index-welcome-grid">
          <div id="index-welcome-main">
            <div className="welcome-content">
              <h1 dangerouslySetInnerHTML={{ __html: homepage.title }} />
              <div
                className="welcome-content"
                dangerouslySetInnerHTML={{
                  __html: homepage.content
                }}
              />
              <figure>
                <Image
                  className="divider"
                  src={stardivider.src}
                  width={stardivider.width}
                  height={stardivider.height}
                  alt=""
                />
              </figure>
            </div>
          </div>
          <div id="status-container">
            <div id="statuscafe">
              <div className="inner">
                <span>status</span>
              </div>
              <div id="statuscafe-username" />
              <div id="statuscafe-content" />
            </div>
            <Script
              src="https://status.cafe/current-status.js?name=secretgardens"
              defer
            />
          </div>
          <LastFmData />
          <div id="recent-logs">
            <div className="inner">
              <div className="title">
                <span>Changelog</span>
              </div>

              {recentLogs.map((log) => (
                <div key={log.databaseId} className="log">
                  <h2>
                    {log.title}
                  </h2>
                  <div
                    className="log-content"
                    dangerouslySetInnerHTML={{ __html: log.content }}
                  />
                  <figure>
                    <Image src={stardivider} alt="" className="divider" />
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

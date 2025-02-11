'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { formatDateAsString } from '@/utils/helpers';
import Link from 'next/link';
import musicgirl from '~/images/musicgirl.webp';
import { LastFmRecentTracksResponse, LastFmTrack as Track } from '@/types';
import {
  LASTFM_API_URL,
  LASTFM_USERNAME,
  LASTFM_API_KEY,
} from '@/utils/constants';

// Reusable Track Component
const TrackInfo: React.FC<{ track: Track }> = ({ track }) => {
  const isNowPlaying = track['@attr']?.nowplaying;
  const imageUrl = track.image.find((img) => img.size === 'large')?.['#text'];

  return (
    <div className="track">
      <h3>{isNowPlaying ? 'Now Playing' : 'Recently Played'}</h3>
      <div className="track-wrapper">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`${track.name} cover`}
            width={100}
            height={100}
            className="track-cover"
          />
        )}
        <div className="track-meta">
          <p className="track-name">{track.name}</p>
          <p className="track-artist">by: {track.artist['#text']}</p>
          {!isNowPlaying && track.date && (
            <p className="track-listened">
              Played {formatDateAsString(track.date['#text'])}
            </p>
          )}
        </div>
        <Link
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="track-btn"
        >
          View Song
        </Link>
      </div>
    </div>
  );
};

// Main LastFmData Component
export const LastFmData: React.FC = () => {
  const [lfmData, setLfmData] = useState<LastFmRecentTracksResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentTrack = async () => {
      try {
        const response = await fetch(
          `${LASTFM_API_URL}?method=user.getRecentTracks&limit=1&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json`
        );
        if (!response.ok) throw new Error('Failed to fetch data.');

        const data = await response.json();
        setLfmData(data);
      } catch (err) {
        setError('Whoops! Something went wrong with Last.fm');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentTrack();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const track = lfmData?.recenttracks.track[0];
  if (!track) return <p>No tracks available.</p>;

  return (
    <div id="vibes">
      <TrackInfo track={track} />
      <Image
        src={musicgirl}
        alt="Pixel Girl"
        width={100}
        height={100}
        className="pixel-girl"
      />
    </div>
  );
};

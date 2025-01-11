'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import musicgirl from '~/images/musicgirl.webp';
import { LastFmRecentTracksResponse } from '@/types';
import {
  LASTFM_API_URL,
  LASTFM_USERNAME,
  LASTFM_API_KEY,
} from '@/utils/constants';

export const LastFmData = () => {
  const [lfmData, updateLfmData] = useState<LastFmRecentTracksResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `${LASTFM_API_URL}?method=user.getRecentTracks&limit=1&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('error');
      })
      .then((data) => {
        updateLfmData(data);
      })
      .catch(() => {
        setError('Whoops! Something went wrong with Last.fm');
      });
  }, []);

  const buildLastFmData = () => {
    if (error) {
      return <p>{error}</p>;
    }

    if (!lfmData) {
      return <p>Loading...</p>;
    }

    const track = lfmData.recenttracks.track[0];

    if (!track) {
      return <p>No tracks available</p>;
    }

    const imageUrl = track.image.find(
      (img: { size: string }) => img.size === 'large'
    )?.['#text'];

    const vibesBody = () => {
      if (track['@attr']?.nowplaying) {
        return (
          <div className='track'>
            <h3>Now playing</h3>
            {imageUrl && (
              <Image src={imageUrl} alt="" width={100} height={100} className="track-cover" />
            )}
            <p>{track.name}</p>
            <p>by: {track.artist['#text']}</p>
            <Link
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center"
            >
              View song
            </Link>
          </div>
        );
      } else {
        return (
          <div className='track'>
            <h3>Recently played</h3>
            {imageUrl && (
              <Image src={imageUrl} alt="" width={100} height={100} className="track-cover" />
            )}
            <p>{track.name}</p>
            <p>by: {track.artist['#text']}</p>
            <p>listened on: {track.date['#text']}</p>
            <Link
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center"
            >
              View song
            </Link>
          </div>
        );
      }
    };

    return (
      <div id="vibes">
        {vibesBody()}
        <Image
          src={musicgirl}
          alt=""
          width={100}
          height={100}
          className="pixel-girl"
        />
      </div>
    );
  };

  return buildLastFmData();
};

import { WPPlaylist } from '@/types';

export function Cassette({ playlist }: { playlist: WPPlaylist }) {
  return (
    <div className="cassette-wrapper">
      <div className="cassette">
        <div className="screw"></div>
        <div className="screw"></div>
        <div className="screw"></div>
        <div className="screw"></div>
        <div className="label">
          <div id="mix">{playlist.title}</div>
          <div className="reels">
            <div className="reelHole">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="window">
              <div className="spool"></div>
              <div className="spool"></div>
            </div>
            <div className="reelHole">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="head">
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
        </div>
      </div>

      <div className="cassetteCase">
        <div className="grid-3c">
          <div className="grid-2c">
            <span className="side">A</span>
            <p>Side A</p>
          </div>
          <div></div>
          <div className="grid-2c">
            <span className="side">B</span>
            <p>Side B</p>
          </div>
          <div className="track-listing">
            {playlist.playlistDetails.songs
              .filter((track) => track.trackSide.includes('A'))
              .map((track) => (
                <span
                  aria-label={`By: ${track.artist}`}
                  data-tooltip="up"
                  key={track.songTitle}
                >
                  {track.songTitle}
                </span>
              ))}
          </div>
          <div>
            &middot;
            <br />
            &middot;
            <br />
            &middot;
            <br />
            &middot;
            <br />
            &middot;
            <br />
            &middot;
            <br />
            &middot;
            <br />
            &middot;
            <br />
            &middot;
            <br />
            &middot;
          </div>
          <div className="track-listing">
            {playlist.playlistDetails.songs
              .filter((track) => track.trackSide.includes('B'))
              .map((track) => (
                <span
                  aria-label={`By: ${track.artist}`}
                  data-tooltip="up"
                  key={track.songTitle}
                >
                  {track.songTitle}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

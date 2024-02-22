import type { ITorrent1 } from './torrent.js';
import { isTorrentv1 } from './torrent.validator.js';
import { torrents } from './support/torrents.js';

describe('isTorrentv1', () => {
  it.each(torrents.valid.v1)(
    'should return true for valid torrent',
    (torrent) => {
      expect(isTorrentv1(torrent)).toBe(true);
    }
  );

  it.each(torrents.invalid.v1)(
    'should return false for invalid torrent',
    (torrent) => {
      expect(isTorrentv1(torrent)).toBe(false);
    }
  );

  it('should return false for torrent v2', () => {
    const torrentV2 = {
      info: {
        name: 'example_file.mp4',
        fileTree: {
          /* structure representing file tree for torrent v2 */
        },
        metaVersion: 2,
      },
      infohash: Buffer.from('sometorrentinfohashv2'),
      pieceLayers: new Map<Buffer, Buffer>(),
    };
    expect(isTorrentv1(torrentV2)).toBe(false);
  });
});

describe('isTorrentv2', () => {
  it.todo('should return true for valid torrent');
  it.todo('should return false for invalid torrent');
  it.todo('should return false for torrent v1');
});

describe('isHybridTorrent', () => {
  it.todo('should return true for valid torrent');
  it.todo('should return false for invalid torrent');
  it.todo('should return false for torrent v1');
  it.todo('should return false for torrent v2');
});

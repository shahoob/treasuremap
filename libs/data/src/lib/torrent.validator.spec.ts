import type { ITorrent1 } from './torrent';
import { isTorrentv1 } from './torrent.validator';

// TODO: Use real data

describe('isTorrentv1', () => {
  it('should return true for valid torrent', () => {
    expect(isTorrentv1({
      announceList: ['d'],
      info: {
        name: 'big chungus.mp4',
        files: [{
          length: 69420,
          path: ['big chungus.mp4']
        }]
      },
      infohash: Buffer.from('fgyfhuiwsfekld'),
    })).toBe(true);
  });

  it('should return false for invalid torrent', () => {
    const invalidTorrent = {
      announceList: ['udp://tracker.example.com:80'],
      info: {
        name: 'invalid_file.txt',
        files: [{
          length: 0, // Invalid length
          path: []
        }]
      },
      infohash: Buffer.from('1234567890abcdef1234567890abcdef12345678', 'hex'),
    };
    expect(isTorrentv1(invalidTorrent)).toBe(false);
    expect(isTorrentv1('free virus')).toBe(false);
  });

  it('should return false for torrent v2', () => {
    const torrentV2 = {
      info: {
        name: 'example_file.mp4',
        fileTree: {/* structure representing file tree for torrent v2 */},
        metaVersion: 2
      },
      infohash: Buffer.from('sometorrentinfohashv2'),
      pieceLayers: new Map<Buffer, Buffer>()
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

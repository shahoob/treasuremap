import { decode, encode } from 'bencode';
import { createHash } from 'node:crypto';
import { ITorrent1, ITorrent2, IHybridTorrent } from './torrent';

/**
 * @see {@link https://www.bittorrent.org/beps/bep_0003.html}
 */
export interface IRawTorrent1 {
  announce?: string;
  info: {
    'piece length': number;
    pieces: string;
  } & (
    | {
        name: string;
        length: number;
      }
    | {
        name: string;
        files: {
          path: string[];
          length: number;
        }[];
      }
  );
}

/**
 * @see {@link https://www.bittorrent.org/beps/bep_0052.html}
 */
export interface IRawTorrent2 {
  announce?: string;
  'piece layers': Record<string, string>;
  info: {
    name: string;
    'piece length': number;
    'meta version': number;
    'file tree': IRawTorrent2FileTree;
  };
}

export interface IRawTorrent2FileTree {
  [key: string]: IRawTorrent2FileTree_part2;
}

interface IRawTorrent2FileTree_part2 {
  [key: string]:
    | {
        '': {
          length: number;
          'pieces root'?: Buffer;
        };
      }
    | IRawTorrent2FileTree_part2;
}

export interface IRawAnnounceListExtension {
  'announce-list': string[][];
}

export interface IAnnounceListExtension {
  announceList: string[][];
}

/**
 * Parses a torrent.
 * @param torrent The torrent to parse either in a bencoded string or in it's raw form
 * @returns The parsed torrent.
 */
export function parseTorrent(
  torrent: string | Buffer
): (ITorrent1 | ITorrent2 | IHybridTorrent) & IAnnounceListExtension {
  const decodedRawTorrent: IRawTorrent1 | IRawTorrent2 = decode(
    typeof torrent === 'string' ? Buffer.from(torrent) : torrent
  );

  return {
    announceList: [],
    info: decodedRawTorrent.info,
    infohash: Buffer.from(
      createHash('sha1').update(encode(decodedRawTorrent.info)).digest('hex')
    ),
  } as ITorrent1;
}

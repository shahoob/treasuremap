import { decode, encode } from 'bencode/index.js';
import { createHash } from 'node:crypto';
import { ITorrent1, ITorrent2, IHybridTorrent } from './torrent.js';
import { IRawTorrent1, IRawTorrent2, IRawHybridTorrent, IRawAnnounceListExtension } from './raw-torrent.js';

export interface IAnnounceListExtension {
  announceList: string[][];
}

type RawTorrentType = IRawTorrent1 | IRawTorrent2 | IRawHybridTorrent;

/**
   * Checks if a torrent is a single file type.
   *
   * @remarks
   * If you're wondering why the return type is what it is, this is a custom type guard ({@link https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates | more specifically type predicates}),
   * and you must be new to TypeScript.
   * It's a boolean yeah but typescript atleast knows the meaning of it.
   *
   * @param torrent The torrent to test
   * @returns A boolean wether the torrent is a single file one.
   */
export function isSingleFile(torrent: unknown): torrent is IRawTorrent1<'single'> {
  // if key 'length' extsts on the root level (of the info dict)...
  const result = 'length' in (torrent as IRawTorrent1<'single'>).info
  // AND there isn't a 'files' key...
    && !('files' in (torrent as IRawTorrent1<'multi'>).info);
  // then it's a single file torrent, resulting true, otherwise false.
  return result
}

/**
 * Checks if a torrent is a multi file type.
 *
 * @see {@link isSingleFile}
 *
 * @param torrent The torrent to test
 * @returns A boolean wether the torrent is a multi file one.
 */
export function isMultiFile(torrent: unknown): torrent is IRawTorrent1<'multi'> {
  // if key 'length' extsts on the root level (of the info dict)...
  const result = !('length' in (torrent as IRawTorrent1<'single'>).info)
  // AND there isn't a 'files' key...
    && 'files' in (torrent as IRawTorrent1<'multi'>).info;
  // then it's a single file torrent, resulting true, otherwise false.
  return result
}

/**
 * Parses a torrent.
 * @param torrent The torrent to parse either in a bencoded string or in it's raw form
 * @returns The parsed torrent.
 */
export function parseTorrent(
  torrent: string | Buffer
): (ITorrent1 | ITorrent2 | IHybridTorrent) & (IAnnounceListExtension | undefined) {

  const decodedRawTorrent: RawTorrentType & (IRawAnnounceListExtension | undefined) = decode(
    typeof torrent === 'string' ? Buffer.from(torrent, 'utf8') : torrent
  ) as IRawTorrent1 & (IRawAnnounceListExtension | undefined);

  let announceList: IAnnounceListExtension['announceList'] | undefined;

  if (decodedRawTorrent['announce-list']) {
    announceList = decodedRawTorrent['announce-list'];
  } else if (decodedRawTorrent.announce) {
    announceList = [[decodedRawTorrent.announce]];
  }

  const info: (ITorrent1)['info'] = {
    name: '',
    files: []
  };

  info.name = decodedRawTorrent.info.name;

  if (isSingleFile(decodedRawTorrent)) {
    info.files.push({
      path: [info.name],
      length: decodedRawTorrent.info.length
    });
  } else if (isMultiFile(decodedRawTorrent)) {
    for (const file of decodedRawTorrent.info.files) {
      info.files.push({
        path: file.path,
        length: file.length
      });
    }

  }

  return {
    announceList,
    info,
    infohash: Buffer.from(
      createHash('sha1').update(encode(decodedRawTorrent.info)).digest('hex')
    ),
  } as ITorrent1;
}

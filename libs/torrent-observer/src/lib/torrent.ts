/**
 * An interface describing a torrent. (version 1)
 *
 * @see {@link https://www.bittorrent.org/beps/bep_0003.html | it's specification}
 */
export interface ITorrent1 {
  /**
   * The date the torrent was created.
   */
  created?: Date;

  /**
   * The program that created the torrent.
   */
  createdBy?: string;

  /**
   * The info of the torrent.
   */
  info: {
    /**
     * The name of the torrent.
     *
     * @remarks
     * If the torrent is just a single file, this will be it's filename,
     * otherwise it would be the name of the torrent's download directory.
     */
    name: string;

    /**
     * The files in the torrent.
     */
    files: {
      /**
       * The path of the file in the torrent.
       *
       * @remarks
       * This is an array of strings, each being a directory name, except for the last one, which is the filename.
       */
      path: string[];

      /**
       * The file size of the file in bytes
       */
      length: number;
    }[];
  };

  /**
   * The hash of the torrent's info when it's bencoded.
   * Uses the SHA-1 algorithm
   */
  infohash: Buffer;

  /**
   * A list of trackers to announce to.
   * May have multiple tiers of trackers.
   *
   * @defaultValue An empty array.
   */
  announceList: string[][];
}

/**
 * The second part of {@link Torrentv2FileTree}.
 *
 * @remarks
 * This is so that the file tree on the torrent itself won't be mistakenly defined as a file,
 * And we also would want recursive types so we can nest directories.
 *
 * @see {@link Torrentv2FileTree}
 *
 * @internal
 */
export interface Torrentv2FileTree_part2 {
  [key: string]:
    | Torrentv2FileTree_part2
    | {
        '': {
          /**
           * The file size of the file in bytes
           * If this isn't here, you're looking at a directory my guy.
           */
          length: number;

          /**
           * @see {@link https://www.bittorrent.org/beps/bep_0052.html#:~:text=any%20sibling%20entries.-,pieces%20root,-For%20non%2Dempty | the specification}.
           */
          piecesRoot?: string;
        };
      };
}

/**
 * An interface describing a torrent's file tree (version 2 only)
 *
 * @see {@link https://www.bittorrent.org/beps/bep_0052.html#:~:text=any%20sibling%20entries.-,pieces%20root,-For%20non%2Dempty | the specification}
 */
export interface Torrentv2FileTree {
  [key: string]: Torrentv2FileTree_part2;
}

/**
 * An interface describing a torrent. (version 2)
 *
 * @see {@link https://www.bittorrent.org/beps/bep_0052.html | it's specification}
 */
export interface ITorrent2 extends Omit<ITorrent1, 'info'> {
  info: {
    /**
     * The name of the torrent.
     * Purely advisory, may not be present.
     * @see {@link https://www.bittorrent.org/beps/bep_0052.html#:~:text=A%20display%20name%20for%20the%20torrent.%20It%20is%20purely%20advisory. | the specification's saying.}
     */
    name?: string;

    /**
     * The version of the BitTorrent metadata specification used.
     *
     * @remarks
     * Implementations must check for this field before they do v2 stuff.
     * Later revisions of the specification might bring a backwards-incompatible change so this field would be incremented.
     * @see {@link https://www.bittorrent.org/beps/bep_0052.html#:~:text=Future%20revisions%20will,about%20invalid%20files. | the specification's saying.}
     */
    metaVersion: number;

    /**
     * This is for version 1 of the specification. You sure this is a {@link IHybridTorrent | hybrid torrent}?
     *
     * @privateRemarks
     * Just keep it there.
     *
     * @internal
     */
    files: undefined;

    /**
     * The files in the torrent.
     */
    fileTree: Torrentv2FileTree;
  };

  /**
   * The hash of the torrent's info when it's bencoded.
   * Uses the SHA-256 algorithm as of metadata version 2
   *
   * @see {@link info.metaVersion}
   */
  infohash: Buffer;

  /**
   * @see {@link https://www.bittorrent.org/beps/bep_0052.html#:~:text=keys%20described%20below.-,piece%20layers,-A%20dictionary%20of | the specification}.
   * @see {@link https://en.wikipedia.org/wiki/Merkle_tree}
   */
  pieceLayers: WeakMap<Buffer, Buffer> | Map<Buffer, Buffer>;
}

/**
 * An interface describing a hybrid torrent.
 *
 * @see {@link ITorrent1}
 * @see {@link ITorrent2}
 */
export interface IHybridTorrent
  extends Omit<ITorrent1, 'info' | 'infohash'>,
    Omit<ITorrent2, 'info' | 'infohash'> {
  info: ITorrent1['info'] & Omit<ITorrent2['info'], 'files'>;
  /**
   * The infohashes computed for both version 1 and version 2 respectively.
   */
  infohashes: [Buffer, Buffer];
}

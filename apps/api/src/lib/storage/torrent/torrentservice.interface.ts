import { ITorrent1, ITorrent2, IHybridTorrent } from '@treasuremap/data';

/**
 * A type representing all possible torrent types
 */
export type Torrent = ITorrent1 | ITorrent2 | IHybridTorrent;

/**
 * An interface describing torrent services
 *
 * @remarks
 * The idea with this is that it's an abstraction over the database,
 * allowing for not only an easier way to add a new database, but also easily mock it for testing.
 * All without the consumers knowing about all this stuff, just that they can call {@link findTorrentByInfohash} with expected results.
 *
 * @typeParam IDType - The type of ID used in the database
 */
export interface ITorrentService<IDType = string> {
  /**
   * Parses a torrent file and adds it to the database
   * @param torrent - The torrent file's contents properly "bencoded"
   * @returns A promise that (hopefully) resolves with it's ID in the database and the parsed torrent
   */
  parseAndAddTorrent(torrent: Buffer): Promise<[IDType, Torrent]>;

  /**
   * Gets the torrent file from the database
   * @param id - The database ID of the torrent
   * @returns A promise that (hopefully) resolves with it's contents
   */
  getTorrentFile(id: IDType): Promise<Buffer>;

  /**
   * Gets the torrent file from the database by it's infohash
   * @param infohash - The infohash of the torrent
   * @returns A promise that (hopefully) resolves with the torrent (and it's DB ID)
   */
  findTorrentByInfohash(infohash: string | Buffer): Promise<[IDType, Torrent]>;

  /**
   * Gets the torrent file from the database by searching for it's name
   * @param name - The name of the torrent
   * @returns A promise that (hopefully) resolves with the results, each with the torrents and their DB IDs
   */
  findTorrentsByName(name: string): Promise<[IDType, Torrent][]>;
}

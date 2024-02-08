import { Injectable } from '@nestjs/common';
import { ITorrentService, Torrent } from './torrentservice.interface';

/**
 * Basic reference implementation for interacting with torrents.
 * Should only be used for testing purposes
 */
@Injectable()
export class BaseTorrentService implements ITorrentService {
  parseAndAddTorrent(torrent: Buffer): Promise<[string, Torrent]> {
    throw new Error('Method not implemented.');
  }
  getTorrentFile(id: string): Promise<Buffer> {
    throw new Error('Method not implemented.');
  }
  findTorrentByInfohash(infohash: string | Buffer): Promise<[string, Torrent]> {
    throw new Error('Method not implemented.');
  }
  findTorrentsByName(name: string): Promise<[string, Torrent][]> {
    throw new Error('Method not implemented.');
  }
}

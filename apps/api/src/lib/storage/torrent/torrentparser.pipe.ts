import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Torrent } from './torrentservice.interface';

import parseTorrent from 'parse-torrent';

@Injectable()
export class TorrentparserPipe
  implements PipeTransform<Buffer | string, Torrent>
{
  /**
   * Parses a what hopes to be a torrent file and transforms into it.
   * @param value The torrent to be parsed, either in plain-text or bencoded as a Buffer
   * @param metadata contains metadata about the value
   */
  transform(value: Buffer | string, metadata: ArgumentMetadata): Torrent {
    const result = parseTorrent(value);
  }
}

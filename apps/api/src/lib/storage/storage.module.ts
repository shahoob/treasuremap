import { Module } from '@nestjs/common';
import { BaseTorrentService } from './torrent/torrent.service';

@Module({
  providers: [
    {
      provide: 'TorrentService',
      useFactory() {
        // TODO: Replace with real implementation
        return new BaseTorrentService();
      },
    }
  ],
  exports: ['TorrentService'],
})
export class StorageModule {}

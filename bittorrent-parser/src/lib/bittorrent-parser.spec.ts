import { bittorrentParser } from './bittorrent-parser';

describe('bittorrentParser', () => {
  it('should work', () => {
    expect(bittorrentParser()).toEqual('bittorrent-parser');
  });
});

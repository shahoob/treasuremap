import { parseTorrent } from './parser';
import fixtures from 'webtorrent-fixtures';

describe('parseTorrent', () => {
  it('exists', () => {
    expect(parseTorrent).toBeDefined();
  });

  it.todo('parses a version 1 torrent');
  it.todo('parses a version 2 torrent');
  it.todo('parses a hybrid torrent');
});

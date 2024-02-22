import { parseTorrent, isMultiFile, isSingleFile } from './parser.js';

describe('parseTorrent', () => {
  it('exists', () => {
    expect(parseTorrent).toBeDefined();
  });

  it.todo('parses a version 1 torrent');
  it.todo('parses a version 2 torrent');
  it.todo('parses a hybrid torrent');
});

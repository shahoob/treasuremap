import { torrentObserver } from './torrent-observer.js';

describe('torrentObserver', () => {
  it('should work', () => {
    expect(torrentObserver()).toEqual('torrent-observer');
  });
});

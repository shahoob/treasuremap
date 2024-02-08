// TODO: Use real data
export const torrents = {
  valid: {
    v1: [
      {
        announceList: ['d'],
        info: {
          name: 'big chungus.mp4',
          files: [{
            length: 69420,
            path: ['big chungus.mp4']
          }]
        },
        infohash: Buffer.from('fgyfhuiwsfekld'),
      },
      {
        info: {
          name: 'big chungus collection',
          files: [{
            length: 69420,
            path: ['chunguses', 'big chungus.mp4']
          }]
        },
        infohash: Buffer.from('hfureifhrekfa,ls')
      }
    ],
    v2: [
      {

      }
    ]
  },
  invalid: {
    v1: [
      {
        announceList: ['udp://tracker.example.com:80'],
        info: {
          name: 'invalid_file.txt',
          files: [{
            length: 0, // Invalid length
            path: []
          }]
        },
        infohash: Buffer.from('1234567890abcdef1234567890abcdef12345678', 'hex'),
      }
    ]
  }
};

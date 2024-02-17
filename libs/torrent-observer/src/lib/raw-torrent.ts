export interface IRawTorrent1SingleFile {
  name: string;
  length: number;
}

export interface IRawTorrent1MultiFile {
  name: string;
  files: {
    path: string[];
    length: number;
  }[];
}
/**
 * @see {@link https://www.bittorrent.org/beps/bep_0003.html}
 * @typeParam FT - Specifies if the torrent is single or multi-file, or not and consider all the possibilities of it.
 */

export interface IRawTorrent1<FT extends 'single' | 'multi' | undefined = undefined> {
  announce?: string;
  info: {
    'piece length': number;
    pieces: string;
  } & (
    // If FT is 'multi', intersect with IRawTorrent1MultiFile...
    FT extends 'multi' ? IRawTorrent1MultiFile :
    // Or if FT is 'single', intersect with IRawTorrent1SingleFile instead...
    FT extends 'single' ? IRawTorrent1SingleFile :
    // Otherwise if it isnt any of them, which would mean it's undefined, then we don't know what it is.
    // Use a union of all possible types instead
    (IRawTorrent1SingleFile | IRawTorrent1MultiFile));
}
/**
 * @see {@link https://www.bittorrent.org/beps/bep_0052.html}
 */

export interface IRawTorrent2 {
  announce?: string;
  'piece layers': Record<string, string>;
  info: {
    name: string;
    'piece length': number;
    'meta version': number;
    'file tree': IRawTorrent2FileTree;
  };
}

export interface IRawTorrent2FileTree {
  [key: string]: IRawTorrent2FileTree_part2;
}
interface IRawTorrent2FileTree_part2 {
  [key: string]: {
    '': {
      length: number;
      'pieces root'?: Buffer;
    };
  } |
  IRawTorrent2FileTree_part2;
}

export type IRawHybridTorrent<FT extends 'single' | 'multi' | undefined = undefined> = IRawTorrent1<FT> & IRawTorrent2;

export interface IRawAnnounceListExtension {
  'announce-list': string[][];
}

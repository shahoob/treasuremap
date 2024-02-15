import { z } from 'zod';
import { ITorrent1, Torrentv2FileTree } from './torrent';

export const ITorrent1Schema = z.object({
  created: z.date().optional(),
  createdBy: z.string().optional(),
  info: z.object({
    name: z.string(),
    files: z
      .array(
        z.object({
          path: z.array(z.string()).min(1),
          length: z.number().min(1),
        })
      )
      .min(1),
  }),
});

/**
 * @internal
 */
export const _dirFileTree: z.ZodType<Torrentv2FileTree> = z.union([
  z.lazy(() => z.record(z.string().min(1), _dirFileTree)),
  z.object({
    '': {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      length: z.number(),
      piecesRoot: z.string().optional(),
    },
  }),
]);
export const ITorrent2SchemaFileTree = z.record(
  z.string().min(1),
  _dirFileTree
);

export const ITorrent2Schema = ITorrent1Schema.omit({ info: true }).merge(
  z.object({
    info: z.object({
      name: z.string().optional(),
      metaVersion: z.number(),
      fileTree: ITorrent2SchemaFileTree,
    }),
    pieceLayers: z.map(z.instanceof(Buffer), z.instanceof(Buffer)),
  })
);

export const IHybridTorrentSchema = z.intersection(
  ITorrent1Schema,
  ITorrent2Schema
);

export function isTorrentv1(torrent: any): torrent is ITorrent1 {
  try {
    ITorrent1Schema.parse(torrent);
    return true;
  } catch (error) {
    return false;
  }
}

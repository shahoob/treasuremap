import { z } from 'zod';
import { Torrentv2FileTree } from './torrent';

const ITorrent1Schema = z.object({
  created: z.date().optional(),
  createdBy: z.string().optional(),
  info: z.object({
    name: z.string(),
    files: z.array(
      z.object({
        path: z.array(z.string()).min(1),
        length: z.number(),
      })
    ).min(1),
  }),
  name: z.string(),
});

/**
 * @internal
 */
const _dirFileTree: z.ZodType<Torrentv2FileTree> = z.union([
  z.lazy(() => z.record(z.string().min(1), _dirFileTree)),
  z.object({
    "": {
      length: z.number(),
      piecesRoot: z.string().optional(),
    }
  })
]);
const ITorrent2SchemaFileTree = z.record(z.string().min(1), _dirFileTree)

const ITorrent2Schema = ITorrent1Schema.omit({ info: true }).merge(
  z.object({
    info: z.object({
      name: z.string().optional(),
      metaVersion: z.number(),
      fileTree: ITorrent2SchemaFileTree
    }),
    pieceLayers: z.map(z.instanceof(Buffer), z.instanceof(Buffer)),
  })
);

const IHybridTorrentSchema = z.intersection(ITorrent1Schema, ITorrent2Schema);

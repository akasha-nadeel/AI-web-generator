// Bundles a translator file map into a single in-memory ZIP. Strings are
// stored as UTF-8 text; Buffers (used for bundled images in Phase 7) are
// stored as binary. DEFLATE compression is on by default — ~85% reduction
// on typical sites.

import JSZip from "jszip";
import type { FileMap } from "./translate.ts";

export type BinaryFileMap = Record<string, string | Buffer>;

const COMPRESSION = { type: "DEFLATE" as const, compressionOptions: { level: 6 } };

export async function buildZip(files: FileMap | BinaryFileMap): Promise<Buffer> {
  const zip = new JSZip();
  for (const [path, content] of Object.entries(files)) {
    zip.file(path, content);
  }
  return zip.generateAsync({
    type: "nodebuffer",
    compression: COMPRESSION.type,
    compressionOptions: COMPRESSION.compressionOptions,
  });
}

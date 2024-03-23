import fs from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

import type { WriteImageFunction } from './WriteImageFunction';

export const writeAvif: WriteImageFunction = async ({ filepath, imageData }) => {

  await fs.mkdir(path.dirname(filepath), { recursive: true }).catch(() => {});

  await sharp(imageData.data, {
    raw: {
      channels: 4,
      height: imageData.height,
      width: imageData.width,
    },
  })
  .toFormat('avif')
  .toFile(filepath);
}

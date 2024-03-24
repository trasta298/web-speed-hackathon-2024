import Jimp from 'jimp';
import sharp from 'sharp';

import type { ReadImageFunction } from './ReadImageFunction';

export const readAvif: ReadImageFunction = async (imagePath) => {
  // AVIF画像をPNG形式に変換し、バイナリデータを取得
  const pngBuffer = await sharp(imagePath)
    .toFormat('png')
    .toBuffer();

  const jimp = await Jimp.read(pngBuffer);

  return {
    colorSpace: 'srgb',
    data: new Uint8ClampedArray(jimp.bitmap.data),
    height: jimp.getHeight(),
    width: jimp.getWidth(),
  };
}

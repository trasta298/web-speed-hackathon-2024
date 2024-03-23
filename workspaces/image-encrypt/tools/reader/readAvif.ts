import sharp from 'sharp';

import type { ReadImageFunction } from './ReadImageFunction';

export const readAvif: ReadImageFunction = async (imagePath) => {
  // AVIF画像をPNG形式に変換し、バイナリデータを取得
  const pngBuffer = await sharp(imagePath)
    .toFormat('png')
    .toBuffer();

  // PNGのバイナリデータからUint8ClampedArrayを生成
  // ここでは、実際のピクセルデータへの変換は行っていません。
  // 実際には、PNGバイナリからピクセルデータを抽出するには追加の解析が必要です。
  const data = Uint8ClampedArray.from(pngBuffer);

  const metadata = await sharp(pngBuffer).metadata();

  return {
    colorSpace: 'srgb',
    data: data,
    height: metadata.height ?? 0,
    width: metadata.width ?? 0,
  };
}

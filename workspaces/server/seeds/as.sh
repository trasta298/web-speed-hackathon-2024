#!/bin/bash

# 出力ディレクトリの確認と作成
output_dir="tmp2"
if [ ! -d "$output_dir" ]; then
  mkdir "$output_dir"
fi

# tmpフォルダ内の全PNG画像を処理
for file in tmp/*.png; do
  # 出力ファイル名の設定
  output_file="${output_dir}/$(basename "$file")"
  
  # ImageMagickを使ってリサイズ
  convert "$file" -resize "x800" -quality "100" "$output_file"
done

import json
import os
import shutil

# load episode.json
with open('episode.json') as f:
    episode = json.load(f)

image_ids = [d['imageId'] for d in episode]

# {image_ids}.png 以外のファイルを /dec から /tmp に移動
images = os.listdir('./dec')
for image in images:
    iid = image.split('/')[-1].split('.')[0]
    if iid not in image_ids:
        shutil.move(f'./dec/{image}', f'./tmp/{image}')

#!/usr/bin/env python3
"""
Prepare images for the home page hero ("art.svg" tab).

1. Put your original images (jpg/png) into public/img/hero/
2. Run from the repo root:  python3 scripts/optimize_hero_images.py
3. Copy the printed paths into _data/hero_art.yml (one `main` image + four `thumbs`).

Each image is resized to max 900px and saved as WebP in public/img/hero/web/.
The hero shows them as squares (cropped to fill), so square or near-square artwork looks best.
Requires: pip install Pillow
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'public/img/hero')
OUT = os.path.join(SRC, 'web')
os.makedirs(OUT, exist_ok=True)
done = 0
for f in sorted(os.listdir(SRC)):
    if not f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')): continue
    stem = os.path.splitext(f)[0]
    im = Image.open(os.path.join(SRC, f)).convert('RGB')
    im.thumbnail((900, 900))
    im.save(os.path.join(OUT, stem + '.webp'), 'WEBP', quality=74, method=6)
    print(f'/public/img/hero/web/{stem}.webp   ({im.width}x{im.height})')
    done += 1
print(f'\n{done} image(s) ready. Paste the paths above into _data/hero_art.yml')

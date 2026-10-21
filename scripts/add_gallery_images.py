#!/usr/bin/env python3
"""
Add new artwork to the Photography / Sketching / Illustrations galleries.

1. Drop your image files into the matching folder:
     public/img/photography/    -> /photography/
     public/img/sketches/       -> /sketching/
     public/img/illustrations/  -> /illustrations/
2. Run from the repo root:
     python3 scripts/add_gallery_images.py          (add --dry-run to preview)
3. Commit everything it created (config list, public/img/g/*, _data/gallery.json).

What it does for every image that is not listed in _config.yml yet:
  - generates the optimized WebP versions the site loads (small / thumbnail / lightbox)
  - records the thumbnail size in _data/gallery.json (prevents layout shift)
  - appends the image to the right list in _config.yml (new images appear last)
Files whose name ends in "_cover" are ignored (they are used as section covers).
Requires: pip install Pillow
"""
import json, os, re, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GALLERIES = {                       # config key -> folder (also the page it feeds)
    'photography':  'public/img/photography',
    'illustrations': 'public/img/illustrations',
    'sketches':     'public/img/sketches',
}
EXT = ('.jpg', '.jpeg', '.png', '.webp')
DRY = '--dry-run' in sys.argv

def thumbs(src, folder, stem):
    key = f'{os.path.basename(folder)}-{stem}'
    out = os.path.join(ROOT, 'public/img/g')
    os.makedirs(out, exist_ok=True)
    im = Image.open(src)
    im = im.convert('RGB')
    sizes = {'s': (360, 66), 't': (640, 70), 'l': (1800, 78)}
    dims = None
    for suffix, (px, q) in sizes.items():
        c = im.copy(); c.thumbnail((px, px))
        c.save(os.path.join(out, f'{key}-{suffix}.webp'), 'WEBP', quality=q, method=6)
        if suffix == 't': dims = {'w': c.width, 'h': c.height}
    return key, dims

def main():
    cfg_path = os.path.join(ROOT, '_config.yml')
    cfg = open(cfg_path).read()
    data_path = os.path.join(ROOT, '_data/gallery.json')
    data = json.load(open(data_path)) if os.path.exists(data_path) else {}
    added = 0
    for key, folder in GALLERIES.items():
        m = re.search(rf'^{key}:\n((?:[ \t]+- .*\n?)+)', cfg, re.M)
        if not m:
            print(f'! list "{key}:" not found in _config.yml, skipping'); continue
        listed = {os.path.basename(x.strip()[2:].strip()) for x in m.group(1).strip('\n').split('\n')}
        fdir = os.path.join(ROOT, folder)
        new = sorted(f for f in os.listdir(fdir)
                     if f.lower().endswith(EXT) and f not in listed
                     and not os.path.splitext(f)[0].endswith('_cover'))
        lines = []
        for f in new:
            stem = os.path.splitext(f)[0]
            print(f'+ {key}: {f}')
            if not DRY:
                k, dims = thumbs(os.path.join(fdir, f), folder, stem)
                data[k] = dims
            lines.append(f'  - {folder}/{f}\n')
            added += 1
        # make sure thumbnails exist for already-listed images too (e.g. after a fresh clone)
        for f in sorted(listed):
            stem = os.path.splitext(f)[0]; k = f'{os.path.basename(folder)}-{stem}'
            if not os.path.exists(os.path.join(ROOT, 'public/img/g', f'{k}-t.webp')) and os.path.exists(os.path.join(fdir, f)) and not DRY:
                kk, dims = thumbs(os.path.join(fdir, f), folder, stem); data[kk] = dims; print(f'~ regenerated thumbnails for {f}')
        if lines and not DRY:
            block = m.group(1)
            if not block.endswith('\n'): block += '\n'
            cfg = cfg.replace(m.group(0), f'{key}:\n' + block + ''.join(lines), 1)
    if not DRY:
        open(cfg_path, 'w').write(cfg)
        json.dump(data, open(data_path, 'w'), indent=0)
    print(f'\n{"Would add" if DRY else "Added"} {added} image(s).' + ('' if DRY or not added else ' Commit _config.yml, _data/gallery.json, public/img/g/ and your new files.'))

if __name__ == '__main__':
    main()

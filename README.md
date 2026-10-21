Previously I was pretty much happy with my website which was created using PHP. Mainly,
my website included the information about me and my work. But, eventually PHP did not stand upto me as it had previously. Problems included slower loading time and complex code blocks.

Later on I came to know about [Jekyll](http://jekyllrb.com). Its impressive loading speeds, ease of use left me no option but to try it! This website that you are currently viewing is entirely built using Jekyll.

P.S: Special thanks to Hyde theme

## Setting up Jekyll

* First and foremost we will need Ruby. If you do not have Ruby installed, install it from [here](https://www.ruby-lang.org/en/downloads/)
* Fork this repository
* Next we will need **bundler** for getting github pages to work. For this type `gem install bundler` in your terminal or command prompt
* Now, in the root of the forked repo, create a file named `Gemfile` (without any extension) and write these contents in the file

    ```
        source 'https://rubygems.org'
        gem 'github-pages', group: :jekyll_plugins
    ```

* Next, just fire the command `bundle install`. This will install all the dependencies required for running the fork
* Lastly, execute the command `bundle exec jekyll serve` to run the Jekyll server on `localhost:4000`

## Tweaks I had used:

- For image optimizations I had used: [http://www.jpeg-optimizer.com/](http://www.jpeg-optimizer.com/) [http://optimizilla.com/](http://optimizilla.com/) and [https://tinypng.com/](https://tinypng.com/)
- Setting up domain Emails: [Check this](https://blog.webjeda.com/free-domain-email-zoho/)
- Optimizing Guide for making your Jekyll website faster: [Check this](https://blog.webjeda.com/pagespeed-insights-100/)
- For SEO Optimizations: [Check this](https://blog.webjeda.com/optimize-jekyll-seo/)
- For Social Media Share Links: [Check this](https://superdevresources.com/share-buttons-jekyll/)
- For Minify CSS: [Check this](https://cssminifier.com/)

Special thanks to [@reallinfo](https://github.com/reallinfo) for the beautiful and thoughtful logo :smile:

## Adding artwork to the galleries

The Photography, Sketching and Illustrations pages are generated from lists in `_config.yml`, and each image needs small optimized WebP copies so the pages stay fast. A script does both for you.

1. Copy your new images into the matching folder:
   - `public/img/photography/` (page: `/photography/`)
   - `public/img/sketches/` (page: `/sketching/`)
   - `public/img/illustrations/` (page: `/illustrations/`)
2. From the repo root run `python3 scripts/add_gallery_images.py` (needs `pip install Pillow`; add `--dry-run` to preview).
3. Commit the changed `_config.yml`, `_data/gallery.json`, the new files in `public/img/g/` and your originals, then push.

New images appear at the end of their gallery. Files named `*_cover.*` are ignored (they are section covers on the home page).

#!/bin/sh
# Minify the site's CSS and JS.
#
# Edit the SOURCE files:   assets/css/styles.src.css   assets/js/main.src.js
# Then run ./build.sh to regenerate the files the pages actually load:
#                          assets/css/styles.css       assets/js/main.js
#
# The generated files are committed — GitHub Pages serves the repo as-is and
# has no build step of its own. Never hand-edit the generated files; a rebuild
# overwrites them.
set -e
cd "$(dirname "$0")"

npx --yes esbuild assets/css/styles.src.css --minify --outfile=assets/css/styles.css --allow-overwrite
npx --yes esbuild assets/js/main.src.js     --minify --outfile=assets/js/main.js     --allow-overwrite

# Re-add the "don't edit me" banner esbuild strips.
printf '/*! GENERATED FILE - edit assets/css/styles.src.css and run ./build.sh */\n' | cat - assets/css/styles.css > .b && mv .b assets/css/styles.css
printf '/*! GENERATED FILE - edit assets/js/main.src.js and run ./build.sh */\n'     | cat - assets/js/main.js  > .b && mv .b assets/js/main.js

echo "Built:"
ls -l assets/css/styles.css assets/js/main.js

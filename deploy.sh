#!/usr/bin/env bash
npm run build
cd dist/
git init
git add -A
git commit -m"deploy"
git push -f https://simoneb@bitbucket.org/simoneb/simoneb.bitbucket.io.git master
cd --

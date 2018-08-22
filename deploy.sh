#!/usr/bin/env bash
npm run build
git init
git add -A
git commit -m"deploy"
git push https://github.com/simoneb/vuedaru.git master
cd --

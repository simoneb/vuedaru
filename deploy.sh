#!/usr/bin/env bash
npm run build
git add -A
git commit -m"deploy"
git push

#!/usr/bin/env bash

rm -rf dist && rm -rf dist.zip
yarn build
zip -r  dist.zip ./dist
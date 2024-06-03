#!/bin/bash

rm -r javascript

tsc

cp ./src/*.html ./javascript/src/
cp ./README.md ./javascript/src/
cp ./src/*.txt ./javascript/src/
cp -R ./node_modules ./javascript
cp -R ./src/libraries ./javascript/src
cp -R ./src/css ./javascript/src
cp -R ./src/local_icons ./javascript/src

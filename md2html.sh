#!/bin/bash
find ./notes -name '*' -type f -exec sh -c 'echo "$1,$(git log -1 --format=%ci "$1")"' _  {} \; | sort | node md2html.js

echo "done"

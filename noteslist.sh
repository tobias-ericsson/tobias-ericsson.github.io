#!/bin/bash

#ls notes -Rl

#ls notes/* -lR | awk '{print $1 "," $9}' > ./notes/notes2.txt

find ./notes -name '*' -type f -exec sh -c 'echo "$1,$(git log -1 --format=%ci "$1")"' _  {} \; | sort > notes.txt

#find ./notes -name '*' -type f -mindepth 1 -printf '%p,%h,%f,%Tx,%TY-%Tm-%Td \n' | sort > notes.txt

echo "done"

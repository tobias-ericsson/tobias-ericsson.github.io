#!/bin/bash
find ./notes -name '*.md' -printf '%p,%h,%f\n'| sort > ./notes/notes.txt

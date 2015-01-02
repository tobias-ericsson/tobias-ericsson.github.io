#!/bin/bash
for item in `find ./notes -mindepth 1`;do
 if [ -d $item ];then
  echo "dir "+$item
 elif [ -f $item ];then
  echo $item
 fi
done

#ls notes -Rl

ls notes -lR | awk '{print $1 "," $5 "," $8 "," $9}'




#find ./notes -name '*' -mindepth 1 -printf '%p,%h,%f,%s \n'
#| sort > ./notes/notes.txt
echo "done"

# cat will read from file
# xargs -n1 will put one word on each line, that's a number 1
# sort will sort the output
# uniq -c will count occurances
# sort -g will numeric reverse 

cat gridlayout.css | xargs -n1 | sort | uniq -c | sort -gr

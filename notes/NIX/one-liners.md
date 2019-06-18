#How to

### Run the last command as root
```bash
sudo !!
```
!! gets last command, you can prepend anything - sudo is just a useful example

### recursively find all folders named X and remove them and their subdirectories
```bash
find ./ -type d -name X -exec rm -r {} \;
```

### recursively find all files containing a specific string of text
```bash
grep -rni . -e "regexp pattern"
```
-r is recursive, -n is line number. 

Only show file name, not the result itself
```bash
grep -rnl . -e "regexp pattern"
```
### find the 10 largest files/directories
```bash
du -a . | sort -nr | head -n 10
```
-a is all files, not just directories, -n is numeric, -r is descending, -n is number of lines

Or 
```bash
du -s * | sort -rn | head -n 10
```
-s is summarize

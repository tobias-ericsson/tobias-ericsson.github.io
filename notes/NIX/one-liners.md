# How to

### rename multiple files 
finds files with XYZ in the name and then removes XYZ from all file names
using shell parameter expansion
```bash
find . -type f -name "XYZ" -exec sh -c 'file="{}"; mv $file ${file/XYZ/}' \;
```

### run the last command as root
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
grep -rn . -e "regexp pattern"
```
-r is recursive, -n is line number. 

only show file name, not the result itself
```bash
grep -rnl . -e "regexp pattern"
```
### find the 10 largest files/directories
```bash
du -a . | sort -nr | head -n 10
```
-a is all files, not just directories, -n is numeric, -r is descending, -n is number of lines

or 
```bash
du -s * | sort -rn | head -n 10
```
-s is summarize

### recursively find all maven pom.xml files and update versions
```bash
find . -name "pom.xml" -exec sed -i 's/2.0.4.2-SNAPSHOT/2.1.6.0-SNAPSHOT/g' {} \;
```

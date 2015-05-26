http://conqueringthecommandline.com/book/frontmatter

http://www.commandlinefu.com/commands/browse/sort-by-votes

How to extract text between two values from a file
--------------------------------------------------
tail -1000f logfile.log | awk '/<Body>/,/<\/Body>/'


How to recursively find all folders named X and remove them and their subdirectories
------------------------------------------------------------------------------------
find ./ -type d -name X -exec rm -r {} \;


How to find all files containing a specific string of text
----------------------------------------------------------

<pre>
    grep -rnw 'directory' -e "pattern"
</pre>
-r is recursive, -n is line number and -w stands match the whole word.

Only show file name, not the result itself
<pre>
    grep -rnl '.' -e "pattern"
</pre>




About cd
--------
go home:
cd ~ (or only cd)

go back and forth:
cd -

remember dir:
pushd mydir

go to the remembered dir:
popd


How to get random quotes, like in a fortune cookie
--------------------------------------------------

```
sudo apt-get install fortune-mod
fortune
```



Port Scanning
-------------

### find open ports and running services
nc -zv host.example.com 20-30

### find which server software is running
echo "QUIT" | nc host.example.com 20-30

http://www.computerhope.com/unix/nc.htm

ngrep -d en0 port 80

ngrep -d any 'error' port syslog


Process Scanning
------------
pgrep ssh
pgrep java

ps -ef |  grep 'tomcat'




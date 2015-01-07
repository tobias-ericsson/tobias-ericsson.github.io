
How to extract text between two values from a file
--------------------------------------------------
tail -1000f logfile.log | awk '/<Body>/,/<\/Body>/'


How to recursively find all folders named X and remove them and their subdirectories
------------------------------------------------------------------------------------
find ./ -type d -name X -exec rm -r {} \;


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




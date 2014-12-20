*NIX Commands
=============



How to extract text between two values from a file
--------------------------------------------------
tail -1000f logfile.log | awk '/<Body>/,/<\/Body>/'


How to recursively find all folders named X and remove them and their subdirectories
------------------------------------------------------------------------------------
find ./ -type d -name X -exec rm -r {} \;

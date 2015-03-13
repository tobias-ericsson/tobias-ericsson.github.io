Ranger

http://ranger.nongnu.org/ranger.1.html

create new file:

<INSERT>

For example, to create a new file when Ins is pressed, add this to ~/.config/ranger/rc.conf:

map <INSERT> console touch

delete a file:

<DELETE>

If you type "S" (capital), ranger will start a subshell in the directory you're browsing. 
You can then ctrl-d or type "exit" to close the subshell and return to browsing in ranger.

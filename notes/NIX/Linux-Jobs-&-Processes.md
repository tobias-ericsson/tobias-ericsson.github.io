## Jobs

Jobs are processes which are started by a shell.

* `CTRL+Z` suspends the current foreground job.
* `bg` executes job in background.
* `jobs` lists background jobs.
* `fg` brings job to foreground.
* `kill %2` kills background job with job number 2.

## Monitor Processes

* `top` or `htop` finds processes
* `ps aux | grep java` finds java processes
* `ps aux | grep 'Z'` finds zombie/defunct processes

## Find Out What Ports Are Listening

* `sudo lsof -i` for all, `sudo lsof -i :8080` for just port 8080
* `ss -lntu`
* `sudo netstat -ltup`

## Can't write to disc, disc don't appear to be full but is 

You might be out of inodes due to large number of (tiny) files
* `df --inodes` check inodes

You might have (large) deleted yet open files
* `sudo lsof +L1` finds deleted yet open files




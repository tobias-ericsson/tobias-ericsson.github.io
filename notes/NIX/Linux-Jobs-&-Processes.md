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

## Find Out What Ports Are Listening

* `sudo lsof -i` for all, `sudo lsof -i :8080` for just port 8080
* `ss -lntu`
* `sudo netstat -ltup`




/** Generated file, modifications will be overwritten! **/
search.addDoc(
`* Homo Deus
* Hans Rosling, Factfulness
* Hans Rosling, Hur jag lärde mig att förstå världen`,"notes/Books/recommended.md","note","2018-08-13");
search.addDoc(
`David Gemmell, Legend
Karl Edward Wagner, Kane
Tad Williams, ?
Steven Erikson, the crippled god
The Malazan Book of the Fallen, The Bauchelain and Korbal Broach novellas
P.C. Hodgell, The Kencyr novels
Glen Cook
Fritz Leiber, The Fafhrd and the Gray Mouser stories
Capitalism without Capital, Haskel - Westlake
`,"notes/Books/to-read.md","note","2018-08-13");
search.addDoc(
`How to quickly setup a static file server?
------------------------------------------
 Node / Npm
bash
npm install http-server -g

To use it:

cd D:\Folder
http-server

Or, like this:
bash
http-server D:\Folder

 Python
bash
python -m SimpleHTTPServer

or
bash
python3 -m http.server

 Golang
create file web-server.go
golang
package main
import (
  net/http
  fmt
)
func ping(w http.ResponseWriter, r *http.Request) {
  w.Write([]byte(pong))
}
func main() {
  http.Handle(/, http.FileServer(http.Dir(./public)))
  http.HandleFunc(/ping, ping)
  fmt.Printf(listening on port 8080\n);
  if err := http.ListenAndServe(:8080, nil); err != nil {
    panic(err)
  }
}

run
golang
go run web-server.go

`,"notes/Coding/Static-file-server.md","note","2018-08-13");
search.addDoc(
`Force pull

git reset --hard origin/master

Force Push

git push -f
`,"notes/Coding/git.md","note","2018-08-17");
search.addDoc(
` For information

docker stats
docker inspect [OPTIONS] NAME|ID [NAME|ID...]
docker container ls (or old way docker ps)
docker ps --format {{.Names}} (only names)
docker image ls
docker volume ls
docker network ls

 For going inside a docker container

docker exec -it <containerIdOrName> bash (or /bin/bash or /bin/ash)

`,"notes/Containers/docker-commands.md","note","2018-08-22");
search.addDoc(
`
docker-compose up
docker-compose down
`,"notes/Containers/docker-compose-commands.md","note","2018-08-22");
search.addDoc(
`version: '3.7'
services:
  rabbitmq:
    image: rabbitmq:alpine
    restart: always
    ports:
      - 5671:5671
      - 5672:5672
  redis:
    image: redis:alpine
    restart: always
    ports:
      - 6379:6379
   Use root/example as user/password credentials
  mysql:
    image: mysql:latest
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: example
  cassandra:
    image: cassandra:latest
    environment:
      - MAX_HEAP_SIZE=256M
      - HEAP_NEWSIZE=128M
    restart: always
    ports:
      - 7199:7199
      - 9042:9042
  adminer:
    image: adminer
    restart: always
    ports:
      - 8082:8080
  cadvisor:
    image: google/cadvisor:latest
    restart: always
    ports:
      - 8081:8080
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:rw
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro`,"notes/Containers/docker-compose.yml","note","2018-08-21");
search.addDoc(
`!/usr/bin/env bash
from  https://docs.docker.com/compose/install/
sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-(uname -s)-(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version`,"notes/Containers/install-docker-compose.sh","note","2018-08-21");
search.addDoc(
`autojump - a faster way to navigate your filesystem
https://github.com/joelthelion/autojump
j foo
jc bar
jo music
jco images
git clone git://github.com/joelthelion/autojump.git
cd autojump
./install.py or ./uninstall.py
`,"notes/NIX/Autojump.md","note","2018-08-13");
search.addDoc(
` Jobs
Jobs are processes which are started by a shell.
* CTRL+Z suspends the current foreground job.
* bg executes job in background.
* jobs lists background jobs.
* fg brings job to foreground.
* kill %2 kills background job with job number 2.
 Monitor Processes
* top or htop finds processes
* ps aux | grep java finds java processes
`,"notes/NIX/Linux-Jobs-&-Processes.md","note","2018-08-13");
search.addDoc(
` SSH without password
 Generate key on the client
Generate a new ssh key
bash
ssh-keygen -t rsa -b 4096 -C your_email@example.com

 Add key to the server
Copy your public key to the servers .ssh/authorized_keys
bash
ssh-copy-id -i ~/.ssh/id_rsa.pub username@remote-server.org

Or append the content of id_rsa.pub to .ssh/authorized_keys manually
bash
cat ~/.ssh/id_rsa.pub | ssh <user>@<hostname> 'cat >> .ssh/authorized_keys'

Now you are all set and can ssh without password from the host to the server.
If you want to use a different key name than the default id_rsa, read on.
 Using different/multiple ssh-keys in complex ways
Add your SSH private key to ssh-agent. 
bash
eval (ssh-agent -s)

bash
ssh-add ~/.ssh/private-key-filename

To retain these settings you need to save them to ~/.ssh/config.
Example ~/.ssh/config:
bash
 GitLab.com server
Host gitlab.com
RSAAuthentication yes
IdentityFile ~/.ssh/config/private-key-filename
User tobias.ericsson
 Private GitLab server
Host gitlab.company.com
RSAAuthentication yes
IdentityFile ~/.ssh/config/another-private-key-filename
StrictHostKeyChecking no
ProxyCommand sshpass -p <password> ssh -v -o PubkeyAuthentication=no -o PreferredAuthentications=password -o StrictHostKeyChecking=no -o PasswordAuthentication=yes -W %h:%p 10.17.67.5
 Gateway / Jumpbox
host 10.65.102.*
ControlMaster auto
ControlPath ~/.ssh_control/%r@%h:%p
ControlPersist yes
 Gateway / Jumbbox 2   
Host 10.205.26.* 
ProxyCommand ssh -q 10.65.102.20 -t (h=%h; echo nc {h} %p)
User tobias.ericsson

 SSH Port forwarding
-L Specifies that the given port on the local (client) host is to be forwarded to the given host and port on the remote side. 
bash
ssh -L 9200:localhost:9200 user@server

 SSH X11 display/screen forwarding
bash
ssh -X user@server

 Troubleshooting
To get X11 forwarding working over ssh, you'll need 3 things in place.
* Your client must be set up to forward X11.
* Your server must be set up to allow X11 forwarding.
* Your server must be able to set up X11 authentication.

echo DISPLAY
localhost:10.0

On the server your /etc/ssh/sshd_config file should have these lines:

X11Forwarding yes
X11DisplayOffset 10

On the client side your ~/.ssh/config file should have these lines:

Host *
  ForwardAgent yes
  ForwardX11 yes

`,"notes/NIX/SSH.md","note","2018-08-13");
search.addDoc(
`rEFInd boot manager
https://www.rodsbooks.com/refind/installing.htmlpackagefile`,"notes/NIX/boot.md","note","2018-08-21");
search.addDoc(
` Resize images

convert -resize 1024X768  source.png dest.png


convert -resize 40% source.png dest.png
`,"notes/NIX/images.md","note","2018-08-13");
search.addDoc(
`Problem booting ubuntu
[   3.516984] bcma: Unsupported SPROM revision: 11
[   3.517071] bcma: bus0: No SPROM available
* add nomodset to boot params (between quiet and splash)
Problem installing GRUB2 (grub-efi-amd64-signed failed installation /target/)
* you need to ensure that a partition of the ‘EFI system partition’ type is mounted at /boot/efi
* disable secure boot in UEFI BIOS
*** Problem with no wireless
* dmesg shows
Broadcom 4352 WLAN found
ERROR: FOUND UNSUPPORTED PHY
* sudo update && sudo apt-get install bcmwl-kernel-source
*** install NVIDIA drivers
ubuntu-drivers devices
sudo ubuntu-drivers autoinstall
`,"notes/NIX/xubuntu.md","note","2018-08-13");
search.addDoc(
`Android Debug Bridge (ADB)
-------------------------
You can find the adb tool in <sdk>/platform-tools/.
Commands:
* devices
* start-server
* kill-server
* logcat
* install -r path\ProjectName.apk
* shell pm uninstall -k com.embarcadero.ProjectName
* adb shell am start -n com.embarcadero.ProjectName/com.embarcadero.firemonkey.FMXNativeActivity
* adb shell am force-stop com.embarcadero.ProjectName
* adb pull <remote> <local>
* adb push foo.txt /sdcard/foo.txt
* adb shell
* adb shell input keyevent 26 (should turn on/off the screen)
* adb shell input text 1234
* adb shell input keyevent 66 (simulate enter key)
http://stackoverflow.com/questions/7789826/adb-shell-input-events
http://delphi.org/2013/11/installing-and-running-android-apps-from-command-line/`,"notes/Old/Android/ADB.md","note","-2016");
search.addDoc(
`Keyboard shortcuts
------------------
CTRL+K	Open git commit changes dialog
CTRL+D	Duplicate current line or selection
[More](https://www.jetbrains.com/idea/help/keyboard-shortcuts-you-cannot-miss.html)`,"notes/Old/CheatSheet/Intellij-IDEA.md","note","-2016");
search.addDoc(
`http://www.viemu.com/a_vi_vim_graphical_cheat_sheet_tutorial.html
Command | Info 
--------|--------------
.       | repeat last
/       | search
:sort   | mark in visual-lines mode then use :sort
CTRL+r  | redo
dd      | delete line
f       | find in line
h,j,k,l | navigate
i       | insert mode
o       | insert mode in new empty line below current one
p       | paste
r       | replace 
u       | undo
v       | visual-lines mode
y       | yank copy
yy      | copies line
d,x	| remove
CTRL+a	| add to number
:%s/search/replace/g | substitute search with replace
G=gg	| auto (re)ident entire document
`,"notes/Old/CheatSheet/Vim.md","note","-2016");
search.addDoc(
`@Grab('org.ccil.cowan.tagsoup:tagsoup:1.2.1')
import org.ccil.cowan.tagsoup.Parser
if (args.length <= 0) {
    println missing filename
    System.exit(1)
}
/* read file from args */
def file = args[0]
def slurper = new XmlSlurper(new Parser())
def rootNode = slurper.parse(new File(file))
def trs = rootNode.depthFirst().findAll { it.name() == 'tr' }
trs.each { it ->
    it.td.eachWithIndex { td, index ->
        println index +   + td
    }
}
`,"notes/Old/Code/Groovy/HtmlParser.groovy","note","-2016");
search.addDoc(
`*There is more than only console.log...
*** Stacktrace
console.trace('name');
*** Display objects as tables
var animals = []
console.table(animals);
https://raygun.io/blog/2015/06/useful-javascript-debugging-tips-you-didnt-know/
https://developer.chrome.com/devtools/docs/commandline-api
`,"notes/Old/Code/JavaScript/Debugging.md","note","-2016");
search.addDoc(
`http://js-spells.noblackmagic.com/
http://politejs.com/jsbox/
http://eloquentjavascript.net/`,"notes/Old/Code/JavaScript/Links.md","note","-2016");
search.addDoc(
`function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}`,"notes/Old/Code/JavaScript/StringUtil.js","note","-2016");
search.addDoc(
`http://conqueringthecommandline.com/book/frontmatter
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
    grep -rnw 'directory' -e pattern
</pre>
-r is recursive, -n is line number and -w stands match the whole word.
Only show file name, not the result itself
<pre>
    grep -rnl '.' -e pattern
</pre>
Directory size
--------------
 10 largest files/directories
du -a /var | sort -n -r | head -n 10
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

sudo apt-get install fortune-mod
fortune

Port Scanning
-------------
 find open ports and running services
nc -zv host.example.com 20-30
 find which server software is running
echo QUIT | nc host.example.com 20-30
http://www.computerhope.com/unix/nc.htm
ngrep -d en0 port 80
ngrep -d any 'error' port syslog
Process Scanning
------------
pgrep ssh
pgrep java
ps -ef |  grep 'tomcat'
process memory and cmd
----------------
ps -FC java
Zombie Defunct process
----------------------
ps aux | grep 'Z'
ps aux --forest
`,"notes/Old/Commands/NIX-commands.md","note","-2016");
search.addDoc(
`WIN + S	or WIN + F	| Search
WIN + M		        | Minimize all
WIN + SHIFT + M     | Revert Minimize all
WIN + R		        | Run ...
WIN + E		        | Explorer
WIN + BREAK	        | Dialog for System Properties
shutdown /s /t 0	| Shutdown
shutdown /r /t 0	| Restart
`,"notes/Old/Commands/WIN-commands.md","note","-2016");
search.addDoc(
`docker ps
docker inspect 
docker stop
docker rm
 Delete all containers
docker rm (docker ps -a -q)
 Delete all images
docker rmi (docker images -q)
(run these commands inside the docker folder)
* docker-compose logs -f
  * Show logs for all services
* docker-compose logs –f [service]
  * Show logs for one service
* docker ps
  * List all running docker containers
* docker-compose
  * help
* docker stats (docker ps | awk '{if(NR>1) print NF}')
  * CPU usage (and more) for running containers 
-d run container in background
-p map port inside container to port on docker host
docker run -d -p 80:5000 training/webapp python app.py
`,"notes/Old/Docker/docker.md","note","-2016");
search.addDoc(
`When you don't want the whole repo you can with core.sparsecheckout checkout only part of a repo.
mkdir <repo> && cd <repo>
git init
git remote add –f origin <url>
git config core.sparsecheckout true
echo some/dir/ >> .git/info/sparse-checkout
git pull <remote> <branch>
git read-tree -mu HEAD
http://jasonkarns.com/blog/subdirectory-checkouts-with-git-sparse-checkout/
`,"notes/Old/Git/Checkout-Subdirectory.md","note","-2016");
search.addDoc(
`Micro-Benchmarking with JMH: Measure, Don’t Guess!
=================================================
 mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=org.openjdk.jmh
      -DarchetypeArtifactId=jmh-java-benchmark-archetype -DarchetypeVersion=1.4.1
      -DgroupId=org.agoncal.sample.jmh -DartifactId=logging -Dversion=1.0
 mvn clean install
 java -jar target/benchmarks.jar
https://www.voxxed.com/blog/2015/01/micro-benchmarking-jmh-measure-dont-guess/
http://hg.openjdk.java.net/code-tools/jmh`,"notes/Old/Java/Micro-Benchmarking.md","note","-2016");
search.addDoc(
`How to determine your version of Tomcat and Java
================================================
<pre>
java -cp lib/catalina.jar org.apache.catalina.util.ServerInfo
</pre>`,"notes/Old/Java/Tomcat.md","note","-2016");
search.addDoc(
` Debug knockout.js context
Instead of using Chrome Knockout plugin use:
ko.dataFor(0);
Where 0 is the selected element
 Mock Your Ajax Requests with Mockjax
http://appendto.com/2010/07/mock-your-ajax-requests-with-mockjax-for-rapid-development/
 Client-side in-memory mongodb backed by localstorage with server sync over http
https://github.com/mWater/minimongo
`,"notes/Old/JavaScript/Debug.md","note","-2016");
search.addDoc(
`Elk is a software stack for processing and searching logs. Elk consists of Elasticsearch, Logstash and Kibana.
Logstash
Logstash is a log processing tool. It supports a variety of inputs, log processing functions and outputs. One of its outputs is typically Elasticsearch.
Logstash runs on JVM and consumes a hefty amount of resources to do so. Many discussions have been floating around regarding Logstash’s significant memory consumption.
lumberjack-input.conf

input {
  lumberjack {
    port => 5000
    type => logs
    ssl_certificate => /etc/pki/tls/certs/logstash-forwarder.crt
    ssl_key => /etc/pki/tls/private/logstash-forwarder.key
  }
}

filter-java.conf

filter for java logs
filter {
  if [type] == java or [type] == sportsbook {
    if empty message then drop it
    if [message] !~ /(.+)/ {
  		drop { }
    }
    make a message that covers multiple lines (like a stack trace) one message
    multiline {
      pattern => ^%{TIMESTAMP_ISO8601}.?%{LOGLEVEL:loglevel}
      negate => true
      important not to mix up multiline logs from different sources
      stream_identity => %{host}.%{file}.%{type}	
      what => previous
    }
    extract time and loglevel from message
    grok {
      matching for example 2015-10-14 02:27:03,096 WARN
      match => { message => %{TIMESTAMP_ISO8601:time}.?%{LOGLEVEL:loglevel} %{GREEDYDATA:log} }
      remove_field => [message]
      add_tag => [ grokked ]
      tag_on_failure => [ misunderstood ]
    }
    make @timestamp match timestamp from log-line
    date {
      match => [ time , ISO8601, yyyy-MM-dd HH:mm:ss,SSS ]
      remove_field => [time]
    }
    mutate {
      rename => [log,message]
    }
    extract stacktrace
    if multiline in [tags] {
		grok {
		    match => [ message , (?m)^.?\n?%{JAVASTACKTRACEPART:stacktrace} ]
		}
    }
  }
}

lumberjack-output.conf

output {
  elasticsearch { host => localhost }
  stdout { codec => rubydebug }
}

Logstash-forwarder
Logstash Forwarder serves as a lightweight log forwarding agent that utilizes the lumberjack networking protocol to communicate with Logstash.
Logstash Forwarder is designed to be tiny, incredibly memory conservative and very, very fast.
* Mandatory security via SSL encryption, need ssl_certificate.
logstash-forwarder.conf:

{
network: {
        servers: [
            my-elk-server:5000
        ],
        timeout: 15,
        ssl ca: /etc/pki/tls/certs/logstash-forwarder.crt
    },
    files: [
        {
            paths: [
                /var/log/messages,
                /var/log/secure
            ],
            fields: {
                type: syslog
            }
        },
	{
            paths: [
                /opt/mobenga/tomcat/logs/catalina.out
            ],
            fields: {
                type: sportsbook
            }
        }
    ]
}

Elasticsearch
Elasticsearch is a full text search engine based on Lucene.
Elasticsearch query syntax:

{
    query: {
        bool: {
            must: [
                {
                    term: {
                        sportsbook.type.raw: sportsbook
                    }
                },
                {
                    term: {
                        sportsbook.loglevel.raw: ERROR
                    }
                }
            ],
            must_not: [],
            should: []
        }
    }
}

/etc/security/limits.conf:
elasticsearch - nofile 65535
elasticsearch - memlock unlimited
/etc/sysconfig/elasticsearch
 Heap Size (defaults to 256m min, 1g max)
ES_HEAP_SIZE=1g
 Maximum number of open files
MAX_OPEN_FILES=65535
 Maximum amount of locked memory
MAX_LOCKED_MEMORY=unlimited
/etc/elasticsearch/elasticsearch.yml:
bootstrap.mlockall: true
Kibana
Kibana is a web interface for searching and making dashboards out of the data stored in elasticsearch.
Kibana syntax (field:searchstring)

type:java OR loglevel:info AND message: *calling*
type:java AND message:*session*
message: *0084365 0003242*

Problems
root@coral-ext-bb:/etc ls -hla /opt/mobenga/tomcat/logs/catalina.out 
-rw-r--r-- 1 tomcat tomcat 2.6G Oct 20 12:37 /opt/mobenga/tomcat/logs/catalina.out
logstash-forwarder:
2015/10/20 12:35:09.503230 Connecting to [10.99.28.117]:5000 (elk-coral.staging.mobenga.net) 
2015/10/20 12:35:24.504272 Failed to tls handshake with 10.99.28.117 read tcp 10.99.28.117:5000: i/o timeout
logstash:
{:timestamp=>2015-10-20T12:32:48.357000+0200, :message=>Lumberjack input: the pipeline is blocked, temporary refusing new connection., :level=>:warn}
Multiline stream_identity
More resources
https://ruin.io/2015/elk-in-production/
https://www.digitalocean.com/community/tutorials/how-to-install-elasticsearch-logstash-and-kibana-4-on-centos-7
https://www.elastic.co/blog/using-elasticsearch-and-logstash-to-serve-billions-of-searchable-events-for-customers
`,"notes/Old/Logs/ELK.md","note","-2016");
search.addDoc(
`All we need is to configure package.json and use npm
http://gon.to/2015/02/26/gulp-is-awesome-but-do-we-really-need-it/`,"notes/Old/Nodejs/Gulp-not-needed.md","note","-2016");
search.addDoc(
`<pre>
    npm install watch -g
</pre>
Usage: watch <command> [directory] [--wait=<seconds>]
Example:
<pre>
    watch npm run build js --wait=15
</pre>`,"notes/Old/Nodejs/How-to-watch.md","note","-2016");
search.addDoc(
`PM2 provides an easy way to manage and daemonize applications (run them as a service).
sudo npm install pm2 -g
pm2 start node-server.js
pm2 startup ubuntu
sudo env PATH=PATH:/usr/bin pm2 startup ubuntu -u tibbe
https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps
http://www.ubtutorials.com/tutorial/1111/how-set-nodejs-application-production-ubuntu-1404
`,"notes/Old/Nodejs/Run-as-service.md","note","-2016");
search.addDoc(
`How to quickly setup a static file server?
------------------------------------------

npm install http-server -g

To use it:

cd D:\Folder
http-server

Or, like this:

http-server D:\Folder

`,"notes/Old/Nodejs/Static-file-server.md","note","-2016");
search.addDoc(
`Apache Benchmark (AB) 
=====================

ab -k -c 150 -n 2000 example.com/

By issuing the command above, you will be hitting http://example.com/ with 150 simultaneous connections until 2000 requests are met. It will be done using the keep alive header.
`,"notes/Old/Performance/AB-apache2-utils.md","note","-2016");
search.addDoc(
`Apache JMeter may be used to test performance both on static and dynamic resources.
It can be used to simulate a heavy load on a server, group of servers, network or object to test its strength
or to analyze overall performance under different load types.
You can use it to make a graphical analysis of performance or to test your server/script/object
behavior under heavy concurrent load.
http://jmeter.apache.org/
Running without GUI
-------------------
jmeter -n -t your_script.jmx -l your_log_file.csv
example:
jmeter -n -t d:\dev\jmeter-configs\PerformanceTestPlanMemoryThread.jmx -l test.csv
`,"notes/Old/Performance/JMeter.md","note","-2016");
search.addDoc(
`<?xml version=1.0 encoding=UTF-8?>
<jmeterTestPlan version=1.2 properties=2.6 jmeter=2.11 r1554548>
  <hashTree>
    <TestPlan guiclass=TestPlanGui testclass=TestPlan testname=build-web-test-plan enabled=true>
      <stringProp name=TestPlan.comments></stringProp>
      <boolProp name=TestPlan.functional_mode>false</boolProp>
      <boolProp name=TestPlan.serialize_threadgroups>false</boolProp>
      <elementProp name=TestPlan.user_defined_variables elementType=Arguments guiclass=ArgumentsPanel testclass=Arguments testname=User Defined Variables enabled=true>
        <collectionProp name=Arguments.arguments/>
      </elementProp>
      <stringProp name=TestPlan.user_define_classpath></stringProp>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass=ThreadGroupGui testclass=ThreadGroup testname=Threads and Users enabled=true>
        <stringProp name=ThreadGroup.on_sample_error>continue</stringProp>
        <elementProp name=ThreadGroup.main_controller elementType=LoopController guiclass=LoopControlPanel testclass=LoopController testname=Loop Controller enabled=true>
          <boolProp name=LoopController.continue_forever>false</boolProp>
          <stringProp name=LoopController.loops>2</stringProp>
        </elementProp>
        <stringProp name=ThreadGroup.num_threads>5</stringProp>
        <stringProp name=ThreadGroup.ramp_time>5</stringProp>
        <longProp name=ThreadGroup.start_time>1373789594000</longProp>
        <longProp name=ThreadGroup.end_time>1373789594000</longProp>
        <boolProp name=ThreadGroup.scheduler>false</boolProp>
        <stringProp name=ThreadGroup.duration></stringProp>
        <stringProp name=ThreadGroup.delay></stringProp>
      </ThreadGroup>
      <hashTree>
        <ConfigTestElement guiclass=HttpDefaultsGui testclass=ConfigTestElement testname=HTTP Requests enabled=true>
          <elementProp name=HTTPsampler.Arguments elementType=Arguments guiclass=HTTPArgumentsPanel testclass=Arguments testname=User Defined Variables enabled=true>
            <collectionProp name=Arguments.arguments/>
          </elementProp>
          <stringProp name=HTTPSampler.domain>google.com</stringProp>
          <stringProp name=HTTPSampler.port></stringProp>
          <stringProp name=HTTPSampler.connect_timeout></stringProp>
          <stringProp name=HTTPSampler.response_timeout></stringProp>
          <stringProp name=HTTPSampler.protocol></stringProp>
          <stringProp name=HTTPSampler.contentEncoding></stringProp>
          <stringProp name=HTTPSampler.path></stringProp>
          <boolProp name=HTTPSampler.image_parser>true</boolProp>
          <stringProp name=HTTPSampler.concurrentPool>4</stringProp>
        </ConfigTestElement>
        <hashTree/>
        <HTTPSamplerProxy guiclass=HttpTestSampleGui testclass=HTTPSamplerProxy testname=/index enabled=true>
          <elementProp name=HTTPsampler.Arguments elementType=Arguments guiclass=HTTPArgumentsPanel testclass=Arguments testname=Variables pré-définies enabled=true>
            <collectionProp name=Arguments.arguments/>
          </elementProp>
          <stringProp name=HTTPSampler.domain></stringProp>
          <stringProp name=HTTPSampler.port></stringProp>
          <stringProp name=HTTPSampler.connect_timeout></stringProp>
          <stringProp name=HTTPSampler.response_timeout></stringProp>
          <stringProp name=HTTPSampler.protocol></stringProp>
          <stringProp name=HTTPSampler.contentEncoding></stringProp>
          <stringProp name=HTTPSampler.path>/cz_cz/index</stringProp>
          <stringProp name=HTTPSampler.method>GET</stringProp>
          <boolProp name=HTTPSampler.follow_redirects>true</boolProp>
          <boolProp name=HTTPSampler.auto_redirects>false</boolProp>
          <boolProp name=HTTPSampler.use_keepalive>true</boolProp>
          <boolProp name=HTTPSampler.DO_MULTIPART_POST>false</boolProp>
          <boolProp name=HTTPSampler.monitor>false</boolProp>
          <stringProp name=HTTPSampler.embedded_url_re></stringProp>
        </HTTPSamplerProxy>
        <hashTree/>
        <HTTPSamplerProxy guiclass=HttpTestSampleGui testclass=HTTPSamplerProxy testname=/index.json enabled=true>
          <elementProp name=HTTPsampler.Arguments elementType=Arguments guiclass=HTTPArgumentsPanel testclass=Arguments testname=Variables pré-définies enabled=true>
            <collectionProp name=Arguments.arguments/>
          </elementProp>
          <stringProp name=HTTPSampler.domain></stringProp>
          <stringProp name=HTTPSampler.port></stringProp>
          <stringProp name=HTTPSampler.connect_timeout></stringProp>
          <stringProp name=HTTPSampler.response_timeout></stringProp>
          <stringProp name=HTTPSampler.protocol></stringProp>
          <stringProp name=HTTPSampler.contentEncoding></stringProp>
          <stringProp name=HTTPSampler.path>/cz_cz/index.json</stringProp>
          <stringProp name=HTTPSampler.method>GET</stringProp>
          <boolProp name=HTTPSampler.follow_redirects>true</boolProp>
          <boolProp name=HTTPSampler.auto_redirects>false</boolProp>
          <boolProp name=HTTPSampler.use_keepalive>true</boolProp>
          <boolProp name=HTTPSampler.DO_MULTIPART_POST>false</boolProp>
          <boolProp name=HTTPSampler.monitor>false</boolProp>
          <stringProp name=HTTPSampler.embedded_url_re></stringProp>
        </HTTPSamplerProxy>
        <hashTree/>
        <HTTPSamplerProxy guiclass=HttpTestSampleGui testclass=HTTPSamplerProxy testname=/iveAndUpcoming enabled=true>
          <elementProp name=HTTPsampler.Arguments elementType=Arguments guiclass=HTTPArgumentsPanel testclass=Arguments testname=Variables pré-définies enabled=true>
            <collectionProp name=Arguments.arguments/>
          </elementProp>
          <stringProp name=HTTPSampler.domain></stringProp>
          <stringProp name=HTTPSampler.port></stringProp>
          <stringProp name=HTTPSampler.connect_timeout></stringProp>
          <stringProp name=HTTPSampler.response_timeout></stringProp>
          <stringProp name=HTTPSampler.protocol></stringProp>
          <stringProp name=HTTPSampler.contentEncoding></stringProp>
          <stringProp name=HTTPSampler.path>/cz_cz/liveAndUpcoming</stringProp>
          <stringProp name=HTTPSampler.method>GET</stringProp>
          <boolProp name=HTTPSampler.follow_redirects>true</boolProp>
          <boolProp name=HTTPSampler.auto_redirects>false</boolProp>
          <boolProp name=HTTPSampler.use_keepalive>true</boolProp>
          <boolProp name=HTTPSampler.DO_MULTIPART_POST>false</boolProp>
          <boolProp name=HTTPSampler.monitor>false</boolProp>
          <stringProp name=HTTPSampler.embedded_url_re></stringProp>
        </HTTPSamplerProxy>
        <hashTree/>
        <HTTPSamplerProxy guiclass=HttpTestSampleGui testclass=HTTPSamplerProxy testname=Login enabled=false>
          <elementProp name=HTTPsampler.Arguments elementType=Arguments guiclass=HTTPArgumentsPanel testclass=Arguments testname=Variables pré-définies enabled=true>
            <collectionProp name=Arguments.arguments>
              <elementProp name=username elementType=HTTPArgument>
                <boolProp name=HTTPArgument.always_encode>true</boolProp>
                <stringProp name=Argument.value>johndoe</stringProp>
                <stringProp name=Argument.metadata>=</stringProp>
                <boolProp name=HTTPArgument.use_equals>true</boolProp>
                <stringProp name=Argument.name>username</stringProp>
              </elementProp>
              <elementProp name=password elementType=HTTPArgument>
                <boolProp name=HTTPArgument.always_encode>true</boolProp>
                <stringProp name=Argument.value>secret</stringProp>
                <stringProp name=Argument.metadata>=</stringProp>
                <boolProp name=HTTPArgument.use_equals>true</boolProp>
                <stringProp name=Argument.name>password</stringProp>
              </elementProp>
            </collectionProp>
          </elementProp>
          <stringProp name=HTTPSampler.domain>www.example.com</stringProp>
          <stringProp name=HTTPSampler.port></stringProp>
          <stringProp name=HTTPSampler.connect_timeout></stringProp>
          <stringProp name=HTTPSampler.response_timeout></stringProp>
          <stringProp name=HTTPSampler.protocol></stringProp>
          <stringProp name=HTTPSampler.contentEncoding></stringProp>
          <stringProp name=HTTPSampler.path>/loginform.html</stringProp>
          <stringProp name=HTTPSampler.method>POST</stringProp>
          <boolProp name=HTTPSampler.follow_redirects>true</boolProp>
          <boolProp name=HTTPSampler.auto_redirects>false</boolProp>
          <boolProp name=HTTPSampler.use_keepalive>true</boolProp>
          <boolProp name=HTTPSampler.DO_MULTIPART_POST>false</boolProp>
          <boolProp name=HTTPSampler.monitor>false</boolProp>
          <stringProp name=HTTPSampler.embedded_url_re></stringProp>
        </HTTPSamplerProxy>
        <hashTree/>
        <HTTPSamplerProxy guiclass=HttpTestSampleGui testclass=HTTPSamplerProxy testname=/iveAndUpcoming.json enabled=true>
          <elementProp name=HTTPsampler.Arguments elementType=Arguments guiclass=HTTPArgumentsPanel testclass=Arguments testname=Variables pré-définies enabled=true>
            <collectionProp name=Arguments.arguments/>
          </elementProp>
          <stringProp name=HTTPSampler.domain></stringProp>
          <stringProp name=HTTPSampler.port></stringProp>
          <stringProp name=HTTPSampler.connect_timeout></stringProp>
          <stringProp name=HTTPSampler.response_timeout></stringProp>
          <stringProp name=HTTPSampler.protocol></stringProp>
          <stringProp name=HTTPSampler.contentEncoding></stringProp>
          <stringProp name=HTTPSampler.path>/cz_cz/liveAndUpcoming.json</stringProp>
          <stringProp name=HTTPSampler.method>GET</stringProp>
          <boolProp name=HTTPSampler.follow_redirects>true</boolProp>
          <boolProp name=HTTPSampler.auto_redirects>false</boolProp>
          <boolProp name=HTTPSampler.use_keepalive>true</boolProp>
          <boolProp name=HTTPSampler.DO_MULTIPART_POST>false</boolProp>
          <boolProp name=HTTPSampler.monitor>false</boolProp>
          <stringProp name=HTTPSampler.embedded_url_re></stringProp>
        </HTTPSamplerProxy>
        <hashTree/>
      </hashTree>
      <ResultCollector guiclass=TableVisualizer testclass=ResultCollector testname=View Results in Table enabled=true>
        <boolProp name=ResultCollector.error_logging>false</boolProp>
        <objProp>
          <value class=SampleSaveConfiguration>
            <time>true</time>
            <latency>true</latency>
            <timestamp>true</timestamp>
            <success>true</success>
            <label>true</label>
            <code>true</code>
            <message>true</message>
            <threadName>true</threadName>
            <dataType>true</dataType>
            <encoding>false</encoding>
            <assertions>true</assertions>
            <subresults>true</subresults>
            <responseData>false</responseData>
            <samplerData>false</samplerData>
            <xml>false</xml>
            <fieldNames>false</fieldNames>
            <responseHeaders>false</responseHeaders>
            <requestHeaders>false</requestHeaders>
            <responseDataOnError>false</responseDataOnError>
            <saveAssertionResultsFailureMessage>false</saveAssertionResultsFailureMessage>
            <assertionsResultsToSave>0</assertionsResultsToSave>
            <bytes>true</bytes>
          </value>
        </objProp>
        <stringProp name=filename></stringProp>
      </ResultCollector>
      <hashTree/>
      <ResultCollector guiclass=SummaryReport testclass=ResultCollector testname=Summary Report enabled=true>
        <boolProp name=ResultCollector.error_logging>false</boolProp>
        <objProp>
          <value class=SampleSaveConfiguration>
            <time>true</time>
            <latency>true</latency>
            <timestamp>true</timestamp>
            <success>true</success>
            <label>true</label>
            <code>true</code>
            <message>true</message>
            <threadName>true</threadName>
            <dataType>true</dataType>
            <encoding>false</encoding>
            <assertions>true</assertions>
            <subresults>true</subresults>
            <responseData>false</responseData>
            <samplerData>false</samplerData>
            <xml>false</xml>
            <fieldNames>false</fieldNames>
            <responseHeaders>false</responseHeaders>
            <requestHeaders>false</requestHeaders>
            <responseDataOnError>false</responseDataOnError>
            <saveAssertionResultsFailureMessage>false</saveAssertionResultsFailureMessage>
            <assertionsResultsToSave>0</assertionsResultsToSave>
            <bytes>true</bytes>
          </value>
        </objProp>
        <stringProp name=filename>D:\docs\summary</stringProp>
      </ResultCollector>
      <hashTree/>
    </hashTree>
  </hashTree>
</jmeterTestPlan>
`,"notes/Old/Performance/JMeterExampleTestPlan.jmx","note","-2016");
search.addDoc(
`How to benchmark system-performance
===================================

openssl speed

How to benchmark remote connections
===================================

openssl s_time -connect remote.host:443

 retrieve remote test.html page using only new sessions

openssl s_time -connect remote.host:443 -www /test.html -new

https://www.madboa.com/geek/openssl/how-do-i-benchmark-my-system-s-performance
`,"notes/Old/Performance/OpenSSL.md","note","-2016");
search.addDoc(
`autojump - a faster way to navigate your filesystem
https://github.com/joelthelion/autojump
j foo
jc bar
jo music
jco images
git clone git://github.com/joelthelion/autojump.git
cd autojump
./install.py or ./uninstall.py
`,"notes/Old/Productivity/Autojump.md","note","-2016");
search.addDoc(
`[Read about it here](http://productiveblog.tumblr.com/)
`,"notes/Old/Productivity/How-to-be-productive.md","note","-2016");
search.addDoc(
`Ranger
http://ranger.nongnu.org/ranger.1.html
create new file:
<INSERT>
For example, to create a new file when Ins is pressed, add this to ~/.config/ranger/rc.conf:
map <INSERT> console touch
delete a file:
<DELETE>
If you type S (capital), ranger will start a subshell in the directory you're browsing. 
You can then ctrl-d or type exit to close the subshell and return to browsing in ranger.
`,"notes/Old/Productivity/Ranger.md","note","-2016");
search.addDoc(
`Use LastPass!
-------------
With LastPass you have only one (master) password to remember.
https://lastpass.com/`,"notes/Old/Security/LastPass.md","note","-2016");
search.addDoc(
`SSH - without password
----------------------
On the host
-----------
Firstly check if id_rsa.pub and id_rsa exists in ~/.ssh. If the file exists skip step 2.
Generate your public/private keys using ssh-keygen

ssh-keygen -t rsa

Now copy the id_rsa.pub to the .ssh directory of the remote host (for instance to the homefolder via scp/sftp)
On the server
-------------
Append the content of id_rsa.pub to .ssh/authorized_keys2

cat id_rsa.pub >> .ssh/authorized_keys2

Now you are all set and can ssh without password from the host to the server.
Port forwarding
---------------
-L Specifies that the given port on the local (client) host is to be forwarded to the given host and port on the remote side.
ssh -L 9200:localhost:9200 user@server
`,"notes/Old/Security/SSH.md","note","-2016");
search.addDoc(
` Generate box-shadow or gradients
http://www.cssmatic.com/box-shadow
http://www.cssmatic.com/gradient-generator
http://www.designscripting.com/webtools/css3/generator/
http://www.w3schools.com/tags/ref_colormixer.asp`,"notes/Old/Style/CSS.md","note","-2016");
search.addDoc(
`http://css-tricks.com/favicon-quiz/
http://realfavicongenerator.net/`,"notes/Old/Style/favicon.ico.md","note","-2016");
search.addDoc(
`Disable Hibernation / Remove hiberfil.sys
=========================================
 To delete the hibernate.sys file
Open Power Options window
(Ctrl +R | powercfg.cpl)
Change plan settings
Make sure that hibernate is not used
Must be administartor to run
C:\windows\system32>powercfg -h off
 To turn on hibernation again
C:\windows\system32>powercfg -h on
http://tekeye.biz/2014/hiberfil-sys-windows-8-1-delete
`,"notes/Old/Windows/Hibernate.md","note","-2016");
search.addDoc(
`http://www.fosshub.com/WinDirStat.html`,"notes/Old/Windows/Links.md","note","-2016");
search.addDoc(
`Show wireless profiles
<pre>
    netsh wlan show profiles
</pre>
Show security key
<pre>
    netsh wlan show profile name=“ProfileName” key=clear
</pre>
http://windows.microsoft.com/en-us/windows-8/manage-wireless-network-profiles`,"notes/Old/Windows/Manage-Wireless-Networks.md","note","-2016");

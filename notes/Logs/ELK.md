
Elk is a software stack for processing and searching logs. Elk consists of Elasticsearch, Logstash and Kibana.

###Logstash
Logstash is a log processing tool. It supports a variety of inputs, log processing functions and outputs. One of its outputs is typically Elasticsearch.
Logstash runs on JVM and consumes a hefty amount of resources to do so. Many discussions have been floating around regarding Logstash’s significant memory consumption.

lumberjack-input.conf
```
input {
  lumberjack {
    port => 5000
    type => "logs"
    ssl_certificate => "/etc/pki/tls/certs/logstash-forwarder.crt"
    ssl_key => "/etc/pki/tls/private/logstash-forwarder.key"
  }
}
```

filter-java.conf
```
#filter for java logs
filter {
  if [type] == "java" or [type] == "sportsbook" {
    #if empty message then drop it
    if [message] !~ /(.+)/ {
  		drop { }
    }

    #make a message that covers multiple lines (like a stack trace) one message
    multiline {
      pattern => "^%{TIMESTAMP_ISO8601}.?%{LOGLEVEL:loglevel}"
      negate => true
      #important not to mix up multiline logs from different sources
      stream_identity => "%{host}.%{file}.%{type}"	
      what => "previous"
    }

    #extract time and loglevel from message
    grok {
      #matching for example 2015-10-14 02:27:03,096 WARN
      match => { "message" => "%{TIMESTAMP_ISO8601:time}.?%{LOGLEVEL:loglevel} %{GREEDYDATA:log}" }
      remove_field => ["message"]
      add_tag => [ "grokked" ]
      tag_on_failure => [ "misunderstood" ]
    }

    #make @timestamp match timestamp from log-line
    date {
      match => [ "time" , "ISO8601", "yyyy-MM-dd HH:mm:ss,SSS" ]
      remove_field => ["time"]
    }

    mutate {
      rename => ["log","message"]
    }

    #extract stacktrace
    if "multiline" in [tags] {
		grok {
		    match => [ "message" , "(?m)^.?\n?%{JAVASTACKTRACEPART:stacktrace}" ]
		}
    }

  }
}


```

lumberjack-output.conf
```
output {
  elasticsearch { host => localhost }
  stdout { codec => rubydebug }
}
```


###Logstash-forwarder
Logstash Forwarder serves as a lightweight log forwarding agent that utilizes the lumberjack networking protocol to communicate with Logstash.
Logstash Forwarder is designed to be tiny, incredibly memory conservative and very, very fast.

* Mandatory security via SSL encryption, need ssl_certificate.

logstash-forwarder.conf:
```
{
"network": {
        "servers": [
            "my-elk-server:5000"
        ],
        "timeout": 15,
        "ssl ca": "/etc/pki/tls/certs/logstash-forwarder.crt"
    },
    "files": [
        {
            "paths": [
                "/var/log/messages",
                "/var/log/secure"
            ],
            "fields": {
                "type": "syslog"
            }
        },
	{
            "paths": [
                "/opt/mobenga/tomcat/logs/catalina.out"
            ],
            "fields": {
                "type": "sportsbook"
            }
        }

    ]
}
```

###Elasticsearch
Elasticsearch is a full text search engine based on Lucene.

Elasticsearch query syntax:
```
{
    "query": {
        "bool": {
            "must": [
                {
                    "term": {
                        "sportsbook.type.raw": "sportsbook"
                    }
                },
                {
                    "term": {
                        "sportsbook.loglevel.raw": "ERROR"
                    }
                }
            ],
            "must_not": [],
            "should": []
        }
    }
}
```

#/etc/security/limits.conf:
elasticsearch - nofile 65535
elasticsearch - memlock unlimited

#/etc/sysconfig/elasticsearch
### Heap Size (defaults to 256m min, 1g max)
ES_HEAP_SIZE=1g
### Maximum number of open files
MAX_OPEN_FILES=65535

### Maximum amount of locked memory
MAX_LOCKED_MEMORY=unlimited

#/etc/elasticsearch/elasticsearch.yml:
bootstrap.mlockall: true


###Kibana
Kibana is a web interface for searching and making dashboards out of the data stored in elasticsearch.

Kibana syntax (field:searchstring)
```
type:java OR loglevel:info AND message: *calling*
type:java AND message:*session*
message: *0084365 0003242*
```

###Problems
root@coral-ext-bb:/etc# ls -hla /opt/mobenga/tomcat/logs/catalina.out 
-rw-r--r-- 1 tomcat tomcat 2.6G Oct 20 12:37 /opt/mobenga/tomcat/logs/catalina.out

logstash-forwarder:
2015/10/20 12:35:09.503230 Connecting to [10.99.28.117]:5000 (elk-coral.staging.mobenga.net) 
2015/10/20 12:35:24.504272 Failed to tls handshake with 10.99.28.117 read tcp 10.99.28.117:5000: i/o timeout

logstash:
{:timestamp=>"2015-10-20T12:32:48.357000+0200", :message=>"Lumberjack input: the pipeline is blocked, temporary refusing new connection.", :level=>:warn}

Multiline stream_identity


###More resources
https://ruin.io/2015/elk-in-production/

https://www.digitalocean.com/community/tutorials/how-to-install-elasticsearch-logstash-and-kibana-4-on-centos-7

https://www.elastic.co/blog/using-elasticsearch-and-logstash-to-serve-billions-of-searchable-events-for-customers



 


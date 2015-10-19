
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

###Kibana
Kibana is a web interface for searching and making dashboards out of the data stored in elasticsearch.



###More resources
https://ruin.io/2015/elk-in-production/
https://www.digitalocean.com/community/tutorials/how-to-install-elasticsearch-logstash-and-kibana-4-on-centos-7




 


Apache Benchmark (AB) 
=====================
```
ab -k -c 150 -n 2000 example.com/
```

By issuing the command above, you will be hitting http://example.com/ with 150 simultaneous connections until 2000 requests are met. It will be done using the keep alive header.

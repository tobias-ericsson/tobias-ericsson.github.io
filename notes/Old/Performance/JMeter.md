Apache JMeter may be used to test performance both on static and dynamic resources.

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

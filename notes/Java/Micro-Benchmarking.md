Micro-Benchmarking with JMH: Measure, Don’t Guess!
=================================================

$ mvn archetype:generate -DinteractiveMode=false -DarchetypeGroupId=org.openjdk.jmh
      -DarchetypeArtifactId=jmh-java-benchmark-archetype -DarchetypeVersion=1.4.1
      -DgroupId=org.agoncal.sample.jmh -DartifactId=logging -Dversion=1.0

$ mvn clean install
$ java -jar target/benchmarks.jar

https://www.voxxed.com/blog/2015/01/micro-benchmarking-jmh-measure-dont-guess/

http://hg.openjdk.java.net/code-tools/jmh
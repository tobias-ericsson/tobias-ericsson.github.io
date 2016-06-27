
$ docker ps
$ docker inspect 
$ docker stop
$ docker rm


-d run container in background
-p map port inside container to port on docker host
$ docker run -d -p 80:5000 training/webapp python app.py

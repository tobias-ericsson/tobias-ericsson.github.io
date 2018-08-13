
docker ps
docker inspect 
docker stop
docker rm

# Delete all containers
docker rm $(docker ps -a -q)
# Delete all images
docker rmi $(docker images -q)

(run these commands inside the docker folder)
* `docker-compose logs -f`
  * Show logs for all services
* `docker-compose logs –f [service]`
  * Show logs for one service
* `docker ps`
  * List all running docker containers
* `docker-compose`
  * help
* `docker stats $(docker ps | awk '{if(NR>1) print $NF}')`
  * CPU usage (and more) for running containers 



-d run container in background
-p map port inside container to port on docker host
docker run -d -p 80:5000 training/webapp python app.py


## For information

```
docker stats
docker inspect [OPTIONS] NAME|ID [NAME|ID...]
docker container ls (or old way docker ps)
docker ps --format "{{.Names}}" (only names)
docker image ls
docker volume ls
docker network ls
```

## For going inside a docker container

```
docker exec -it <containerIdOrName> bash (or /bin/bash or /bin/ash)
```

## For cleaning 

```
docker [image,container,volume,..] prune -a
```

### Delete all containers
```
docker rm $(docker ps -a -q)
```
### Delete all images
```
docker rmi $(docker images -q)
```



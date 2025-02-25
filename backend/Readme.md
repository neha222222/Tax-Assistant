After creatig the Dockerfile

1) Build an image of it 
```
docker build -t pulpy .
```

2) Now we need to run it
```
docker ps # to check all docker continer running
docker image ls
docker container ls
docker run -i -t 8dbd9e392a96 /bin/bash # for ubuntu
```

3) Stopping a docker container
docker stop <cont_id>
docker rmi -f <img_id>
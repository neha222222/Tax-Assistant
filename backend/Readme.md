After creatig the Dockerfile

1) Build an image of it 
```
docker build -t tubechat .
```

2) Running the docker container
```
docker run -d -p 8000:8000 tubechat
```

the server will be running on http://localhost:8000
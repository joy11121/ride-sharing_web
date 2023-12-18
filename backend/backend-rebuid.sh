

#CONTAINER_LIST=`docker ps -a -q`
docker stop tsmcool-backend
sleep 1

docker rm tsmcool-backend

sleep 1

docker rmi tsmcool:backend

sleep 1

docker build . -t tsmcool:backend

sleep 2

#export MONGODB_VERSION=6.0-ubi8
#docker run --name mongodb -d mongodb/mongodb-community-server:$MONGODB_VERSION
#docker run --name tsmcool-mongodb -d -p 27017:27017 tsmcool-mongodb

sleep 2

#docker run -a stdout --name tsmcool-backend tsmcool:backend 
docker run -d -p 8888:8888 --name tsmcool-backend tsmcool:backend 


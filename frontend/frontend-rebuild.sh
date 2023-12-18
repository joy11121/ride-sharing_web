

#CONTAINER_LIST=`docker ps -a -q`
docker stop tsmcool-frontend
sleep 1

docker rm tsmcool-frontend

sleep 1

docker rmi tsmcool:frontend

sleep 1

docker build . -t tsmcool:frontend

sleep 2

#export MONGODB_VERSION=6.0-ubi8
#docker run --name mongodb -d mongodb/mongodb-community-server:$MONGODB_VERSION
#docker run --name tsmcool-mongodb -d -p 27017:27017 tsmcool-mongodb

sleep 2

docker run -d -p 3000:3000 --name tsmcool-frontend tsmcool:frontend 


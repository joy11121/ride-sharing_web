#CONTAINER_LIST=`docker ps -a -q`
docker stop joy11121/tsmcool-backend
sleep 1

docker rm joy11121/tsmcool-backend

sleep 1

docker rmi joy11121/tsmcool-backend

sleep 1

docker build . -t joy11121/tsmcool-backend

sleep 2

#export MONGODB_VERSION=6.0-ubi8
#docker run --name mongodb -d mongodb/mongodb-community-server:$MONGODB_VERSION
#docker run --name tsmcool-mongodb -d -p 27017:27017 tsmcool-mongodb

sleep 2

#docker run -a stdout --name tsmcool-backend tsmcool:backend 
#docker run -p 80:80  --name tsmcool-backend joy11121/tsmcool-backend 

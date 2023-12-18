# base image
FROM node:16
# create app directory inside container
#WORKDIR /backend
#COPY package*.json ./
COPY . /backend
WORKDIR /backend
RUN npm install
#COPY . .

# Expose a port
EXPOSE 8888
CMD ["npm","start"]

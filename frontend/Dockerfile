# base image
FROM node:16
# create app directory inside container
WORKDIR /frontend
#COPY package*.json ./
COPY . .
#RUN npm install -g npm@10.2.5
RUN yarn install
RUN yarn build
#COPY . .

# Expose a port
EXPOSE 3000
CMD ["yarn","start"]

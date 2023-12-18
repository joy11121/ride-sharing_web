# base image
FROM node:16
# create app directory inside container
#COPY package*.json ./
COPY . /backend
WORKDIR /backend
RUN npm install
#COPY . .

# Expose a port
EXPOSE 80
ENV PORT 80
CMD ["npm","start"]

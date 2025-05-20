# Use an official node.js runtime as a parent image
# Image -> snapshot of a seperate instruction sheet
# Not Multi Staged

FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD  ["node", "./src/server.js"]
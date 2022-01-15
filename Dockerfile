FROM node:12-alpine

WORKDIR /app

COPY package*.json ./



RUN npm install

COPY . .
COPY swagger.json .

EXPOSE 3000
CMD npm start
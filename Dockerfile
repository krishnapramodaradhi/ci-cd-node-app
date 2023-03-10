FROM node:18-alpine3.17

WORKDIR /app

COPY . ./

EXPOSE 3000

CMD [ "node", "server.js"]
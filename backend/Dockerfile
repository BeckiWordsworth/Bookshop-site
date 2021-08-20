FROM node:10.16.3-jessie

WORKDIR /app/server/

COPY package.json /app/server/

RUN npm install

COPY * /app/server/

CMD npm run start
FROM node:8

RUN mkdir /app
WORKDIR /app

RUN apt-get update && apt-get install -y \
        sqlite3
RUN mkdir /db
RUN sqlite3 /db/client.db

COPY package.json /app
RUN npm install
COPY . /app

EXPOSE 8081

CMD ["npm", "start"]
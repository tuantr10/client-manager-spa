FROM node:6.11.3

RUN mkdir /app
WORKDIR /app

RUN apt-get update && apt-get install -y \
        sqlite3
RUN mkdir /app/db

COPY package.json /app
RUN npm install -g node-gyp
RUN npm install
COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
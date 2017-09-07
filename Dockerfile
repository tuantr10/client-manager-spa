FROM node:6.11.1

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

EXPOSE 8081

CMD ["npm", "start"]
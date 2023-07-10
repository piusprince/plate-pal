ARG NODE_VESRION=16-alpine3.12

FROM node:${NODE_VESRION}

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
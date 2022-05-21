FROM node:16.15.0-alpine3.15 AS base

WORKDIR /app

COPY . /app

RUN npm install --quiet

RUN npm run build
RUN npm prune --production

USER node

EXPOSE 8000

CMD ["npm", "start"]

FROM node:lts-alpine3.16

WORKDIR /app

COPY . /app

RUN npm install --quiet

RUN npm run build
RUN npm prune --production

USER node

EXPOSE 8000

CMD ["npm", "start"]

FROM node:lts-alpine
WORKDIR /app
COPY . /app
RUN npm install --quiet
RUN npm run build
RUN npm prune --production

EXPOSE 8000

CMD ["npm", "start"]

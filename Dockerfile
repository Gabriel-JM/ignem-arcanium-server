FROM node:lts-alpine3.17 AS build
WORKDIR /app
COPY . /app
RUN npm install --quiet
RUN npm run build

FROM node:lts-alpine3.17 AS release
WORKDIR /release
COPY --from=build /build/package*.json ./
RUN npm ci --only=production

FROM node:lts-alpine3.17
WORKDIR /app
COPY --from=release /release/node_modules ./node_modules
COPY --from=release /release/package.json .
COPY --from=build /build/dist ./dist

EXPOSE 8000

CMD ["npm", "start"]

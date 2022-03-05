FROM node:16.13-alpine3.15 As development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:16.13-alpine3.15 As production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV SERVER_PORT=${SERVER_PORT}
ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}
ENV PG_CONNECTION_STRING=${PG_CONNECTION_STRING}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main"]
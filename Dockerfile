FROM node:alpine as build-env

# ENV NODE_ENV production

WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

COPY . .

RUN npx ng build --prod

FROM iamfreee/docker-nginx-static-spa:latest

COPY --from=build-env /app/www /var/www/html/
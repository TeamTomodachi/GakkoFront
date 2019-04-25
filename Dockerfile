# Build the application in a temporary container
FROM node:alpine as build-env

WORKDIR /app

# Copy the dependency configuration files
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

# install the dependencies before copying the code in
# This means that the dependencies will be cached unless they change
RUN npm install

# Copy all the code over
COPY . .

# Build the application
RUN npx ng build

# Move the built application into a container that will serve the files
# This one will send back the index.html page if the requested path doesn't
# match anything, which is needed for a single-page application that does
# client-side rendering
FROM iamfreee/docker-nginx-static-spa:latest

# Copy the built files over from the build container
COPY --from=build-env /app/www /var/www/html/

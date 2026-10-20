FROM node:24-slim AS build
COPY . /src
WORKDIR /src
RUN npm install
RUN npm run build

FROM nginx:1.31.7
COPY --from=build /src/dist/Instangular/browser /usr/share/nginx/html

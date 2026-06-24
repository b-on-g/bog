FROM node:24-alpine AS build
WORKDIR /app
RUN git clone --depth 1 https://github.com/hyoo-ru/mam.git . \
    && npm install
COPY . bog/forge/
RUN npx mam bog/forge

FROM nginx:alpine
COPY --from=build /app/bog/forge/- /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

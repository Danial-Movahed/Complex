FROM alpine:20240315
LABEL AUTHOR Seyed Danial Movahed
LABEL env=production
EXPOSE 80
RUN apk add --update nodejs npm
COPY ./ ./app
WORKDIR /app
RUN npm i
RUN mkdir -p build
RUN node ace build
WORKDIR /app/build
RUN npm ci --omit="dev"
CMD ["node","bin/server.js"]

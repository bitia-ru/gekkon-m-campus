FROM node:16.13.2-alpine3.15 AS builder

RUN npm config set unsafe-perm true

COPY . /app
WORKDIR /app

RUN npm i --production

ARG apiUrl
ARG clientId
ARG sentryDsn
ENV API_URL ${apiUrl}
ENV CLIENT_ID ${clientId}
ENV SENTRY_DSN ${sentryDsn}

RUN npm run build --development

FROM nginx:1.15-alpine AS runner

WORKDIR /app

COPY --from=builder /app/public /app

COPY docker/configs/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

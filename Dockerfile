# ---- Base Node  ----
FROM node:8.10.0-alpine AS dependencies

WORKDIR /app
COPY package*.json ./

RUN npm install --only=production

# Node.js (latest lts version)
FROM node:8-alpine AS release

WORKDIR /usr/bin/bloomon-cli

COPY . .
COPY --from=dependencies  /app/node_modules ./node_modules/

ENTRYPOINT node bin

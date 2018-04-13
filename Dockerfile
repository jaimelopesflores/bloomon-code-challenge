FROM node:8.10.0-alpine
COPY . /usr/bin/bloomon
WORKDIR /usr/bin/bloomon
RUN yarn

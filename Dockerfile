FROM node:9-alpine

MAINTAINER ikethecoder

ENV NODE_ENV production

WORKDIR /opt/gitlab_keycloak_group_sync
COPY package.json /opt/gitlab_keycloak_group_sync

RUN npm prune && npm install

COPY . /opt/gitlab_keycloak_group_sync

CMD ["node", "./bin/www"]

EXPOSE 8080

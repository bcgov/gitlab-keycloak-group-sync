# gitlab-keycloak-group-sync

It provides a way to push keycloak group membership to gitlab groups.

## Prerequisites

Node JS

## Installation

Clone the repository and create a `config.json` file.

```bash
git clone https://github.com/gitlab-tools/gitlab-ldap-group-sync.git
cd gitlab-ldap-group-sync
cp config.sample.json config.json
npm install
```

## Configuration

See: [config.sample.json ](config.sample.json )

## Usage

Just start the node application.

```bash
npm start
```

## Running in Docker

```
docker build --tag gitlab-keycloak-group-sync .

docker run -ti --rm \
  -v `pwd`/config.json:/opt/gitlab_keycloak_group_sync/config.json \
  gitlab-keycloak-group-sync

```
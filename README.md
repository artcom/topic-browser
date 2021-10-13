# Topic Browser

This project provides a web frontend for retained topics served by the [HiveMQ Retained Message Query Plugin](https://github.com/artcom/hivemq-retained-message-query-plugin).

## Setup

The topic browser can be configured either with env variables or with a config.json file, which needs to be served beside the sources. Provide Username and password, if the broker is used with the [HiveMQ file RBAC extension](https://www.hivemq.com/extension/file-rbac-extension/).

### Env variables

```bash
WS_BROKER_URI="<ws_broker_uri>"
HTTP_BROKER_URI="<http_broker_uri>"
USERNAME="<username>"
PASSWORD="<password>"
```

### Config file

```json
{
  "wsBrokerUri": "<ws_broker_uri>",
  "httpBrokerUri": "<http_broker_uri>",
  "username": "<username>",
  "password": "<password>"
}
```

## Local Development Server

Copy `config.json.template` into `public/config.json` and edit properties or use env variables.

For production build test `npm run start`, copy `config.json.template` into `dist/config.json` and edit properties or use env variables.

## Deployment

### As a Dokku service

The service can be deployed to Dokku using the Node.js buildpack.

- add dokku server as remote
```bash
git remote add <name> dokku@<server>:topic-browser
```

- on first deployment
```bash
ssh dokku@<server> apps:create topic-browser
```

- set configuration
```bash
ssh dokku@<server> config:set topic-browser HTTP_BROKER_URI=<http_broker_uri> WS_BROKER_URI=<ws_broker_uri>
```

- deploy to server
```bash
git push <name> master
```

### As static from a web server

- Build
```bash
npm run build
```

- Configure

Add a `dist/config.json` file with properties as in `config.json.template`

- Serve

Serve the `dist` folder.

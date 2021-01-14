# Topic Browser

This project provides a web frontend for retained topics served by the [HiveMQ Retained Message Query Plugin](https://github.com/artcom/hivemq-retained-message-query-plugin).

## Local Development Server

```bash
WS_BROKER_URI="<ws_broker_uri>"
HTTP_BROKER_URI="<http_broker_uri>"
USERNAME="<username>"
PASSWORD="<password>"

npm install
npm run watch
```
open http://localhost:8080

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

Add a `dist/config.json` file with:

```json
{
  "wsBrokerUri": "<ws_broker_uri>",
  "httpBrokerUri": "<http_broker_uri>",
  "username": "<username>",
  "password": "<password>"
}
```

- Serve

Serve the `dist` folder.

# Restify-BFF

## What is Restify BFF
This is a example API using Restify.  It will also work with an openOIC provide such as OKTA

## Get Started

Clone this repo and cd into ```cd restfiy-bff```
Run the command

```
npm install
```

**Node 18 warning**
resify has a bug with Node 18 please see https://github.com/restify/node-restify/pull/1906/files
and update the files inside the directory node_modules/restify/bin.

you now can run the command 

```
npm run start
```
and this will start a server on port 8080.

If you wish to create a new route controler run the command

```
npm run new-route -- --name=route
```


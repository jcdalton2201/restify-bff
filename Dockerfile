FROM node:18

COPY app restify-bff/app
COPY package.json /restify-bff/package.json
COPY log4js.config.json /restify-bff/log4js.config.json
COPY node_modules /restify-bff/node_modules
RUN mkdir /restify-bff/logs
RUN chmod 775 -R /restify-bff

WORKDIR /restify-bff
ENTRYPOINT [ "npm","run","start" ]    
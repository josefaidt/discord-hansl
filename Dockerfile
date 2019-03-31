FROM node:11
ENV NODE_VERSION 11.13.0
ENV app /usr/hansl/app
WORKDIR ${app}

COPY package.json ./
RUN mkdir app; mkdir packages; mkdir packages/logger
COPY app/package.json ./app
COPY packages/logger/package.json ./packages/logger
RUN yarn install --production
COPY app ./app
COPY packages/logger ./packages/logger

EXPOSE 3000
CMD ["yarn", "workspace", "@hansl/app", "run", "start:prod"]`

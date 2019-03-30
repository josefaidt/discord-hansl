FROM node:11
ENV NODE_VERSION 11.13.0
ENV app /usr/hansl/app
WORKDIR ${app}

COPY package.json ./
RUN yarn install --production
COPY src ./

EXPOSE 3000
CMD ["node", "bot.js"]`

FROM node:10
ENV NODE_VERSION 10
ENV app /usr/hansl/app
WORKDIR ${app}

COPY package.json ./
RUN yarn install --production
COPY dist ./

EXPOSE 3000
CMD ["node", "bot.js"]`

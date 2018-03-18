FROM mhart/alpine-node:latest

WORKDIR /app
COPY package.json yarn.lock ./
# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python
RUN yarn install --production

COPY . .

EXPOSE 3000
CMD ["node", "bot.js"]
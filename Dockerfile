FROM mhart/alpine-node:9.3.0

WORKDIR /app
COPY package.json yarn.lock ./
# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python
RUN yarn install --production

COPY . .

EXPOSE 3000
CMD ["node", "bot.js"]
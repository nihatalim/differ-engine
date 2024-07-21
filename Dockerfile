FROM registry.trendyol.com/platform/base/image/node:16.17.1

COPY package*.json ./
COPY . .
RUN npm install --only=production

EXPOSE 9090

CMD [ "npm", "start" ]

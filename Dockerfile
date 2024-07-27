FROM node:20

COPY package*.json ./
COPY . .
RUN npm install --only=production

EXPOSE 9090

CMD [ "npm", "start" ]

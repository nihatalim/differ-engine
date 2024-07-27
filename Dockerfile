FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
COPY . .
RUN npm install --only=production


FROM node:20-alpine
WORKDIR /app
COPY --from=build /app /app
RUN npm install --only=production

EXPOSE 9090

CMD [ "npm", "start" ]

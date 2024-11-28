FROM node:20-slim as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
RUN npm run build:server

FROM node:20-slim as runner

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist
COPY .env .env

EXPOSE 3000

CMD ["npm", "start"]
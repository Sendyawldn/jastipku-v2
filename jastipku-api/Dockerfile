FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm install

COPY nest-cli.json tsconfig.json tsconfig.build.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma
COPY src ./src

EXPOSE 3001

CMD ["sh", "-c", "npm run prisma:generate && npm run start:dev"]

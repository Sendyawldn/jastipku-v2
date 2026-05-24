FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY next-env.d.ts eslint.config.mjs postcss.config.mjs tsconfig.json ./
COPY public ./public
COPY src ./src

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "-p", "3000"]

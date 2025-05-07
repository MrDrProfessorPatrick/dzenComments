FROM node:23.11.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY prisma ./prisma

RUN npx prisma generate

RUN npx prisma migrate dev --name init

RUN npx prisma db seed

COPY . .

CMD ["npm", "run", "dev"]
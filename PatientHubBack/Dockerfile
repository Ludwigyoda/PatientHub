FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# dépendance a installer
COPY package*.json ./
COPY src/prisma ./src/prisma/

RUN npm ci

RUN npx prisma generate --schema=./src/prisma/schema.prisma

COPY . .

# --- Stage de Production ---
FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/src ./src

EXPOSE 8080

CMD ["npm", "run", "dev"]

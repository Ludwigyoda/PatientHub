FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate --schema=./src/prisma/schema.prisma

EXPOSE 8080

ENV JWT_SECRET=secret_BOB
ENV JWT_ISSUER=patienthub
ENV JWT_AUDIENCE=patienthub-users

CMD ["sh", "-c", "npx prisma migrate deploy --schema=./src/prisma/schema.prisma && npm start"]

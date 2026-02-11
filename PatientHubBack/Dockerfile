FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate --schema=./src/prisma/schema.prisma

EXPOSE 8080

CMD ["npm", "start"]

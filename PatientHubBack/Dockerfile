#linux ?

FROM node:20-alpine


WORKDIR /patienthub

COPY package*.json ./
COPY src/prisma ./src/prisma/
COPY . .


RUN npm install

RUN npx prisma generate --schema=./src/prisma/schema.prisma
ENV NODE_ENV=production



EXPOSE 8080

CMD ["npm", "start"]

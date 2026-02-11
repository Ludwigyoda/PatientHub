# Utilise une image légère de Node.js (version 20) basée sur Alpine Linux
FROM node:20-alpine

# Crée et définit le dossier de travail à l'intérieur du conteneur
WORKDIR /usr/src/app

# Copie les fichiers de définition des dépendances (package.json et lock)
# On le fait AVANT de copier le reste du code pour profiter du cache Docker
COPY package*.json ./

# Copie le dossier prisma pour que le schéma soit disponible pour la génération
COPY src/prisma ./src/prisma/

# Installe les dépendances (npm ci est plus rapide et strict que npm install)
RUN npm ci

# Génère le client Prisma (nécessaire pour que l'app puisse parler à la BDD)
RUN npx prisma generate --schema=./src/prisma/schema.prisma

# Copie tout le reste du code source de votre PC vers le conteneur
COPY . .

# Informe Docker que le conteneur écoute sur le port 8080
EXPOSE 8080

# La commande qui se lance au démarrage du conteneur
CMD ["npm", "run", "dev"]

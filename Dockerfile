FROM node:20 as builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

RUN npm prune

FROM node:20

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3000

USER node
CMD [ "npm", "run", "start:migrate:prod" ]
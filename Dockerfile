FROM node:20 as builder

# Copy files as a non-root user. The `node` user is built in the Node image.
WORKDIR /usr/src/app

# Defaults to production, docker-compose overrides this to development on build and run.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

COPY package.json package-lock.json ./
COPY prisma ./prisma/

RUN npm ci && npm cache clean --force

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

CMD [ "npm", "run", "start:migrate:prod" ]
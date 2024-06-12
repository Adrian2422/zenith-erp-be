FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci && npm cache clean --force

# Run the build command which creates the production bundle
RUN npm run build

USER node

###################
# Runner
###################

FROM node:18-alpine As runner

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules zenith/node_modules
COPY --chown=node:node --from=build /usr/src/app/dist zenith
COPY --chown=node:node --from=build /usr/src/app/.env zenith/.env

# Start the server using the production build
CMD [ "node", "zenith/src/main.js" ]

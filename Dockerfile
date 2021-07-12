FROM node:16 as BUILD

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production


FROM node:16-alpine

ENV NODE_ENV=production

COPY --from=BUILD ./node_modules ./node_modules
COPY . .


RUN apk add dumb-init

EXPOSE 80
ENTRYPOINT ["dumb-init", "--"]

CMD [ "node", "index.js" ]
FROM node:20-alpine as base

WORKDIR /app

COPY package.json .
RUN npm install 

COPY . .
RUN npm run build


FROM node:20-alpine as deps

WORKDIR /app

COPY --from=base /app/package.json .
RUN npm install --only=production


FROM node:20-alpine 

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/dist ./dist

CMD [ "npm", "start" ]
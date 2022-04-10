FROM node:16-alpine AS base

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .
ENV DATABASE_URL=postgresql://mayday:mayday@localhost:5432/mayday
RUN yarn blitz cg
RUN yarn build

CMD ["yarn", "docker-start"]

FROM node:alpine AS build
WORKDIR /apibuild

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install

COPY ["tsconfig.json", "./"]
COPY config ./config
COPY src ./src
RUN yarn build


FROM node:alpine AS apideps
WORKDIR /apideps

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production=true


FROM node:alpine
WORKDIR /api

COPY --from=apideps /apideps/node_modules ./node_modules/
COPY --from=build /apibuild/build ./build
COPY --from=build /apibuild/config ./config
ENV SPY_DOTENV_CONFIG_PATH="/config/prod.env"
CMD ["node", "build/api/index.js"]

# docker build . -t scrappyapi -f src/api/Dockerfile
# docker run --name scrappyapibox -p 1001:1001 -d scrappyapi
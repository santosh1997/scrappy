FROM node:alpine AS build
WORKDIR /workerbuild

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install

COPY ["tsconfig.json", "./"]
COPY config ./config
COPY src ./src
RUN yarn build


FROM node:alpine AS workerdeps
WORKDIR /workerdeps

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production=true


FROM node:alpine
WORKDIR /worker

RUN apk update && apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
      chromium \
      harfbuzz \
      "freetype>2.8" \
      ttf-freefont \
      nss

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY --from=workerdeps /workerdeps/node_modules ./node_modules/
COPY --from=build /workerbuild/build ./build
COPY --from=build /workerbuild/config ./config
ENV SPY_DOTENV_CONFIG_PATH="/config/prod.env"
CMD ["node", "build/worker/index.js"]

# docker build . -t scrappyworker -f src/worker/Dockerfile
# docker run --name scrappyworkerbox -d scrappyworker
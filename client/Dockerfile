FROM node:alpine AS build
WORKDIR /clientbuild

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install


COPY ["tsconfig.json", ".env.production", "./"]
COPY public ./public
COPY src ./src
RUN yarn build


FROM nginx:alpine
COPY --from=build /clientbuild/build /usr/share/nginx/html

# docker build . -t scrappyclient
# docker run --name scrappyclientbox -p 1002:80 -d scrappyclient
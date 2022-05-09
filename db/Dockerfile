FROM mysql

ENV MYSQL_ROOT_PASSWORD=san
COPY ./scripts/ /docker-entrypoint-initdb.d/

EXPOSE 3306
# docker build . -t scrappystore
# docker run --name scrappystorebox -p 3311:3306 -d scrappystore
# docker run --name scrappystorebox -e MYSQL_ROOT_PASSWORD=san -p 3311:3306 mysql
# docker run --name scrappystorebox -e MYSQL_ROOT_PASSWORD=san -p 3311:3306 scrappystore
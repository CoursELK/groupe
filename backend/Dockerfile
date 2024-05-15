FROM php:8.0
RUN mkdir /server
RUN mkdir /server/logs
RUN touch /server/logs/server.log
RUN chmod -R 0777 /server/logs
WORKDIR /server
COPY . .
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --classmap-authoritative
EXPOSE 3000
CMD [ "/bin/bash", "-c", "php -S 0.0.0.0:3000 -t /server/public" ]

FROM php:8.0
RUN mkdir /server
WORKDIR /server
COPY . .
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --classmap-authoritative
EXPOSE 80
CMD [ "/bin/bash", "-c", "php -S 0.0.0.0:80 -t /server/public" ]

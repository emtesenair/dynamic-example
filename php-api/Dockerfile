FROM php:8.2-apache

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y unzip libzip-dev curl git \
  && docker-php-ext-install zip \
  && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy only composer files first (enables caching of vendor)
COPY composer.json composer.lock ./

# Install dependencies and cache vendor/
RUN composer install

# Now copy rest of the app
COPY . .
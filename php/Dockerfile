# ---------- Builder Stage ----------
FROM composer:2.5 AS composer

# Set PHP version constraint for Composer
ENV COMPOSER_ALLOW_SUPERUSER=1

WORKDIR /app

# Copy composer files and install dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --no-interaction

# Copy application files 
COPY . .

# Generate optimized autoloader
RUN composer dump-autoload --optimize

# ---------- Final Stage ----------
FROM php:8.3-fpm-alpine

# Install required PHP extensions and dependencies
RUN apk add --no-cache \
    nginx \
    && docker-php-ext-install pdo pdo_mysql opcache

# Create PHP configuration
RUN { \
    echo 'opcache.memory_consumption=128'; \
    echo 'opcache.interned_strings_buffer=8'; \
    echo 'opcache.max_accelerated_files=4000'; \
    echo 'opcache.revalidate_freq=2'; \
    echo 'opcache.fast_shutdown=1'; \
    echo 'opcache.enable_cli=1'; \
    } > /usr/local/etc/php/conf.d/opcache-recommended.ini

# Copy Nginx configuration
RUN mkdir -p /etc/nginx/http.d && rm -f /etc/nginx/http.d/default.conf
COPY docker/nginx.conf /etc/nginx/http.d/default.conf

# Copy application files
WORKDIR /var/www/html
COPY --from=composer /app /var/www/html

# Set directory permissions
RUN chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache

# Create startup script
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'php artisan config:cache' >> /start.sh && \
    echo 'php artisan route:cache' >> /start.sh && \
    echo 'php artisan view:cache' >> /start.sh && \
    echo 'php-fpm -D' >> /start.sh && \
    echo 'nginx -g "daemon off;"' >> /start.sh && \
    chmod +x /start.sh

# Expose port
EXPOSE 80

CMD ["/start.sh"]
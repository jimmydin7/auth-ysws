FROM docker.io/python:3.10-slim

RUN apt-get update && apt-get install -y apache2 apache2-dev && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN pip install mod_wsgi
RUN mod_wsgi-express module-config > /etc/apache2/mods-available/wsgi.load
RUN a2enmod wsgi

COPY . /var/www/html/

COPY idea-api/ /app/
WORKDIR /app

RUN pip install -r requirements.txt
COPY apache.conf /etc/apache2/sites-available/000-default.conf
RUN chown -R www-data:www-data /app

EXPOSE 80

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
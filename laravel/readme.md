# Docker file

~~~dockerfile
FROM php:7.4-cli

WORKDIR /var/www

RUN apt-get update && \
    apt-get install libzip-dev -y  &&\
    docker-php-ext-install zip

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');"

RUN php composer.phar create-project --prefer-dist laravel/laravel laravel


ENTRYPOINT [ "php","laravel/artisan","serve" ]
CMD [ "--host=0.0.0.0" ]
~~~

## Explicação dos Comandos

- `FROM php:7.4-cli` => Usado para selecionar uma imagem direto do [DockerHub](https://hub.docker.com)
- `FROM php:7.4-cli` => **:7.4-cli** Versão da imagem docker php usada

- `WORKDIR **/var/www**` => Local onde será inicializado do projeto na imagem

- `RUN apt-get update && \
    apt-get install libzip-dev -y  &&\
    docker-php-ext-install zip` => Comandos que serão executados para preperar o ambiente.

- `RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');"` => Comandos que serão executados para instalar o composer na maquina, lembre-se todos comandos estão sendo rodados no diretorio definido em **WORKDIR**

- `RUN php composer.phar create-project --prefer-dist laravel/laravel laravel` => Comando executado para criar projeto laravel na pasta chamada laravel

- `ENTRYPOINT [ "php","laravel/artisan","serve" ]` => Comando executado sempre que o docker é inicalizado, faz a excução do servidor laravel

- `CMD [ "--host=0.0.0.0" ]` => Configuração default, sendo possível passa configurações da sua preferência

## Executando o docker normalmente

~~~bash
docker run --rm --name laravel -d -p 8000:8000 kevenmario/laravel
~~~

## Executando o docker com suas configurações

~~~bash
docker run --rm --name laravel -d -p 8001:8001 kevenmario/laravel --host=0.0.0.0 --port=8001
~~~

## OBS

- Quando o docker é executado com suas configurações, onde existe o comando `CMD [ "--host=0.0.0.0" ]` é subistituido pelo seu, EX :
  - docker run --rm --name laravel -d -p 8001:8001 kevenmario/laravel **--host=0.0.0.0 --port=8001** => essa configurações novas iram subistituir as configurações antigas

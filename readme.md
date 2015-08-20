# laravel-angular-base
This project can be used as a starting point when developing Laravel 5 + AngularJS applications.

## Requirements

- PHP >= 5.5.9
    - check your php version with **php -v** from command line
- PHP Extensions
    - OpenSSL PHP Extension
    - Mbstring PHP Extension
    - Tokenizer PHP Extension
- [MySQL](http://www.mysql.com)
- [Composer](https://getcomposer.org/download/) - Package manager for PHP
- [NPM](https://npmjs.org/) - Node package manager
- [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) ```npm install --global gulp```
- [Less](http://lesscss.org/) ```npm install -g less```
- [Bower](http://bower.io/) - Package manager for JS

## Installation

- Clone the repository
- Install dependencies (from console)
    - run ```composer install```
- Set file permissions:
    - ```chmod -R 777 storage```
    - ```chmod -R 777 bootstrap/cache```
- Create database: ```mysqladmin -u root -p password YOUR PASSWORD create YOUR DATABASE NAME```
- Create `.env` file from `.env.example`. Set there your mysql user, password and other needed information.
- Run migrations: ```php artisan migrate```
- Run seeder: ```php artisan db:seed --env=local```
- Run NPM: ```npm install```

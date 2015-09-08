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
- [Envoy](http://laravel.com/docs/5.0/envoy) ```composer global require "laravel/envoy=~1.0```

## Installation

- Clone the repository
- Install dependencies (from console)
    - run ```composer install```
- Set file permissions:
    - ```chmod -R 777 storage```
    - ```chmod -R 777 bootstrap/cache```
- Create database: ```mysqladmin -u root -p password YOUR PASSWORD create YOUR DATABASE NAME```
- Create `.env` file from `.env.example`. Set there your mysql user, password and other needed information.
- Add ```STRIPE_SECRET_KEY=your_secret_key_here``` and ```STRIPE_PUBLISHABLE_KEY=your_publishable_key``` to the ```.env``` file
- Run migrations: ```php artisan migrate```
- Run seeder: ```php artisan db:seed --env=local```
- Run NPM: ```npm install```
- Set appropriate email in ```app.error-log-emails``` for email error reporting
- Set ```~/.composer/vendor/bin``` directory in your PATH so the envoy executable is found when you run the envoy command in your terminal

## Deploy

- SSH key access is required for deployment using Envoy runner
- Within `Envoy.blade.php` replace ENTER_SERVER_IP_ADDRESS (e.g. 192.168.1.1) and ENTER_SITE_PATH (e.g. /home/www/test-application) strings with proper values for your server. 
- Run ```envoy run deploy```
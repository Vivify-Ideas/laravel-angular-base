@servers(['web' => 'ENTER_SERVER_IP_ADDRESS'])

@setup
    $environment = isset($env) ? $env : "stage";
    $branch = $environment == 'production' ? 'master' : "dev";
    $sitePath = "ENTER_SITE_PATH" . $environment;
@endsetup

@task('deploy')
    cd {{ $sitePath }};
    php artisan down;
    git checkout -- .;
    git pull origin {{ $branch }};
    composer install --prefer-dist --no-dev -o;
    npm install;
    php artisan cache:clear;
    php artisan migrate --force;
    gulp --{{ $environment }};
    php artisan up;
    php artisan queue:restart;
@endtask
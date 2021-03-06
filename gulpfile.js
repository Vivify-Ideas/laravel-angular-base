process.env.DISABLE_NOTIFIER = true;

var elixir = require('laravel-elixir');

require('laravel-elixir-ngtemplatecache');
require('laravel-elixir-ng-annotate');
require('laravel-elixir-clear');

var vendorScripts = [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/lodash/lodash.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-resource/angular-resource.js',
  'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
  'bower_components/angular-ui-router/release/angular-ui-router.js',
  'bower_components/ng-nested-resource/dist/ng-nested-resource.js',
  'bower_components/angular-sanitize/angular-sanitize.js',
  'bower_components/angular-dialog-service/dist/dialogs.js',
  'bower_components/ladda/js/spin.js',
  'bower_components/ladda/js/ladda.js',
  'bower_components/angular-ladda/dist/angular-ladda.min.js',
  'bower_components/angular-spinkit/build/angular-spinkit.js',
  'bower_components/stacktrace/dist/stacktrace.js',
  'bower_components/ng-file-upload/ng-file-upload.js',
  'bower_components/Jcrop/js/jquery.Jcrop.js',
  'bower_components/angular-translate/angular-translate.js',
  'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
  'bower_components/angular-stripe/release/angular-stripe.js',
  'bower_components/angular-credit-cards/release/angular-credit-cards.js'
];

var appScripts = [
  'app/app.js',
  'app/routes.js',
  'app/**/*.js'
];

var adminScripts = [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/bootstrap/dist/js/bootstrap.js',
  'admin/index.js'
];

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.less('app.less');
    mix.copy( 'resources/assets/js/bower_components/Jcrop/css/Jcrop.gif', 'public/build/css/Jcrop.gif' );
});

elixir(function(mix) {
   mix.scripts(vendorScripts, 'public/js/vendors.js');

  if(elixir.config.production) {
    mix.annotate(appScripts).scripts('annotated.js','public/js/app.js', 'public/js/');
  } else {
    mix.scripts(appScripts, 'public/js/app.js');
  }

   mix.scripts(adminScripts, 'public/js/admin.js');
});

elixir(function(mix) {
  mix.ngTemplateCache();
});

elixir(function(mix) {
  mix.version(["css/app.css", "js/vendors.js", "js/templates.js", "js/app.js", "js/admin.js"]);
});

if(elixir.config.production) {
  elixir(function(mix) {
    mix.clear(["public/css", "public/js"]);
  });
}
var elixir = require('laravel-elixir');
require('laravel-elixir-ngtemplatecache');

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

var vendorScripts = [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/lodash/lodash.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-ui-router/release/angular-ui-router.js'
];

var appScripts = [
  'app/app.js',
  'app/routes.js',
  'app/**/*.js'
];

elixir(function(mix) {
    mix.less('app.less');
});

elixir(function(mix) {
   
   mix.scripts(vendorScripts, 'public/js/vendors.js');
   mix.scripts(appScripts, 'public/js/app.js')

});

elixir(function(mix) {
  mix.ngTemplateCache();
});

elixir(function(mix) {
  mix.version(["css/app.css", "js/vendors.js", "js/templates.js", "js/app.js"]);
});
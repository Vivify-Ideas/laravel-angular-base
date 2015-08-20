<!DOCTYPE html>
<html  data-ng-app="LaravelAngularApp">
    <head>
        <title>Laravel 5 + AngularJS</title>

        <link rel="stylesheet" href="{{ elixir('css/app.css') }}" type='text/css'>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div class="title">Laravel 5</div>
            </div>
            <div class="content"> 
                <div class="title">+</div>
            </div>
             <div ui-view class="content"> 

            </div>
        </div>


        <script src="{{ elixir('js/vendors.js') }}"></script>
        <script src="{{ elixir('js/templates.js') }}"></script>
        <script src="{{ elixir('js/app.js') }}"></script>
    </body>
</html>

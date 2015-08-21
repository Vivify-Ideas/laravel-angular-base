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

        <script type="text/javascript">
            window._routes = {
                home: '/',
                users: '/users/:id',
                files: '/files/:id',
                logout: '/auth/logout' //*change this hardcoded route after login is implemented. *//
            };

            window._lab_data = {};

            _lab_data.activeUser = {!! $user !!};
        </script>

        <script src="{{ elixir('js/vendors.js') }}"></script>
        <script src="{{ elixir('js/templates.js') }}"></script>
        <script src="{{ elixir('js/app.js') }}"></script>
    </body>
</html>

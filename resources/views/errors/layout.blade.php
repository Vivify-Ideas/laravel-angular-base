<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title')</title>

    <link rel="stylesheet" href="{{ elixir('css/app.css') }}" type='text/css'>
</head>
<body id="error-page">
<div class="container">
    <div class="content">
        @yield('content')
    </div>
</div>
</body>
</html>

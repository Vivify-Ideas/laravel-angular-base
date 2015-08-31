<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>

<dl>
    <dt>User:</dt>
    @if (Auth::guest())
    <dd>Guest user</dd>
    @else
    <dd>{{ Auth::user()->name . " (" . Auth::user()->id . ")" }}</dd>
    @endif
    <dt>Exception:</dt>
    <dd>{{ $exception }}</dd>
    <dt>URL:</dt>
    <dd>{{ Request::method() . ": " . Request::url() }}</dd>
</dl>

</body>
</html>
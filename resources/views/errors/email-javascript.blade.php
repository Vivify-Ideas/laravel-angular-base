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
    <dt>Error message:</dt>
    <dd>{{ $errorMessage }}</dd>
    <dt>Stack trace:</dt>
    <dd>{!! implode("<br/>", $stackTrace) !!}</dd>
    <dt>Error URL:</dt>
    <dd>{{ $errorUrl }}</dd>
    <dt>Cause:</dt>
    <dd>{{ $cause }}</dd>
    <dt>User Data:</dt>
    <dd>{{ $userAgentData }}</dd>
</dl>

</body>
</html>

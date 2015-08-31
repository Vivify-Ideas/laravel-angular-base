@extends('errors.layout')

@section('title', 'Internal server error')

@section('content')
<div class="title">Internal server error.</div>
<p>An error has occurred in the system, and the administrator of the application has been notified</p>
<div><a href="/">Go to Dashboard</a></div>
@endsection

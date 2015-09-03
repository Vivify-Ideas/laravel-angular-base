@extends('layouts.admin')

@section('content')

<h1>Users</h1>

<table class="table table-hover table-striped">
    <thead>
        <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Created On</th>
            <th>Is Admin</th>
        </tr>
    </thead>
    <tbody>
        @foreach($users as $user)
        <tr>
            <th scope="row">{{ $user->id }}</th>
            <td>{{ $user->first_name }}</td>
            <td>{{ $user->last_name }}</td>
            <td>{{ $user->email }}</td>
            <td>{{ $user->created_at }}</td>
            <td>{{ $user->is_admin ? "Yes" : "No" }}</td>
        </tr>
        @endforeach
    </tbody>
</table>

@endsection

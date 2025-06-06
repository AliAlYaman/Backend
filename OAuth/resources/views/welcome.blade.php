@extends('layouts.app')

@section('title', 'Home')

@section('content')
<link rel="stylesheet" href="{{ asset('css/home.css') }}">
@vite(['resources/css/home.css', 'resources/js/home.js'])

<div class="container text-center">
    <h1>Welcome to Our Website</h1>
    <p>Your go-to platform for awesome features and updates.</p>
    <a href="{{ route('login') }}" class="button-primary">Get Started</a>
</div>
@endsection

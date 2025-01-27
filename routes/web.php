<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
    $_SERVER['HTTPS'] = 'on';
}

Route::get('/', function () {
    return view('app');
});

Route::get('/projects', function () {
    return view('app');
});

Route::get('/project/{id}', function () {
    return view('app');
});

Route::get('/all-tasks', function () {
    return view('app');
});

Route::get('/users', function () {
    return view('app');
});

Route::get('/my-tasks', function () {
    return view('app');
});

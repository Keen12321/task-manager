<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});

Route::get('/projects', function () {
    return view('app');
});

Route::get('/users', function () {
    return view('app');
});
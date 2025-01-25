<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;

// Auth Routes
Route::post('/login', [UserController::class, 'login']);
Route::middleware('auth:api')->post('/logout', [UserController::class, 'logout']);

// User Routes
Route::get('/users', [UserController::class, 'index']);
Route::post('/create-user', [UserController::class, 'create']);

// Project Routes
Route::get('/projects', [ProjectController::class, 'index']);
Route::middleware('auth:api')->post('/create-project', [ProjectController::class, 'create']);

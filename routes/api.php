<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;

// Auth Routes
Route::post('/login', [UserController::class, 'login']);
Route::middleware('auth:api')->post('/logout', [UserController::class, 'logout']);

// Project Routes
Route::get('/projects', [ProjectController::class, 'index']);
Route::middleware('auth:api')->post('/create-project', [ProjectController::class, 'create']);
Route::get('/project/{id}', [ProjectController::class, 'find']);
Route::put('/project/{id}', [ProjectController::class, 'update']);
Route::delete('/project/{id}', [ProjectController::class, 'delete']);

// Task Routes
Route::get('/tasks', [TaskController::class, 'index']);
Route::post('/create-task', [TaskController::class, 'create']);
Route::get('/task/{id}', [TaskController::class, 'find']);
Route::put('/task/{id}', [TaskController::class, 'update']);
Route::delete('/task/{id}', [TaskController::class, 'delete']);
Route::middleware('auth:api')->get('/user-tasks', [TaskController::class, 'getTasksByUser']);

// User Routes
Route::get('/users', [UserController::class, 'index']);
Route::post('/create-user', [UserController::class, 'create']);

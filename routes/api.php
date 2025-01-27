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
Route::middleware('auth:api')->post('/project', [ProjectController::class, 'create']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/project/{id}', [ProjectController::class, 'find']);
Route::middleware('auth:api')->put('/project/{id}', [ProjectController::class, 'update']);
Route::delete('/project/{id}', [ProjectController::class, 'delete']);

// Task Routes
Route::post('/task', [TaskController::class, 'create']);
Route::get('/tasks', [TaskController::class, 'index']);
Route::get('/task/{id}', [TaskController::class, 'find']);
Route::put('/task/{id}', [TaskController::class, 'update']);
Route::delete('/task/{id}', [TaskController::class, 'delete']);
Route::get('/tasks/project/{id}', [TaskController::class, 'getTasksByProject']);
Route::middleware('auth:api')->get('/tasks/user', [TaskController::class, 'getTasksByUser']);

// User Routes
Route::post('/user', [UserController::class, 'create']);
Route::get('/users', [UserController::class, 'index']);

<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/create/post', [HomeController::class, 'postCreateIndex'])->name('createPost');
Route::get('/post/edit/{id}', [HomeController::class, 'postIndex'])->name('postCreateIndex');
Route::post('/post/edit/{id}', [HomeController::class, 'updatePost'])->name('postCreateIndex');
Route::post('/create/post', [HomeController::class, 'storePost'])->name('storePost');

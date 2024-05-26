<?php

use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware(['auth']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/notes', [NotesController::class, 'getNotesList'])->middleware(['auth']);
Route::post('/notes', [NotesController::class, 'addNote'])->middleware(['auth']);
Route::delete('/notes', [NotesController::class, 'deleteNote'])->middleware(['auth']);

Route::get('/expenses', [ExpenseController::class, 'getExpenseList'])->name('expenses')->middleware(['auth']);
Route::post('/expenses', [ExpenseController::class, 'addExpense'])->name('expenses.add')->middleware(['auth']);
Route::delete('/expenses', [ExpenseController::class, 'deleteExpense'])->name('expenses.delete')->middleware(['auth']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

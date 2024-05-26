<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notes extends Model
{
    use HasFactory;
    // protected $fillable = [
    //     'title', 'comment', 'total', 'userId'
    // ];
    protected $guarded  = [];

    public function user()
    {
        return $this->belongsTo(User::class, "notesId");
    }
    public function expenses()
    {
        return $this->hasMany(Expenses::class, "noteId");
    }
}

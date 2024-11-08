<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expenses extends Model
{
    use HasFactory;
    protected $guarded  = [];

    public function note()
    {
        return $this->belongsTo(Notes::class, "noteId");
    }
}

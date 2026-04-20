<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['title', 'content', 'thumbnail', 'status', 'published_at', 'user_id'])]

class Blog extends Model
{
   public function user()
    {
        return $this->belongsTo(User::class);
    }
}

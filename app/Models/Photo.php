<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Support\Str;
use Symfony\Component\Uid\Ulid;

class Photo extends Model
{
    use HasFactory;
    use HasUlids;

    public function newUniqueId(): string
    {
        return Str::ulid()->toRfc4122();
    }

    protected function getUlidAttribute(): Ulid
    {
        return Ulid::fromString($this->attributes['id']);
    }

    public static function bootHasUlids()
    {
        static::creating(function ($model) {
            if ($model->ulid === null) {
                $model->ulid = $this->newUniqueId();
            }
        });
    }
    
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Support\Str;
use Symfony\Component\Uid\Ulid;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    use HasFactory, HasUlids;

    protected $primaryKey = 'ulid';
    public $incrementing = false;

    public function newUniqueId(): string
    {
        return Str::ulid()->toRfc4122();
    }

    public static function bootHasUlids()
    {
        static::creating(function ($model) {
            if ($model->ulid === null) {
                $model->ulid = $this->newUniqueId();
            }
        });
    }

    public function photos(): BelongsToMany
    {
        return $this->belongsToMany(Photo::class, 'photo_tag', 'tag_ulid', 'photo_ulid');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Support\Str;
use Symfony\Component\Uid\Ulid;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Photo extends Model
{
    use HasFactory;
    use HasUlids;

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

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'photo_tag', 'photo_ulid', 'tag_ulid');
    }

    public function tagIds(): array
    {
        return array_column(
            $this->tags()->get()->toArray(),
             'ulid'
        );
    }
    
}

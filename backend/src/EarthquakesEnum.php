<?php

namespace Slamard\Backend;

class EarthquakesEnum
{
    public static function toArray(): array
    {
        return [
            'continent',
            'country',
            'title',
            'magType',
            'alert',
            'location',
            'net',
        ];
    }
}
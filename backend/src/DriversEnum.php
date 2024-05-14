<?php

namespace Slamard\Backend;

class DriversEnum
{
    public static function toArray(): array
    {
        return [
            'number',
            'forename',
            'code',
            'driverRef',
            'nationality',
            'surname',
            'url',
        ];
    }
}
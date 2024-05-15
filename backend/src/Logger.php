<?php

declare(strict_types=1);

namespace Slamard\Backend;

use DateTimeImmutable;
use RuntimeException;

class Logger
{
    const LOGS_DIR = __DIR__ . '/../logs/';

    public function info(string $logs): void
    {
        $this->log($logs, 'INFO');
    }

    public function error(string $logs): void
    {
        $this->log($logs, 'ERROR');
    }

    private function log(string $logs, string $type): void
    {
        try {
            $file = $this->openFile();
        } catch (RuntimeException) {
            return;
        }

        fwrite($file, json_encode([
            'date_time' => (new DateTimeImmutable())->format('Y-m-d H:i:s'),
            'type' => $type,
            'message' => $logs,
        ]));
        fclose($file);
    }

    private function openFile()
    {
        $filename = self::LOGS_DIR . 'server.log';
        $file = fopen($filename, 'w+');
        if ($file === false) {
            throw new RuntimeException('Could not open log file');
        }
        return $file;
    }
}
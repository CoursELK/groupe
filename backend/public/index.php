<?php

declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use Elastic\Elasticsearch\ClientBuilder;
use Elastic\Elasticsearch\Exception\AuthenticationException;
use Slamard\Backend\Controller;
use Slamard\Backend\ElasticSearchEnum;
use Slamard\Backend\Logger;

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function sendError(string $message, int $code, string $trace = ''): void
{
    $logger = new Logger();

    $logger->error('Something wrong happened: ' . $message);

    http_response_code($code);
    echo json_encode([
        'message' => $message,
        'trace' => $trace,
    ]);
}

function getFrom(array $params) {
    return key_exists('from', $params) ? (int) $params['from'] : 0;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError($_SERVER['REQUEST_URI'] . ' doesn\'t support method ' . $_SERVER['REQUEST_METHOD'], 405);

    return;
}

try {
    $controller = new Controller(
        ClientBuilder::create()
            ->setElasticCloudId(ElasticSearchEnum::CLOUD_ID)
            ->setApiKey(ElasticSearchEnum::API_KEY)
            ->build(),
        new Logger(),
    );
} catch (AuthenticationException $e) {
    sendError('Could not build ElasticSearch Client: ' . $e->getMessage(), $e->getCode(), $e->getTraceAsString());

    return;
}


$params = [];
if (key_exists('QUERY_STRING', $_SERVER)) {
    parse_str($_SERVER['QUERY_STRING'], $params);
}

if ($_SERVER['REQUEST_URI'] === '/api/match-all') {
    echo $controller->matchAll(getFrom($params));
    return;
}

if (str_starts_with($_SERVER['REQUEST_URI'], '/api/match')) {
    echo key_exists('match', $params) ?
        $controller->match($params['match'], getFrom($params))
        : $controller->matchAll(getFrom($params));
    return;
}

if (str_starts_with($_SERVER['REQUEST_URI'], '/api/aggs')) {
    echo $controller->aggs(
        key_exists('aggs', $params) ? $params['aggs'] : '',
        key_exists('match', $params) ? $params['match'] : '',
        getFrom($params),
    );
}

sendError($_SERVER['REQUEST_URI'] . ' not found.', 404);

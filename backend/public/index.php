<?php

declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use Elastic\Elasticsearch\ClientBuilder;
use Elastic\Elasticsearch\Exception\AuthenticationException;
use Slamard\Backend\Controller;
use Slamard\Backend\ElasticSearchEnum;

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'message' => $_SERVER['REQUEST_URI'] . ' doesn\'t support method ' . $_SERVER['REQUEST_METHOD'],
    ]);
    return;
}

try {
    $controller = new Controller(ClientBuilder::create()
        ->setElasticCloudId(ElasticSearchEnum::CLOUD_ID)
        ->setApiKey(ElasticSearchEnum::API_KEY)
        ->build()
    );
} catch (AuthenticationException $e) {
    http_response_code($e->getCode());
    echo json_encode([
        'message' => 'Could not build ElasticSearch Client: ' . $e->getMessage(),
        'trace' => $e->getTrace(),
    ]);
    return;
}

$params = [];
if (key_exists('QUERY_STRING', $_SERVER)) {
    parse_str($_SERVER['QUERY_STRING'], $params);
}

if ($_SERVER['REQUEST_URI'] === '/api/match-all') {
    echo $controller->matchAll();
    return;
}

if (str_starts_with($_SERVER['REQUEST_URI'], '/api/match')) {

    echo key_exists('match', $params) ?
        $controller->match($params['match'])
        : $controller->matchAll();
    return;
}

//if (str_starts_with($_SERVER['REQUEST_URI'], '/api/aggs')) {
//    echo $controller->aggs(
//        key_exists('aggs', $params) ? $params['aggs'] : '',
//        key_exists('match', $params) ? $params['match'] : '',
//    );
//}

http_response_code(404);
echo json_encode([
    'message' => $_SERVER['REQUEST_URI'] . ' not found.',
]);

<?php

declare(strict_types=1);

namespace Slamard\Backend;

use Elastic\Elasticsearch\Client;
use Elastic\Elasticsearch\Exception\ClientResponseException;
use Elastic\Elasticsearch\Exception\ServerResponseException;
use Elastic\Elasticsearch\Response\Elasticsearch;
use Elastic\Transport\Exception\UnknownContentTypeException;
use Exception;
use stdClass;

class Controller
{
    const INDEX = 'drivers_text';

    public function __construct(private Client $client)
    {
    }

    public function matchAll(): string
    {
        $params = [
            'index' => self::INDEX,
            'body' => [
                'query' => [
                    'match_all' => new stdClass(),
                ],
            ],
        ];
        try {
            $response = $this->formatResponse($this->client->search($params));
        } catch (ClientResponseException|ServerResponseException|UnknownContentTypeException $e) {
            $response = $this->formatError($e);
        }

        return json_encode($response);
    }

    public function match(string $match): string
    {
        $params = [
            'index' => self::INDEX,
            'body' => [
                'query' => [
                    'bool' => [
                        'should' => $this->matchAllFields($match),
                    ],
                ],
            ]
        ];

        try {
            $response = $this->formatResponse($this->client->search($params));
        } catch (ClientResponseException|ServerResponseException|UnknownContentTypeException $e) {
            $response = $this->formatError($e);
        }

        return json_encode($response);
    }

    public function aggs(string $aggs, string $match): string
    {
        $params = [
            'index' => self::INDEX,
            'body' => [
                'aggs' => [
                    'by_' . $aggs => [
                        'terms' => [
                            'field' => $aggs,
                        ],
                    ],
                ],
            ],
        ];
        if (!empty($match)) {
            $params['body']['query']['bool']['should'] = $this->matchAllFields($match, $aggs);
        }

        try {
            $response = $this->formatResponse($this->client->search($params));
        } catch (ClientResponseException|ServerResponseException|UnknownContentTypeException $e) {
            $response = $this->formatError($e);
        }

        return json_encode($response);
    }

    private function matchAllFields(string $match, string $aggs = ''): array {
        $matches = [];
        foreach (DriversEnum::toArray() as $property) {
            if ($property === $aggs) {
                continue;
            }

            $matches[] = [
                'match' => [
                    $property => $match,
                ],
            ];
        }

        return $matches;
    }

    private function formatResponse(Elasticsearch $response): array
    {
        http_response_code(200);
        return $response->asArray();
    }

    private function formatError(Exception $e): array
    {
        http_response_code($e->getCode());
        return [
            'message' => $e->getMessage(),
            'trace' => $e->getTrace(),
        ];
    }
}

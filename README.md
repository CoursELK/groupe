# ELK course

## Prerequisites

- docker (with compose) up to date

## Get started

To start the project, just launch this command in your terminal:
```bash
docker compose up
```

## Features

- A search input to look into the dataset

## How it works

Frontend works on port 80 and backend works on port 3000.

Frontend app calls the routes on backend app depending on what's given to the input.
Backend calls ElasticSearch client differently depending on the route that's called and the parameters :
- /api/match-all returns the result of a normal match_all query
- /api/match launches a bool/should query on every field of the dataset with query parameter 'match'
- /api/aggs launches an aggs query on the field described in 'aggs' parameter. 
If a 'match' parameter is given, it also matches it.

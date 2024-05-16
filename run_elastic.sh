docker network create elastic

docker pull docker.elastic.co/elasticsearch/elasticsearch:8.13.4
docker run --name es01 --net elastic -e ELASTIC_PASSWORD=eNGhrxpZQNvSiS1aV59TOa7i -p 9200:9200 -it -m 1GB -d docker.elastic.co/elasticsearch/elasticsearch:8.13.4

docker exec -it es01 /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
docker exec -it es01 /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana

docker cp es01:/usr/share/elasticsearch/config/certs/http_ca.crt .

docker pull docker.elastic.co/elasticsearch/elasticsearch:8.13.4
docker run --name ls01 --net elastic -v ./logstash/logstash.conf:/logstash/conf.d/logstash.conf -v ./logstash/patterns:/logstash/patterns/patterns -v ./backend/logs:/logs -it -m 1GB -d docker.elastic.co/elasticsearch/elasticsearch:8.13.4

docker exec -it ls01 /usr/share/logstash/logstash -f /logstash/conf.d/logstash.conf
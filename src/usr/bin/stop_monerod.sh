#!/bin/bash

curl --max-time 8 -s -u monero:monerobox --digest -X POST http://monerod:18081/stop_daemon -H 'Content-Type: application/json'

sleep 10

docker-compose -f /settings/monerod.yml down


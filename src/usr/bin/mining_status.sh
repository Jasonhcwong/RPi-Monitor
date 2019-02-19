#!/bin/bash

info=$(curl --max-time 8 -s -u monero:monerobox --digest -X POST http://monerod:18081/mining_status -H 'Content-Type: application/json')

parsed_info=$(echo $info | jq '.active, .is_background_mining_enabled, .address, .speed, .threads_count, .status' | tr '\n' ',' )

echo "$parsed_info"

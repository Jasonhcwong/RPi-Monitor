#!/bin/bash

info=$(curl --max-time 8 -s -u monero:monerobox --digest -X POST http://monerod:18081/json_rpc -d '{"jsonrpc":"2.0","id":"0","method":"sync_info"}' -H 'Content-Type: application/json')

parsed_info=$(echo $info | jq '.result.target_height' -)

echo "$parsed_info"

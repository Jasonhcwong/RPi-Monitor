#!/bin/bash

info=$(curl --max-time 8 -s -u monero:monerobox --digest -X POST http://monerod:18081/json_rpc -d '{"jsonrpc":"2.0","id":"0","method":"get_info"}' -H 'Content-Type: application/json' | jq '.result')

tmp=$(echo $info | jq '.start_time')
start_time=$(date -d @$tmp)

parsed_info="$(echo $info | jq '.nettype, .height, .target_height, .incoming_connections_count, .outgoing_connections_count, .difficulty, .target, .version' | tr '\n' ',' )$start_time,"

hard_fork_info=$(curl --max-time 8 -s -u monero:monerobox --digest -X POST http://monerod:18081/json_rpc -d '{"jsonrpc":"2.0","id":"0","method":"hard_fork_info"}' -H 'Content-Type: application/json' | jq '.result')

parsed_hard_fork_info=$(echo $hard_fork_info | jq '.state, .version' | tr '\n' ',' )



echo "$parsed_info$parsed_hard_fork_info"


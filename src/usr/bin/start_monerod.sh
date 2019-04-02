#!/bin/bash

serviceJson="/settings/service.json"
tmpJson="/tmp/service.json"

if [ "$1" = "true" ]; then
  # echo "monerod will use Tor"
  jq '.monero.tor=true' "$serviceJson" > "$tmpJson" && mv "$tmpJson" "$serviceJson"
else
  # echo "monerod will NOT use Tor"
  jq '.monero.tor=false' "$serviceJson" > "$tmpJson" && mv "$tmpJson" "$serviceJson"
fi

/usr/src/app/stop_monerod.sh

docker-compose -f /settings/monerod.yml up -d


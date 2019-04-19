#!/bin/bash

serviceJson="/settings/service.json"
height_file="/tmp/.monerod_height"
today=`date +%Y%m%d%H%M%S`
re='^[0-9]+$'

function restartMonerod() {
  torEnabled=$(jq '.monero.tor' "$serviceJson")
  /usr/src/app/start_monerod.sh "$torEnabled"
}

function getHeight() {
  tmp=$(curl --max-time 8 -s -u monero:monerobox --digest -X POST http://monerod:18081/json_rpc -d '{"jsonrpc":"2.0","id":"0","method":"get_info"}' -H 'Content-Type: application/json' | jq '.result.height')
  echo "$tmp"
}

# continue only when monerod service is running
moneroEnabled=$(jq '.monero.enabled' "$serviceJson")
if [ "$moneroEnabled" = "true" ] ; then
  # read old height
  old_height=`cat ${height_file} 2>/dev/null`

  # get new height restart monerod if the cmd failed 6 times consecutively
  new_height=$(getHeight)
  if [ -z "$new_height" ] ; then
    new_height=$(getHeight)
    if [ -z "$new_height" ] ; then
      new_height=$(getHeight)
      if [ -z "$new_height" ] ; then
        new_height=$(getHeight)
        if [ -z "$new_height" ] ; then
          new_height=$(getHeight)
          if [ -z "$new_height" ] ; then
            new_height=$(getHeight)
            if [ -z "$new_height" ] ; then
              restartMonerod
              touch /tmp/restarted_$today
              exit
            fi
          fi
        fi
      fi
    fi
  fi

  # save new height to file
  echo "${new_height}" > ${height_file}

  echo "${today} old height: ${old_height}" >> /tmp/height
  echo "${today} new height: ${new_height}" >> /tmp/height
  echo "" >> /tmp/height

  # if new_height == old_height, restart monerod service 
  if [ ! -z "$old_height" ] && [ "$new_height" -eq "$old_height" ] ; then
    restartMonerod
    touch /tmp/restarted2_$today
  fi
fi

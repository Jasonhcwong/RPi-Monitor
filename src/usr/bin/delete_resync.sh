#!/bin/bash

/usr/src/app/stop_monerod.sh

rm -rf /data/monero/lmdb/*

/usr/src/app/start_monerod.sh


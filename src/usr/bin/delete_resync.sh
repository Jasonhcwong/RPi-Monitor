#!/bin/bash

./stop_monerod.sh

rm -rf /data/monero/lmdb/*

./start_monerod.sh


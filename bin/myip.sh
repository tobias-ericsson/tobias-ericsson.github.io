#!/usr/bin/env bash

echo "###> hostname -I"
hostname
hostname -I

echo
echo "###> curl http://ip-api.com/line/"
curl http://ip-api.com/line/

echo
echo "###> ip route"
ip route

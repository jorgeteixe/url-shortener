#!/bin/bash
if [ -z "$1" ]
  then
    echo "No API_KEY supplied"
    exit
fi
./prepare.sh
export URL_SHORTENER_API_KEY=$1
docker-compose -f prod/docker-compose.yml up -d --no-deps --build
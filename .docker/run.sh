#!/bin/bash
./prepare.sh
docker-compose -f prod/docker-compose.yml up -d
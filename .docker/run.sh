#!/bin/bash
./prepare
docker-compose -f prod/docker-compose.yml up -d
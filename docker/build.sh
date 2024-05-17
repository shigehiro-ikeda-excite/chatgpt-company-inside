#!/bin/bash

cd database
docker build . -t chatgpt-database
cd ../cache
docker build . -t chatgpt-cache

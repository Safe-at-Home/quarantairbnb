#!/bin/sh
set -e;

cd quarantairbnb/webapp
yarn install && yarn build 
cd ../..
gunicorn application:app
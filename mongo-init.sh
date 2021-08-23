#!/bin/bash
set -e
echo ">>>>>>> trying to create database and users"
if [ -n "${MONGO_INITDB_ROOT_USERNAME:-}" ] && [ -n "${MONGO_INITDB_ROOT_PASSWORD:-}" ] && [ -n "${DB_USER:-}" ] && [ -n "${DB_PASSWORD:-}" ]
then
    mongo -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD <<EOF
    db=db.getSiblingDB('${DB_NAME}');
    use babybeaver;
    db.createUser({
    　user: '$DB_USER',
    　pwd: '$DB_PASSWORD',
    　roles: [{
    　　role: 'readWrite',
    　　db: '$DB_NAME'
    　}]
    });
EOF
else
    echo "MONGO_INITDB_ROOT_USERNAME,MONGO_INITDB_ROOT_PASSWORD,dbUser and dbPwd must be provided. Some of these are missing, hence exiting database and user creatioin"
    exit 403
fi
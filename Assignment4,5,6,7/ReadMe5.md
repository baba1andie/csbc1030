# CSBC1030 Assignment 5


## Description

This application is a basic ExpressJS server that exposes endpoints to fetch a list of users and add a new user.

## Features

- GET `/users` - Returns a list of all users.
- GET `/users/:id` - Returns details of a specific user.
- POST `/users` - Adds a new user to the list.

Example

curl -X POST -H "Content-Type: application/json" -d '{"id": "6", "name": "XYZ", "email": "XYZ@gmail.com", "age": 24}' http://localhost:3000/users

run these codes

npm run lint
npm run lint:fix
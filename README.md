# csbc1030

Welcome to CSBC1030 - Fall 2023
This repo is where you will submit your assignments for review.

Asignment 1 - Please refer to the instructions in Assignment1.txt for instructions on how to submit your work.

Step 1: Run the following to import express into node_modules
npm init -y
npm install express sequelize mysql2 body-parser
npm install express bcrypt jsonwebtoken
npm install express cookie-parser --save
npm install dotenv
npm install --save supertest mocha chai chai-http

# To install eslint and prettier: (Optional)

npm i --save-dev eslint
npm i --save-dev prettier

Step 2: Run the node project as follows
node index.js

# To format your code and find linting errors: (Optional)

npm run format
npm run lint
npm run lint:fix

Step 3: DATABASE SETUP
Make sure you create a database with name "CSBC1030_ASSIGNMENT07" in mysql workbench/shell or any mysql ide of your choice

# 3.1 In Mysql Workbench, if you don't have the database

create database CSBC1030_ASSIGNMENT07;

# 3.2 In Mysql Workbench

use CSBC1030_ASSIGNMENT07;

# 3.3 In Nodejs Terminal - To start the application

node index.js

# 3.4 In Mysql Workbench, If you don't have data to Login

INSERT INTO User (email, name, password) VALUES
('yash@gmail.com', 'yash', '$2b$10$gClrAclaFpPWkYf64ZMn0e8uy6.ODX/1OFIjBJC5EOSfSmuMLc4ES'),
('tehlan@gmail.com', 'tehlan', '$2b$10$XzS0i4QTGtwJUAnKM6ZgSOLImNh71WgA5nzqCPG/6PhfFFIciIN5e');

Step 4: To Login, Open the following url in browser for post('/')
http://localhost:3000/api/users/login

Json Body example
{
"email": "yash@gmail.com",
"password": "123"
}

Step 5: Open the following url in browser for get('/')
http://localhost:3000/api/users

Step 6: Open the following url in browser for get('/:id')
http://localhost:3000/api/users/{id}

Step 7: Open the following url in browser for post('/')
http://localhost:3000/api/users

Json Body example
{
"email": "yash@gmail.com",
"name": "yash",
"password": "123"
}

Step 7: To run Test

# For Unit Testing

npm run test

# For End To End Testing

npm run test:e2e

NOTE:
If you try to access any of the given URL before login, It will give the following error
"Access Denied - Token Unavailable/Empty in Header"

# csbc1030

Welcome to CSBC1030 - Fall 2023
This repo is where you will submit your assignments for review.

Asignment 1 - Please refer to the instructions in Assignment1.txt for instructions on how to submit your work.

Step 1: Run the following to import express into node_modules
npm init -y
npm install express
npm install express bcrypt jsonwebtoken
npm install express cookie-parser --save
npm install dotenv
npm install express sequelize mysql2 body-parser

# To install eslint and prettier: (Optional)

npm i --save-dev eslint
npm i --save-dev prettier

Step 2: Run the node project as follows
node index.js

# To format your code and find linting errors: (Optional)

npm run format
npm run lint
npm run lint:fix

Step 3: To Login, Open the following url in browser for post('/')
http://localhost:3000/api/users/login

Json Body example
{
"email": "asl@gmail.com",
"password": "123"
}

Step 4: Open the following url in browser for get('/')
http://localhost:3000/api/users

Step 5: Open the following url in browser for get('/:id')
http://localhost:3000/api/users/{id}

Step 6: Open the following url in browser for post('/')
http://localhost:3000/api/users

Json Body example
{
"email": "asl@gmail.com",
"name": "asl",
"password": "123"
}

# Assignment 7
# Go to terminal

1. To get path of assignment 
cd assignment5

2. install packages 
npm init     
npm install express
npm install jsonwebtoken
npm install sequelize mysql2

# MySQL Server
3. Craete a database called 'assignment_7' in MySQL 
CREATE DATABASE assignment_7; 
INSERT INTO users (id, username, password, first_name, last_name) VALUES  ('abcTest', 'abc@123', 'abc', 'test');


# To run the code : In Terminal
4. to run the code 
 node index.js

# To run API in Postman

5. GET `/users` that returns all users
http://localhost:3000/users

6. POST `/users/login` that returns an authentication token to be used in future requests.
http://localhost:3000/users/login
{
  "username": "abcTest",
  "password": "abc@123"
}

7. GET `/users/:id` that returns a user with  a specific id if it matches the sender of the request
   http://localhost:3000/users/1

   In Headers add 
   key : Authorization
   Value : Bearer [token]
   
   Replace token with your token which generated in login api as a return.

8. POST `/users` that add a new user 
http://localhost:3000/users
  
  In Headers add 
   key : Authorization
   Value : Bearer [token]
   
   Replace token with your token which generated in login api as a return.

   Add below json code as an input in body 
   {
    "username": "xyzTest",
    "password": "xyz@123",
    "first_name": "xyz",
    "last_name": "test"
}
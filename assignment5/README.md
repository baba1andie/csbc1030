# To run this assignment 6
# In terminal

1. To get path of assignment 
   cd assignment5

2. install necessary packages 
npm init     
npm install express
npm install jsonwebtoken

3. to run the code 
 node index.js

# For API in Postman

1. To get login
http://localhost:3000/users/login
{
  "username": "pooja_G",
  "password": "password123"
}

2. GET `/users/:id` that returns a user with a specific id
   http://localhost:3000/users/1

   in headers add
   Authorization : Bearer [token]

3. POST `/users` that add a new user 
http://localhost:3000/users
  
  in headers add
   Authorization : Bearer [token]

    add below json code as an input in body 
   {
    "id": 4,
    "username": "new_user",
    "password": "itsAbc",
    "first_name": "aaa",
    "last_name": "bbb"
}

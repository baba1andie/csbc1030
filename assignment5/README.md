# To run this assignment 5
# In terminal

1. To get path of assignment 
   cd assignment4

2. To install express
   npm eslint --init

3. To install prettier
   npm install prettier

4. Update the package.json file, so add below script object in file
    
    "scripts": {
    "start": "node index.js",
    "format": "prettier --write .",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
}

5. to run the code 
 node index.js

# For API in Postman

1. GET `/users` that returns all users
   http://localhost:3000/users

2. GET `/users/:id` that returns a user with a specific id
   http://localhost:3000/users/1

3. POST `/users` that add a new user 
    add below json code as an input in body 
    {
        "id": 3,
        "first_name": "aaa",
        "last_name": "yyy"
    }


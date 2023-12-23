# Final Project

1. To get path of project 
cd finalProject

2. Install necessary dependencies 
npm init     
npm install express
npm install jsonwebtoken
npm install sequelize mysql2
npm install bcrypt;
npm install mocha chai supertest --save-dev

3.  Set you database credentials in config/dbconnect.js file

4. To run the code 
- node index.js

# mysql 
- Create database 
Create database final_project;

# Testing
- For Unit Testing
npx mocha tests/unit.test.js

- For End To End Testing
npx mocha tests/e2e.test.js

# Postman
# Unauthenticated Routes

- To add a user
GET : http://localhost:3000/users/register

Json Data to add in body : 

{
    "name": "abc",
    "username": "abc123",
    "password": "abc@123",
    "email": "xyz@abc.com",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
}

- For Login 
POST : http://localhost:3000/users/login

JSON Data to add in body :

{
  "username": "pooja123",
  "password": "abc@123"
}

# Authenticated Routes

GET /posts : Fetch all posts by a sender.
GET /posts/:id: Fetch a single post made by a sender.
POST /posts : Create a new post.
PATCH /posts/:id : Update a post.
GET /posts/:id/comments : Fetch all comments about a post.
POST /posts/:id/comments : Add a new comment to a post.
PATCH /posts/:id/comments/:commentId : Update a comment.
DELETE /posts/:id/comments/:commentId : Delete a comment.
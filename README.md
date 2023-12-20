1. Navigate to the Assignment Directory
- cd assignment7

2. Install the required packages and dependencies
- npm init
- npm install express
- npm install jsonwebtoken
- npm install sequelize mysql2
- npm install mocha chai supertest --save-dev


3. Create a database named 'assignment_7' in MySQL
- CREATE DATABASE assignment_7;
- USE assignment_7;
- INSERT INTO user (username, password, first_name, last_name) VALUES ('ABC', 'abc@xyz', 'abc', 'xyz');

4. Run the code
-  npm run unitTest

5. For database connection: update db.js file in the model folder
- Replace 'database_name', 'username', 'password' with your MySQL database name, username, and password.
- Modify the 'host' according to your MySQL server configuration.

6. Run the code
- node index.js

7. To test the API in Postman
- Send a GET request to /users to retrieve all users
- http://localhost:3000/users

- Send a POST request to /users/login to receive an authentication token for future requests
- http://localhost:3000/users/login
  {
    "username": "abcTest",
    "password": "abc@123"
  }

- Send a GET request to /users/:id to retrieve a user with a specific ID (ensure it matches the sender of the request)
- http://localhost:3000/users/1
- In Headers, add:
  Key: Authorization
  Value: Bearer [token]
  Replace [token] with the token generated in the login API response.

- Send a POST request to /users to add a new user
  http://localhost:3000/users

  In Headers, add:
  Key: Authorization
  Value: Bearer [token]

  Replace [token] with the token generated in the login API response.

  Add the following JSON code as input in the body:
  ```
  {
    "username": "xyzTest",
    "password": "xyz@123",
    "first_name": "xyz",
    "last_name": "test"
  }
  ```

- For End-to-End testing   
  npm run endToEndTest

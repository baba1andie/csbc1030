1. Navigate to the Assignment Directory
- cd assignment7

2. Install Required Packages
- npm init
- npm install express jsonwebtoken sequelize mysql2

3. Configure MySQL Database
- CREATE DATABASE assignment_7;
- USE assignment_7;
- INSERT INTO user (username, password, first_name, last_name) VALUES ('abcTest', 'abc@123', 'abc', 'test');

4. Update Database Configuration
-  Modify the 'db.js' file in the 'model' folder. Replace 'database_name', 'username', and 'password' with your MySQL database name, username, and password. Adjust the 'host' according to your MySQL server configuration.

5. Run the Code
- node index.js

6. Test APIs in Postman
- Get All Users
  Endpoint: http://localhost:3000/users
  Method: GET

- User Login
  Endpoint: http://localhost:3000/users/login
  Method: POST
   
  Body: 
  {
  "username": "abcTest",
  "password": "abc@123"
  }
 
-  Get User by ID
  Endpoint: http://localhost:3000/users/1
  Method: GET
  Headers: Add key Authorization with value Bearer [token]. Replace [token] with the token generated from the login API.  

- Add New User
  Endpoint: http://localhost:3000/users
  Method: POST
  Headers: Add key Authorization with value Bearer [token]. Replace [token] with the token generated from the login API.  

  Body:
  {
  "username": "xyzTest",
  "password": "xyz@123",
  "first_name": "xyz",
  "last_name": "test"
  }


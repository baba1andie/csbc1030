# csbc1030

1. Open Postman and test the following endpoints:
POST /users/login:

2. Send a POST request to http://localhost:1010/users/login.
Set the request body with a valid username and password.
Retrieve the generated token from the response.
GET /users:

3. Send a GET request to http://localhost:1010/users.
Include the generated token in the Authorization header as Bearer [token].
GET /users/:id:

4. Send a GET request to http://localhost:1010/users/[user_id].
Replace [user_id] with an existing user ID.
Include the generated token in the Authorization header as Bearer [token].
POST /users:

5. Send a POST request to http://localhost:1010/users.
Include the generated token in the Authorization header as Bearer [token].
Set the request body with user information.
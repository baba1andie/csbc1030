# Assignment6

## Features

- **User Listing:** View a list of users.
- **User Details:** Get details of a specific user.
- **User Creation:** Add a new user (restricted access).



node index.js


#AUTHENTICATION

curl -X POST -H "Content-Type: application/json" -d '{"email": "user@example.com", "password": "your-password"}' http://localhost:3000/users/login
Replace user@example.com and your-password with valid credentials.

#Get User Details
curl -H "Authorization: Bearer your-token-here" http://localhost:3000/users/:id


#Add New User

curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer your-token-here" -d '{"name": "New User", "email": "newuser@example.com", "password": "password"}' http://localhost:3000/users

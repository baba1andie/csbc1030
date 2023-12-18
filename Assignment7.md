## Assignment7
1. Install dependencies
npm init     
npm install express
npm install jsonwebtoken
npm install sequelize mysql2

create a db named 'csbc1030'
create a table named 'user' with id, username, password
add one row manually through terminal
{
    "id": 1,
    "username": "admin",
    "password": "1234"
}
## to run
node index.js
2. to get all users

GET: localhost:3000/users/get

3. login

POST: localhost:3000/users/login
(it creates the token)
{
    "username": "admin",
    "password": "1234"
}

4. to fetch one user using id
GET: localhost:3000/users/:id
attach bearer token
you can fetch your details only

5. add new user

POST: localhost:3000/users/add
(only admin (with user id 1 can add users)
(use bearer token)
{
    "id": 2,
    "username": "user",
    "password": "asdf"
}






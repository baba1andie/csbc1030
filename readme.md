## Assignment6
1. post: localhost:3000/users/login
{
    "id": "1",
    "username": "admin",
    "password": "1234"
}
use the credentials to login which will create a jwt token

2. get: localhost:3000/users/:1
{
    "id": "1",
    "username": "admin",
    "password": "1234"
}
along with bearer token
3. post: localhost:3000/users
{
    "id": "1",
    "username": "admin",
    "password": "1234"
}
along with bearer token

only admin can add users
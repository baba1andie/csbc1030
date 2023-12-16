# csbc1030

1. Open postman

2. Get users
- Keep "Get" and send request to http://localhost:1010/users

3. Post users
- Keep "Post" 
- Write a new users info in body part
- {
  "id": "3", 
  "name": "New User",
  "email": "newuser@example.com"
}
- Send request to http://localhost:1010/users

4. Run lint
- npm run lint
- npm run lint:fix
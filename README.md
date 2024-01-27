# csbc1030

Welcome to CSBC1030 - Fall 2023
This repo is where you will submit your assignments for review.

Asignment 1 - Please refer to the instructions in Assignment1.txt for instructions on how to submit your work.

# Following are the dependencies used in this project
npm init -y
npm install express sequelize mysql2 body-parser
npm install bcrypt jsonwebtoken
npm install cookie-parser --save
npm install dotenv
npm install --save supertest mocha chai chai-http

Step 1: To import all the dependencies used
npm install

# To install eslint and prettier: (Optional)

npm i --save-dev eslint
npm i --save-dev prettier

Step 2: Run the node project as follows
node index.js

# To format your code and find linting errors: (Optional)

npm run format
npm run lint
npm run lint:fix

Step 3: DATABASE SETUP
Make sure you create a database with name "CSBC1030_Final_Assignment" in mysql workbench/shell or any mysql ide of your choice

# 3.1 In Mysql Workbench, if you don't have the database

Connection Name: <any_name>
Connection Method: Standard (TCP/IP)
Parameters:
    Hostname: csbc-service-csbc1040.a.aivencloud.com
    Port: 13626
    Username: avnadmin

-> Click "Test Connection"
Password: AVNS_urgsiIqhNFwvZa-e7pv
-> Click OK - Successfully made the MySQL Connection message should appear
-> Click OK - To close success message
-> Click OK - To save the connection

# 3.2 In Mysql Workbench

use CSBC1030_Final_Assignment;

# 3.3 In Nodejs Terminal - To start the application

node index.js

# 3.4 In Mysql Workbench, If you don't have data to Login
# As this database is in cloud, I have already added the below data
INSERT INTO User (email, name, password) VALUES
('asl@gmail.com', 'asl', '$2b$10$gClrAclaFpPWkYf64ZMn0e8uy6.ODX/1OFIjBJC5EOSfSmuMLc4ES'),
('vimmi@gmail.com', 'vimmi', '$2b$10$XzS0i4QTGtwJUAnKM6ZgSOLImNh71WgA5nzqCPG/6PhfFFIciIN5e');

# 3.5 In Mysql Workbench, If you need data Post Table
# As this database is in cloud, I have already added the below data
INSERT INTO Post (user_id, title, content) VALUES
(1, 'Post Number 1 for User 1', 'This is the content of the post'),
(2, 'Post Number 1 for User 2', 'This is the content of the post');

# 3.6 In Mysql Workbench, If you need data Comment Table
# As this database is in cloud, I have already added the below data
INSERT INTO Comment (post_id, text) VALUES
(1, 'Some Text for post1, comment1'),
(1, 'Some Text for post1, comment2');

Step 4: To Login, Open the following url in browser for post('/')
http://localhost:3000/api/users/login

Json Body example
{
"email": "asl@gmail.com",
"password": "123"
}

Step 5: Open the following url in browser for get('/') - ALL Users
http://localhost:3000/api/users

Step 6: Open the following url in browser for get('/') - ALL Posts
http://localhost:3000/api/posts

Step 7: Open the following url in browser for get('/:id') - One Post by id
http://localhost:3000/api/posts/{id}

Step 8: Open the following url in browser for post('/') - Create Post
http://localhost:3000/api/posts

Json Body example
{
"title": "Post Number 1",
"content": "This is the content of the post"
}

Step 9: Open the following url in browser for patch('/:id') - Update Post
http://localhost:3000/api/posts/{id}

Json Body example
{
"title": "Post Number 1 - Edited",
"content": "This is the Edited content of the post"
}

Step 10: Open the following url in browser for get('/') - ALL Comments for a particular Post
http://localhost:3000/api/posts/{id}/comments
where, {id} -> is the post_id

Step 11: Open the following url in browser for post('/') - Create Comment for a particular Post
http://localhost:3000/api/posts/{id}/comments
where, {id} -> is the post_id
Json Body example
{
"text": "Some Text for post1, comment1"
}

Step 12: Open the following url in browser for patch('/:commentId') - Update one Comment for a particular Post
http://localhost:3000/api/posts/{id}/comments/{commentId}
where, {id} -> is the post_id
{commentId} -> is the comment_id
Json Body example
{
"text": "Updated Text for post1, comment1"
}

Step 13: Open the following url in browser for delete('/:commentId') - Delete one Comment for a particular Post
http://localhost:3000/api/posts/{id}/comments/{commentId}
where, {id} -> is the post_id
{commentId} -> is the comment_id

Step 14: To run Test

# For Unit Testing and e2e Testing

npm run test

NOTE:
If you try to access any of the given URL before login, It will give the following error
"Access Denied - Token Unavailable/Empty in Header"

            Instructions to run the program 

1. cd ccbc1030/final_project/

2. Login to mysql

3. create database finalProject; 
				
4. use database finalProject;

5. INsert values

INSERT INTO User (email, name, password) VALUES
('a@mail.com', 'a', '$2b$10$gClrAclaFpPWkYf64ZMn0e8uy6.ODX/1OFIjBJC5EOSfSmuMLc4ES'),
('b@mail.com', 'b', '$2b$10$XzS0i4QTGtwJUAnKM6ZgSOLImNh71WgA5nzqCPG/6PhfFFIciIN5e');



INSERT INTO Post (user_id, title, content) VALUES
(1, 'Post Number 1 for User 1', 'This is the content of the post'),
(2, 'Post Number 1 for User 2', 'This is the content of the post');



INSERT INTO Comment (post_id, text) VALUES
(1, 'Some Text for post1, comment1'),
(1, 'Some Text for post1, comment2');

Step 4: To Login, Open the following url in browser for post('/')
http://localhost:3000/api/users/login

Json Body example
{
"email": "a@mail.com",
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

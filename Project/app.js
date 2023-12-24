const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json()); //read JSON data


const port = 3002;

// Connect to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jobin123', 
  database: 'project_app' 
});

// Trying to connect to the database
connection.connect(function(err) {
  if (err) {
    console.log('Error connecting to the database');
    return;
  }
  console.log('Connection to database successful');
});

//test route
app.get('/', function(req, res) {
  res.send('The app works!');
});

// Route to get all users
app.get('/users', function(req, res) {
  connection.query('SELECT * FROM users', function(err, results) {
    if (err) {
      res.send('Error getting users');
    } else {
      res.send(results);
    }
  });
});

// login route
app.post('/login', function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(err, results) {
    if (err) {
      res.send('Login failed');
    } else {
      if (results.length > 0) {
        res.send('Logged in successfully');
      } else {
        res.send('Incorrect email or password');
      }
    }
  });
});

//get all posts
app.get('/posts', function(req, res) {
  connection.query('SELECT * FROM posts', function(err, results) {
    if (err) {
      res.send('Error getting posts');
    } else {
      res.send(results);
    }
  });
});

//create a new post
app.post('/posts', function(req, res) {
  const user_id = req.body.user_id;
  const title = req.body.title;
  const body = req.body.body;
  connection.query('INSERT INTO posts (user_id, title, body) VALUES (?, ?, ?)', [user_id, title, body], function(err, results) {
    if (err) {
      res.send('Error creating post');
    } else {
      res.send('Post created successfully with ID: ' + results.insertId);
    }
  });
});

// Update a post
app.patch('/posts/:id', function(req, res) {
    const postId = req.params.id;
    const { title, body } = req.body;
    connection.query('UPDATE posts SET title = ?, body = ? WHERE id = ?', [title, body, postId], function(err, results) {
      if (err) {
        res.send('Error updating post');
      } else {
        res.send('Post updated successfully');
      }
    });
  });

// Add a new comment
app.post('/posts/:id/comments', function(req, res) {
    const postId = req.params.id;
    const { name, email, body } = req.body;
    connection.query('INSERT INTO comments (post_id, name, email, body) VALUES (?, ?, ?, ?)', [postId, name, email, body], function(err, results) {
      if (err) {
        res.send('Error adding comment');
      } else {
        res.send('Comment added successfully');
      }
    });
  });

// Delete a comment
app.delete('/posts/:postId/comments/:commentId', function(req, res) {
    const commentId = req.params.commentId;
    connection.query('DELETE FROM comments WHERE id = ?', [commentId], function(err, results) {
      if (err) {
        res.send('Error deleting comment');
      } else {
        res.send('Comment deleted successfully');
      }
    });
});

// Start the server
app.listen(port, function() {
  console.log('Server is running on port ' + port);
});

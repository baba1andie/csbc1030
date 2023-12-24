// app.js
const express = require('express');
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
// const sequelize = require('../config/dbConfig');
const { User } = require('./models/userModel.js');
const { Post } = require('./models/postModel.js');
const { Comment } = require('./models/commentModel.js');
const { authenticateUser } = require('./middleware/authenticateUser.js');

const app = express();

app.use(express.json());

User.sync();
Post.sync();
Comment.sync();

app.use(cookieParser());
// Use your authentication routes
app.use('/auth', authRoutes);

// Use your user-related routes
app.use('/users', userRoutes);

// Middleware
app.use(authenticateUser);

// Use your post-related routes
app.use('/posts', postRoutes);

const port = process.env.PORT || 3000;

// Sync models and start the server
// sequelize.sync()
//     .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    // })
    // .catch(err => {
    //     console.error('Error syncing models with the database:', err);
    // });

module.exports = { app };
// app.js
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const sequelize = require('../config/dbConfig');

const app = express();

app.use(express.json());

// Use your authentication routes
app.use('/auth', authRoutes);

// Use your post-related routes
app.use('/posts', postRoutes);

// Use your user-related routes
app.use('/users', userRoutes); 

const port = process.env.PORT || 3000;

// Sync models and start the server
sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Error syncing models with the database:', err);
    });

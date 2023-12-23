const express = require('express');
const bodyParser = require('body-parser');
const { User} = require('./model/user')
const usersRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const userController = require('./controller/userController')
const sequelize = require('./config/dbconnect');

const app = express();
app.get('/', userController.getAllUsers);
app.use(bodyParser.json());

app.use("/users", usersRoutes);

app.use("/posts", postRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
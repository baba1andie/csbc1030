const express = require("express");
const usersRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const sequelize = require("./config/database");

const User = require("./models/userModel");

const app = express();

app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Unable to sync database:", error);
  });

app.use((req, res, next) => {
  req.models = {
    User,
  };
  next();
});

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

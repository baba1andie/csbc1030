/* eslint-env node */

const express = require("express");
const app = express();
const usersRoutes = require("./routes/userRoutes");

// const { authenticate } = require("./middleware/authMiddleware");
// const errorHandler = require("./errorHandlers/errorHandler");

app.use(express.json());
// app.use(errorHandler);

app.use("/users", usersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
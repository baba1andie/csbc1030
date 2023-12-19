const express = require("express");
const usersRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

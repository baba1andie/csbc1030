const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.port || 3000;
const authRoute = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const { authFilter, badRequest } = require("./middleware/middlewares.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", authRoute);
app.use(cookieParser());
app.use(authFilter);
app.use("/api/users", userRoutes);
app.use(badRequest);

app.listen(port, () => console.log(`Application running in port ${port}`));

module.exports = { app };

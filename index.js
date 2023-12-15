const express = require("express");
const app = express();
const port = process.env.port || 3000;
const userRoutes = require("./routes/users");
const someMiddleware = require("./middleware/middlewares.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(someMiddleware);
app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Application running in port ${port}`));

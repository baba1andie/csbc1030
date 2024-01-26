const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.port || 3000;
const authRoute = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const { authFilter, badRequest } = require("./middleware/middlewares.js");
const { User } = require("./models/user.js");
const { Post } = require("./models/post.js");
const { Comment } = require("./models/comment.js");
const postRoutes = require("./routes/posts.js");
const commentRoutes = require("./routes/comment.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

User.sync();
Post.sync();
Comment.sync();

app.use("/api", authRoute);
app.use("/api/users", userRoutes);
app.use(cookieParser());
app.use(authFilter);
app.use("/api/posts", postRoutes);
app.use("/api/posts", commentRoutes);
app.use(badRequest);

app.listen(port, () => console.log(`Application running in port ${port}`));

module.exports = { app };

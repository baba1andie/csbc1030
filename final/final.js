import express from 'express';

import { usersRoutes } from './routes/users.js';
import {commentsRoutes} from "./routes/comments.js";
import {postsRoutes} from "./routes/posts.js";

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);



app.use((err, req, res) => {
    console.error("internal server error", err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
    console.log(`Server started`);
});

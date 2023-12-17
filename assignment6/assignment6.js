import { v4 as uuidv4 } from "uuid";
import express from 'express';
import fs from "fs";
import Router from 'express';

import {authenticateToken, generateAccessToken} from './authorize.js';

const app = express();
const port = 3000;

const usersRoutes = Router();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let fetchUsers = () => {
    return JSON.parse(fs.readFileSync("../resources/usersdata.json", "utf-8"));
};

usersRoutes.get("/users", (req, res) => {
    res.send(fetchUsers());
});
usersRoutes.get("/users/:id", authenticateToken, (req, res) => {
    let userId = req.params.id;
    fetchUsers()?.find((data) => {
        if (data.id === userId) {
            res.send(data);
        }
    });
    res.status(404).send("no content found");
});

usersRoutes.post("/users", (req, res) => {
    // Extract user data from req.body
    const newUser = req.body;

    newUser.id = String(uuidv4());

    let generatedjwttoken = generateAccessToken(newUser.id);

    let users = fetchUsers();
    users.push(newUser);
    fs.writeFileSync("../resources/usersdata.json", JSON.stringify(users));
    newUser.token = generatedjwttoken;

    res.status(201).json({ message: "User added successfully", newUser });
});

app.use("/", usersRoutes);

app.use((err, req, res) => {
    console.error("internal server error", err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
    console.log(`Server started`);
});

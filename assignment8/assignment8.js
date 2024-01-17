import { v4 as uuidv4 } from "uuid";
import express from 'express';

import Router from 'express';
import {User} from "./dao/userModel.js";

import {authenticateToken, generateAccessToken} from './auth/authorizer.js';

const app = express();
const port = 3000;

const usersRoutes = Router();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



usersRoutes.get("/users", (req, res) => {
    let usersList = User.findAll();
    usersList.then( data=> {
            console.log(data);
            res.send(data);
        })
        .catch( error => {
            console.log('error', error);
            res.status(500).send('internal server error');
        })
    // res.send(fetchUsers());
});

usersRoutes.get("/users/:id", authenticateToken, (req, res) => {
    let userId = req.params.id;
    let findUserPromise = User.findOne(userId);
    findUserPromise.then( data => {
        console.log(data);
        res.status(200).send(data);
    }).catch(error => {
        console.log(error);
        res.status(404).send("no content found");
    })


});

usersRoutes.post("/users", (req, res) => {

    let uid = String(uuidv4());

    let userData = {
        id: uid,
        name: req.body.name
    }

    let generatedjwttoken = generateAccessToken(userData.id);


    userData.token = generatedjwttoken;
    let createUserPromise = User.create(userData);

    createUserPromise.then(data => {
        res.status(201).json({ message: "User added successfully", userData });
    }).catch( error => {
        console.log('error', error);
        res.status(500).json({ message: "internal server error"});
    })
});

app.use("/", usersRoutes);

app.use((err, req, res) => {
    console.error("internal server error", err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
    console.log(`Server started`);
});

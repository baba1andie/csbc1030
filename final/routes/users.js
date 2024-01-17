import {User} from "../dao/users.js";
import {authenticateToken, generateAccessToken} from "../auth/authorizer.js";
import {v4 as uuidv4} from "uuid";
import Router from "express";


const usersRoutes = Router();
usersRoutes.get("/", (req, res) => {
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

usersRoutes.get("/:id", authenticateToken, (req, res) => {
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

usersRoutes.post("/", (req, res) => {

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


export { usersRoutes }
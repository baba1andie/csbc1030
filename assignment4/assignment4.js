
import express from 'express';
const app = express()

import fs from "fs";

let usersData;

;


fs.promises.readFile('../resources/users.json').then( data =>{
        usersData = JSON.parse(data.toString());
});

let counter = 0;

function someMiddleware(req, res, next) {
    counter+=1;

    console.log(usersData);
    next();
}

app.use(someMiddleware);

app.get('/users', (req, res) => {
    res.send(usersData)
});


app.get('/users/:id', (req, res) => {
    let userId = req.params.id;
    usersData.find(data => {
        if(data.id.toString() === userId){
            res.send(data)
        }
    })
    res.send({'error': 'no data'})
});


// app.post(express.json());
app.use(express.json());

app.listen(3000, ()=>{
    'application started and running at 3000'
});
const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/seerver-config');
const app = express();


const setupAndStartServer= () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));


    app.listen(PORT,() => {
        console.log(`server started on port no. --- ${PORT}---`);
    })
} 

setupAndStartServer();
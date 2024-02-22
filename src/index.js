const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {PORT} = require('./config/seerver-config');
const apiRoutes = require('./routes/index');
const db = require('./models/index');

const setupAndStartServer= () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.get('/bookingservice/api/v1/home', async(req, res) => {
        res.status(200).json({
            message: "inside booking service in indexjs"
        })
    });

    app.use('/bookingservice/api', apiRoutes);

    app.listen(PORT,() => {
        console.log(`server started on port no. --- ${PORT}---`);

        if (process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
        }
    });
} 

setupAndStartServer();
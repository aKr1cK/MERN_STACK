const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

dotenv.config({path:'./config.env'});

const PORT = process.env.PORT;

app.use(express.json());



require('./db/conn');//got db

app.use(require('./router/auth'));//Got router

const user = require('./models/userSchema');

const middleware = (req, resp, next) => {
    console.log('I am middleware');
    next();
}

app.listen(PORT, () => {
    console.log(`server is runnig at port no ${PORT}`);
})


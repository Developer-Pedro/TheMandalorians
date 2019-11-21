//bring PACKAGES into effect
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');//data base authorixation

/*
const {nerdvision} = require('@nerdvision/agent');

nerdvision.init({
    apiKey: 'd9e0f15678329cae9c3d12f011a9c2b2c0498119a0256005de22488a246be694235e49562053f1500f7d2147f7ce2892c7606e4cee03c4a58c351e8fab77de99',
    debug: true,
});

*/ 

//implementation of certain packages 
// "use" sets up a middle ware
app.use(morgan("dev"));//logger middle-ware
//app.use('/uploads'express.static('uploads'))
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//establish Parser for each Route
const idRoutes = require('./api/routes/ID');
const groupRoutes = require('./api/routes/groups');
const userRoutes = require('./api/routes/user');
//Routes to handle requests to designated 
app.use('/ID', idRoutes);
app.use('/groups', groupRoutes);
app.use("/user", userRoutes);

//loging to the actual server
mongoose.connect(
    'mongodb+srv://guzma087:'
    + process.env.MONGO_ATLAS_PW +
    '@box-1-yfkc7.azure.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
}
);
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

//Acces Controls
//Ensure that we prevent CORS errors (security errors enforced by browsers)
app.use((req, res,next) =>{
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Origin,X-Requests-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methos','PUT, POST , PATCH, DELETE, GET')
        return res.status(200).json({});
    }
    next();
});

//checkpoint error handles
app.use((req, res, next) => {
   const error = new Error('Not Found');
    error.status(404);
    next(error);
    
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;
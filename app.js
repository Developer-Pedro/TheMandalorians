const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const idRoutes = require('./api/routes/ID');
const groupRoutes = require('./api/routes/groups');



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://guzma087:<tjtt$$9bmgmH>@box-1-yfkc7.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
  
});
mongoose.Promise = global.Promise;


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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


//Routes to handle requests
app.use('/ID', idRoutes);
app.use('/groups', groupRoutes);

//checkpoint error handles
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error .status(404);
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
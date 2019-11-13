const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require('../middleware/check-auth')
const multer = require('multer');

const Identification = require('../models/ID');
/*this portion is connected to our models folder  in the product file 
it is used to give the layout of an actual "product" object  in the data base */
//####################################################################################

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  });

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

const upload = multer({
    storage: storage, 
    limits:{
    fileSize :1024 * 1024 *5
  },
  fileFilter :fileFilter
  });

//GET ALL Present IDs
exports.GET_ALL_IDs = (req, res, next) => {
    Identification.find()
      .select("fname lname _id IDImage")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          ids: docs.map(doc => {
            return {
              //IDImage: doc.IDImage,
              _id: doc._id,
              lname: doc.lname,
              fname: doc.fname,
              IDImage: doc.IDImage,
              request: {
                type: "GET",
                url: "http://localhost:3000/ID/" + doc._id,
                
              }
            };
          })
        };
        res.status(200).json(response);
      })
      //ERROR CATCHER
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

  exports.construct_an_ID = checkAuth, upload.single('IDImage'), (req, res, next) => {
    console.log(req.file); 
    //Creating new instance of our Identification Model from the models folder 
    const id = new Identification({
        _id: new mongoose.Types.ObjectId(),//make new odject is for ths "Identification"
        fname: req.body.fname,//first name 
        lname: req.body.lname,//last name 
        IDImage: req.file.path
        //IDImage: req.file.path 
      });
      //res.json({ message: "can you see me ?" });//CHECK POINT 
      //console.log("go1");
      id.save()//store into mongodb data base
        .then(result => {//promise to get back something
          console.log(result);//lock the console
          res.status(201).json({
            message: "Created ID successfully",
            createdID: {
                lname: result.lname,
                fname: result.fname,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/ID/" + result._id
                }
            }
          });
        })
        .catch(err => { //error check point 
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    };

    exports.get_specific_ID = (req, res, next) => {
        const id = req.params.The_ID;
        Identification.findById(id)
          .select('fname lname _id personImage')
          .exec()
          .then(doc => {
            console.log("From database", doc);
            if (doc) {
              res.status(200).json({
                  ID_Code: doc,
                  request: {
                      type: 'GET',
                      url: 'http://localhost:3000/ID'+ doc._id
                  }
              });
            } else {
              res
                .status(404)
                .json({ message: "No valid entry found for provided ID" });
            }
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      };

exports.edit_an_ID = checkAuth, (req, res, next) => {
    const id = req.params.The_ID;
    const updateOps = {};// allows us to send different types of patch requests 
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
   Identification.update({ _id: id },
     { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'ID updated On Data Base ',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/ID/' + id,
                lname: result.lname,
                fname: result.fname,
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }

  exports.delete_an_ID = checkAuth, (req, res, next) => {
    const id = req.params.The_ID;
    Identification.remove({ _id: id })//target ID to delete
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'ID deleted',//notify removed
            request: {
                type: 'POST',
                url: 'http://localhost:3000/ID',
                body: { fname: req.body.fname, lname: req.body.lname}
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
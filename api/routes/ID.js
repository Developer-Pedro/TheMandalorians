const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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
      cb(null, new Date().toISOString() + file.originalname);
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
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

//GET
router.get("/", (req, res, next) => {
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
  });
  

//POST a new identification 
/*for a post request from this data fname and lname are expected*/
router.post("/", upload.single('IDImage'), (req, res, next) => {
  //console.log("go0"); 
  //Creating new instance of our Identification Model from the models folder 
  const id = new Identification({
      _id: new mongoose.Types.ObjectId(),//make new odject is for ths "Identification"
      fname: req.body.fname,
      lname: req.body.lname,
      //IDImage: req.file.path 
    });
    //res.json({ message: "can you see me ?" });
    //console.log("go1");
    id.save()//store into mongodb data base
      .then(result => {
        console.log(result);
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
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
//router.post("/", (req,res,next)=>{}

//Get
// the collon inside the function extracts something specific about the the product in this case the product 
  router.get("/:ID", (req, res, next) => {
    const id = req.params.ID;
    Identification.findById(id)
      .select('fname lname _id IDImage')
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
  });

//PATCH
//router to send path request that alter specific things in the object
  router.patch("/:ID", (req, res, next) => {
    const id = req.params.ID;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
   Identification.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'ID updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/ID/' + id
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  router.delete("/:ID", (req, res, next) => {
    const id = req.params.ID;
    Identification.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'ID deleted',
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
  });

module.exports = router;
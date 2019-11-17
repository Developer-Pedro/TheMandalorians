const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth')

//importing models from models file
const Identification = require("../models/ID");
const Group = require("../models/groups");

exports.groups_get_all= (req,res,next)=>{
    Group.find()
    .select('person quantity _id id')
    .populate('person', 'fname')
    .exec()
    .then(docs=>{
      res.status(200).json({
        count: docs.length,
       groups: docs.map(doc => {
         return{
           _id: doc._id,
           person: doc.person,
           quantity: doc.quantity,
           The_ID: doc.id.fname,
           request: {
            type: "GET",
            url: "http://localhost:3000/groups/" + doc._id
            }
           }
        })
      });
    })
    .catch(err=>{
     res.status(500).json({
      error:err
      });
    });
  };

  exports.create_a_group =  (req, res, next) => {
    Identification.findById(req.body.The_ID)
      .then(id => {
        if (!id) {
          return res.status(404).json({
            message: "Person not found"
          });
        }//making new instance of model 
        const group = new Group({
          _id: mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          person: req.body.The_ID
        });
        //save that new created group to the database
        return group.save();
      })
      //return  that result to the user concerning new group
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Group stored",
          createdGroup: {
            _id: result._id,
           person: result.person,
            quantity: result.quantity
          },
          request: {
            type: "GET",
            url: "http://localhost:3000/orders/" + result._id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

  exports.get_specific_group =  (req, res, next) => {
    Group.findById(req.params.The_Group)
      .populate('person')
      .exec()
      .then(group => {
        if (!group) {
          return res.status(404).json({
            message: "Group not found"
          });
        }
        res.status(200).json({
          group: group,
          request: {
            type: "GET",
            url: "http://localhost:3000/groups"
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };

  exports.delete_a_group = (req, res, next) => {
    Group.remove({ _id: req.params.groupID })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Group deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/groups",
            body: { groupID: "ID", quantity: "null" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };
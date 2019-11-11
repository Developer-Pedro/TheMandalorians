const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Group = require("../models/groups");
const Identification = require("../models/ID");


//Find a specific Group
router.get("/", (req, res, next) => {
    Group.find()
      .select("The_ID quantity _id")
      .populate('The_ID', 'fname')
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          groups: docs.map(doc => {
            return {
              _id: doc._id,
              ID: doc.product,
              quantity: doc.quantity,
              request: {
                type: "GET",
                url: "http://localhost:3000/groups/" + doc._id
              }
            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
  
  router.post("/", (req, res, next) => {
    Identification.findById(req.body.The_ID)
      .then(id => {
        if (!id) {
          return res.status(404).json({
            message: "Person not found"
          });
        }
        const group = new Group({
          _id: mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          product: req.body.The_ID
        });
        return group.save();
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Order stored",
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
  });


/*
  //Grab IDs to Construct a group
  router.post("/", (req, res, next) => {
    Identification.findById(req.body.ID)
      .then(ID_Code => {
        if (!ID_Code) {
          return res.status(404).json({
            message: "person / ID not found"
          });
        }
        const n_group = new Group({//Creating new instance of Group objects established in model file
          _id: mongoose.Types.ObjectId(),//generate origina ID code for this Group
          quantity: req.body.quantity,//amount of IDs(people in this group)
          person: req.body.id//target ID(person) to come into group
        });
        return order.save();//(save this new groupd to the database)
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Group created and Stored",
          createdGroup: {
            _id: result._id,
            ID: result.ID,
            quantity: result.quantity
          },
          request: {
            type: "GET",
            url: "http://localhost:3000/groups/" + result._id
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
*/
//Get a specific ID from a group
  router.get("/:orderId", (req, res, next) => {
    Order.findById(req.params.orderId)
      .populate('ID')
      .exec()
      .then(order => {
        if (!order) {
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
  });


//Delete a Group
router.delete("/:groupID", (req, res, next) => {
  Group.remove({ _id: req.params.groupID })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Group deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/groups",
          body: { groupID: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});


module.exports = router;
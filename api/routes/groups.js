const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Group = require("../models/groups");
const Identification = require("../models/ID");

router.get("/", (req, res, next) => {
    Group.find()
      .select("ID quantity _id")
      .populate('ID', 'fname')
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
                url: "http://localhost:3000/orders/" + doc._id
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
    Identification.findById(req.body.productId)
      .then(ID => {
        if (!ID) {
          return res.status(404).json({
            message: "ID not found"
          });
        }
        const group = new Order({
          _id: mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          ID: req.body.ID
        });
        return order.save();
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Group stored",
          createdGroup: {
            _id: result._id,
            ID: result.ID,
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
            url: "http://localhost:3000/orders"
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
/* PEDRO MAKE A GROUP HERE
  router.post("/:CreateGroup", (req, res, next)=> {
    Boolean good = GroupController.Add(req.body.name)
    //Rewrite fir creating a group
    res.status(good ? 200 : 500);
    res.send();
  console.log("can you see me");
  })
*/

router.delete("/:groupID", (req, res, next) => {
  Group.remove({ _id: req.params.groupID })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Group deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
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
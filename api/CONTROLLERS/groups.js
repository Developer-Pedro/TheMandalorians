const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth')

//importing models from models file
const Identification = require("../models/ID");
const Group = require("../models/groups");


exports.groups_get_all= (req,res,next)=>{
    Group
    .find()
    .select('person')
    .populate('person')
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
    
    //Check to Find what we want to group by
    const The_Criteria = {};//get the value we want to group by 
    //console.log("Check Point 1");
    
    //Check to determine that data 
    for(const detail of req.body){//input of what criteria we are grouping by
      The_Criteria[detail.WTF] = detail.value;
    }
    //console.log("Check Point 2");

    //Check point to find all "id"s with the same value in that field 
    Identification.aggregate([
      
      //Phase 1: finding all that meet the criteria 
      {$match: {club: The_Criteria}},
      //Phase 2: group all the matched docs into a new single doc 
      {$group:{_id:"$club"}}
    ])
    //Identification.findById(req.body.The_ID) //commented out on purpose 
      .then(id => {
        if (!id) {
          console.log("see me?");
          return res.status(404).json({
            message: "People not found"
          });
        }//making new instance of model 
        const group = new Group({
          _id: mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          person: req.body.The_ID,//The_club
          message1: req.body.message1,
          message2: req.body.message2,
          message3: req.body.message3,
          message4: req.body.message4,
          message5: req.body.message5,
          message6: req.body.message6,
          message7: req.body.message7,
          message8: req.body.message8,
          message9: req.body.message9,
          message10: req.body.message10,
          message11: req.body.message11,
          message12: req.body.message12,
          message13: req.body.message13,
          message14: req.body.message14,
          message15: req.body.message15,
          message16: req.body.message16,
          message17: req.body.message17,
          message18: req.body.message18,
          message19: req.body.message19,
          message20: req.body.message20,

        });
        //console.log("Check Point 3");
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
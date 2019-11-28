const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth')

//importing models from models file
const Identification = require("../models/ID");
const Group = require("../models/groups");


exports.groups_get_all= (req,res,next)=>{
    Group
    .find()
    .select('person fname lname messages')
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
           messages: doc.messages,
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

  


  exports.Add_Message =(req, res, next)=>{
    // load targeted group into for future use
    const id = req.params.The_Group;

    //clarify the type action your about to take
    Group.update(
      {_id:id},//load targeted group 

      //push new string into desired array
    {$push: {messages:req.body.newMessage}})
    .then(result=>{
      res.status(200).json({
        message: "Message added/sent",
        request: {
          type: 'GET',
          url: 'http://localhost:3000/groups/' + id,
        }
      })
    })
  }

  //  PURPOSE:ADD SOMEONE TO GROUP
  exports.Add_Member=(req, res, next)=>{
    // line "69" ->target specific group(This will be passed in the header) load it into 'id'
    //EXAMPLE:: http://localhost:3000/groups/5dddf913f92dcd78e4b85e1d <--last line is the Identification
    const id = req.params.The_Group;

    //line "72" -->inject targeted specific "Identifification" into the_one
    const the_one = req.body.the_one;

    //line "75" locate the Identification that already should be created and store it into 
  Identification.findById(the_one);

    // line "78" identify the type of operation being committed "its an update"
    Group.updateOne(
      {_id:id},//load target again for committed operation
      {$push: {person:the_one}}//insert the identification
      )
    .then(result=>{
      res.status(200).json({
        message: "Member Added",
        request: {
          type: 'GET',
          url: 'http://localhost:3000/groups/' + id,
        }
      })
    })
  }
  
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
          messages: req.body.messages
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
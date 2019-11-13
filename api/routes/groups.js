const express = require('express');
const router = express.Router();


//importing models from models files
//const Group = require("../models/groups");
//const Identification = require("../models/ID");

const GroupsController = require ('../CONTROLLERS/groups');

//get all Groups 
router.get("/", GroupsController.groups_get_all);

//Create a group
router.post("/",GroupsController.create_a_group);

//Find a specific group
router.get("/:The_Group",GroupsController.get_specific_group);

//Delete a Group
router.delete("/:groupID", GroupsController.delete_a_group);


module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const IDController = require ('../CONTROLLERS/ID');


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


//const Identification = require('../models/ID');
/*this portion is connected to our models folder  in the product file 
it is used to give the layout of an actual "product" object  in the data base */
//####################################################################################



//GET
router.get("/", IDController.GET_ALL_IDs);
  
//POST a new identification 
/*for a post request from this data fname and lname are expected*/
router.post("/", checkAuth, upload.single('IDImage'),IDController.construct_an_ID);

//Get
// the collon inside the function extracts something specific about the the product in this case the product 
  router.get("/:The_ID", IDController.get_specific_ID);

//PATCH
//router to send path request that alter specific things in the object
  router.patch("/:The_ID",checkAuth,IDController.edit_an_ID);

//Delete ID .....but I think you knew that
  router.delete("/:The_ID", checkAuth,IDController.delete_an_ID);

module.exports = router;
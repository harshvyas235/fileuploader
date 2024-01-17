const express = require("express");
const router = express.Router();

const {localFileUpload, imageUpload,videoUpload, imageSizeReducer, imageupload} = require("../controllers/fileUpload");

//api route
router.post("/localFileUpload",localFileUpload );
router.post("/imageupload",imageupload );

module.exports = router;
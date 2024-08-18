const express = require("express");

const { isAuthenticated } = require("../middlewares/auth");
const { createStory ,allStory} = require("../controllers/story");

const router = express.Router();

router.route("/story/upload").post(isAuthenticated,createStory );
router.route("/story").get( allStory);



module.exports = router;

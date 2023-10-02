const express = require("express");
const router = express.Router();

const { stepOne } = require("../controllers/signaling");

router.route("/")
.post(stepOne);

module.exports = router;

const express = require("express");
const router = express.Router();

const { saveUser } = require("../controllers/register");

router.route("/")
.post(saveUser);

module.exports = router;

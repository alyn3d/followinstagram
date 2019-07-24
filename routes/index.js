const express = require("express");
const router = express.Router();

const InstaFollow = require("../controller/instaFollow.controller");

router.get("/api", (req, res) => res.json({ hello: "It's me" }));
router.get("/api/follow", InstaFollow.followUser);

module.exports = router;
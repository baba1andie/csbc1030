/* eslint-env node */

const express = require("express");
const router = express.Router();
const { appendUser } = require("../controllers/users");

router.post("/users", appendUser);

module.exports = router;

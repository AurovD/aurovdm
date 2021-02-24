const express = require("express");
const router = express.Router();
const ctr = require("../controllers/index");
router.get("/", ctr.main);
router.get("/projects", ctr.back);
router.get("/form", ctr.form);



module.exports = router;
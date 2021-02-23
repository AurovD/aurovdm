const express = require("express");
const router = express.Router();
const ctr = require("../controllers/index");
router.get("/", ctr.main);
router.get("/front", ctr.front);
router.get("/back", ctr.back);
router.get("/design", ctr.des);
router.get("/form", ctr.form);



module.exports = router;
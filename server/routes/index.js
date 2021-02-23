const express = require("express");
const router = express.Router();
const ctr = require("../controllers/index");
router.get("/", ctr.main);
router.get("/frontend", ctr.front);
router.get("/backend", ctr.back);
router.get("/design", ctr.des);
router.get("/form", ctr.form);



module.exports = router;
const express = require("express");
const router = express.Router();
const ctr = require("../controllers/index");
router.get("/", ctr.main);
router.get("/FRONTEND", ctr.front);
router.get("/BACKEND", ctr.back);
router.get("/DESIGN", ctr.des);
router.get("/form", ctr.form);



module.exports = router;
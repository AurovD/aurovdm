const express = require("express");
const router = express.Router();
const parser = require("body-parser").json();
const multer = require('multer');
const pool = require("../models/index");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public');
    },
    filename: function (req, file, cb) {
        return cb(null, file.originalname);
    }
});

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

router.post("/adding", parser, async (req, res) => {
    let upload = multer({ storage: storage, fileFilter: imageFilter }).array('imgs', 3);
    upload(req, res, function (err) {
        console.log(req.body.tags);
        if (req.fileValidationError) {
            return res.send({ "msg": req.fileValidationError });
        } else if (!req.files) {
            return res.send({ "msg": 'Please select an image to upload' });
        } else {
            pool.query("CREATE  TABLE IF NOT EXISTS projects( id SERIAL PRIMARY KEY,  title VARCHAR(20), description VARCHAR(100) NOT NULL, github VARCHAR(30), link VARCHAR(30), tags VARCHAR(40)[], img VARCHAR(40)[])");
        }
    });
});

module.exports = router;
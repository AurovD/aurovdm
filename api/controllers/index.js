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
        let tagsList = req.body.tags.split("#");
        tagsList.shift();
        if (req.fileValidationError) {
            return res.send({ "msg": req.fileValidationError });
        } else if (!req.files) {
            return res.send({ "msg": 'Please select an image to upload' });
        } else {
            pool.query("CREATE  TABLE IF NOT EXISTS projects( id SERIAL PRIMARY KEY,  title VARCHAR(20), description VARCHAR(100) NOT NULL, github VARCHAR(30), link VARCHAR(30), tags VARCHAR(40)[], img VARCHAR(40)[], date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);");
            pool.query("CREATE  TABLE IF NOT EXISTS tags( id SERIAL PRIMARY KEY,  name VARCHAR(20) UNIQUE, id_project INT []);");
            pool.query(`INSERT INTO projects(title, description, github, link) VALUES ($1, $2, $3, $4) RETURNING id;`, [req.body.title, req.body.description, req.body.github, req.body.link],(error, response) => {
                if(error) {
                    console.log(error);
                } else {
                    let id = response.rows[0].id;
                    req.files.forEach( img => {
                        pool.query(`UPDATE projects SET img = array_append(img, $1) WHERE id = $2;`, [img.originalname, id],(err, res) => {
                            if(err) {
                                console.log("img", error);
                            }
                        });
                        }
                    )
                    tagsList.forEach( tag => {
                        pool.query(`UPDATE projects SET tags = array_append(tags, $1) WHERE id = $2;`, [tag, id],(err, res) => {
                            if(err) {
                                console.log("tags in proj", error);
                            }
                        });
                        pool.query(`INSERT INTO tags(name, id_project) VALUES ($1, ARRAY[$2]::INTEGER[]);`, [tag, id],(err, res) => {
                            if(err) {
                                pool.query(`UPDATE tags SET id_project = array_append(id_project , $2) WHERE name = $1;`, [tag, id],(errors, results) => {
                                    if(errors) {
                                        console.log(errors)
                                    }
                                });
                            }
                        });
                        }
                    )
                }
            });
        }
    });
});

module.exports = router;
const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

// get uses an extact match so the order of the routers does not matter
router.get('/', (req, res, next) => {

    // __dirname - global variable that holds the absolute path on our operating system to this project folder (routes)
    // we go one level up with ../
    //  path.join let us build a path that works in linux and windows systems
    // res.sendFile(path.join(__dirname,'../','views','shop.html'));
    res.sendFile(path.join(rootDir,'views','shop.html'));
  });

module.exports = router;
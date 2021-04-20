const path = require('path');
const express = require('express');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(__dirname,'../','views','add-product.html'));
});

// /admin/add-product => POST
// filter for only post requests
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

// export router
module.exports = router;

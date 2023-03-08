'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    const x = "my first app";
    console.log(x);

    res.render('index', { title: 'NodeJs site' });
});

module.exports = router;

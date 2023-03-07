'use strict';
var express = require('express');
var router = express.Router();

async function searchHN() {
    //const response = await axios.get(
    //    `https://hn.algolia.com/api/v1/search?query=${query}&tags=story&hitsPerPage=90`
    //);

    //return response.data;
    var arr = [{ "author": "a1", "title": "title 1" }, { "author": "a2", "title": "title 2" }];
    return arr;
}

/* load view page 'WeatherForecast' */
router.get('/', async function (req, res) {

    const results = await searchHN();

    res.render('WeatherForecast',
        {
            title: 'WeatherForecast Oz',
            title2: 'WeatherForecast Oz2',
            searchResults: results
        });
});

module.exports = router;
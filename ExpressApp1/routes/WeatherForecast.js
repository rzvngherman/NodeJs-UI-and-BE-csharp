'use strict';
var express = require('express');
var router = express.Router();

/* load view page 'WeatherForecast' */
router.get('/', async function (req, res) {

    const results = await GetAllWeatherForecast();

    res.render('WeatherForecast',
        {
            title: 'WeatherForecast',
            title2: 'NodeJs with Pug',
            searchResults: results
        });
});

module.exports = router;

//using fetch
async function GetAllWeatherForecast() {
    try {

        const response = await fetch('http://localhost:5264/api/WeatherForecast/GetAllRandom');
        const results = await response.json();
        return results;
    }
    catch (error) {
        console.log(error.response.body);
    }
}
'use strict';
var express = require('express');
var router = express.Router();

var Cat = require('../models/Cat.js');

const base_url = "http://localhost:5264";
const getAllRandom_url = base_url + '/api/WeatherForecast/GetAllRandom';

/* load view page 'WeatherForecast' */
router.get('/', async function (req, res) {

    const results = await GetAllWeatherForecast();
    const resultsMock = await GetAllWeatherForecastMock();

    res.render('WeatherForecast',
        {
            title: 'WeatherForecast api call',
            title2: 'NodeJs with Pug',
            searchResults: results,
            searchResultsMock: resultsMock
        });
});

module.exports = router;

//using fetch
async function GetAllWeatherForecast() {
    try {

        let cat1 = new Cat();
        cat1.initModel({ summary: "sum 01", details: "det 01" });

        const response = await fetch(getAllRandom_url);
        const results = await response.json();
        return results;
    }
    catch (error) {
        //console.log(error.response.body);
        var arr = [{ "summary": "ERROR: url " + getAllRandom_url, "details": error.stack }];
        return arr; 
    }
}

async function GetAllWeatherForecastMock() {
    var arr = [{ "summary": "summary 01", "details": "details 11" }, { "summary": "summary 02", "details": "details 22" }];
    return arr;
}
// controllers/flightsController.js

const express = require('express');
const searchFlightsService = require('../services/searchFlightsService');

const router = express.Router();


router.get('/flights', async (req, res) => {   
    console.log("entered flights controller")
  await searchFlightsService.searchFlights(req, res);
});

// router.get('/',async(req,res)=>{
//     await searchFlightsService.getCities(req, res);
// })

module.exports = router;

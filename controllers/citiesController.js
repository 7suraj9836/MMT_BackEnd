const express =require('express');

const CitiesService =require('../services/citiesService');


const router=express.Router();
console.log(2)
router.get('/cities',async(req,res)=>{
    console.log("entered controller")
   await CitiesService.getCities(req,res);
  
})
//console.log(8);

module.exports=router;
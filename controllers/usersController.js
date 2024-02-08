const express=require('express');
const usersService=require('../services/usersService');

const router=express.Router();

router.post('/signup',async(req,res)=>{
   await usersService.saveUsers(req,res);
});

router.post('/login',async(req,res)=>{
    await usersService.loginUser(req,res);
 });

module.exports=router;
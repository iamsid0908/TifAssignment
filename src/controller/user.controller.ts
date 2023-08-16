import express, {Request, Response} from 'express';
import UserModel,{IUser} from "../models/user.models"
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
require('dotenv').config()

exports.addSignUp =  (req:Request,res:Response)=> {
    const user = new UserModel({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8),
        
    });
    user.save()
    .then(() => {
      // Create a payload for the JWT
      const payload = {
        userId: user._id
      };
      const accessToken = jwt.sign(payload,process.env.SECRET_KEY , { 
        expiresIn: 86400     
    });

      // Set the access token as a cookie
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        
      }).json({
        success:true,
        meta:{
        accessToken,
        },
        content:{
        data:user
        }
    });
    })
    .catch((err) => {
        res.status(500).send({ message: err.message });
      });
}

// Signup function
exports.addSignIn = async (req:Request,res:Response)=> {
    try {
    const {email,password}=req.body;

    const user=await UserModel.findOne({email:email})
        if(!user){
            return res.status(404).send({message:"User not found"});
        }
        var isPasswordValid = bcrypt.compareSync(password,user.password);
        if(!isPasswordValid){
            return res.status(401).send({accessToken:null,message:"Invalid Password!"});
            
        }

        const payload={
            id:user._id
        }
        var accessToken = jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn:86400
        });
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            
          }).json({
            success:true,
            meta:{
            accessToken,
            },
            content:{
            data:user
            }
        });
    }catch(e:any) {
        return res.status(500).send({message:e.message});
    }
    
    
}

exports.userLogout = async(req:Request,res:Response)=> {
    try {
        res.cookie("access_token",null,{
            expires:new Date(Date.now()),
            httpOnly:true,
        });
        res.status(200).json({
            sucess:true,
            message:"logged out",
        });
        
    }catch {
        res.status(401).json({
            sucess:false,
            message:"something went wrong",
        });
    }
}

exports.getUserDetails = async(req:any,res:Response)=> {
    try {
    const user=await UserModel.findById(req.user.id);
    res.status(200).json({
        sucess:true,
        content:{
            data:user
        }
    })
    }catch(err: any){
        return res.status(500).send({message:err.message});
    }
}

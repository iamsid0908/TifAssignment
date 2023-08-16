const jwt=require("jsonwebtoken")
import communityModels from '../src/models/community.models';
import memberModels from '../src/models/member.models';
import roleModels from '../src/models/role.models';
import UserModel from '../src/models/user.models';
import { Request,Response,NextFunction } from "express";
require('dotenv').config()


exports.isAuthenticated = async(req:any,res:Response,next:NextFunction)=>{
    try{

    //getting token from cookies
    const {access_token}= req.cookies;
    if(!access_token){
        return res.status(404).send({message:"token not found"});
    }
    // verifying the access token
    const decodedData=jwt.verify(access_token,process.env.SECRET_KEY);
    req.user = await UserModel.findById(decodedData.id) ;
    
    next();
    }
    catch (error) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
};

exports.authorizedRoles=()=>{
    return async (req:any,res:Response,next:NextFunction)=>{
        const userId=req.user.id;
        console.log(userId)
        const communityId = req.body.community;
        const community = await communityModels.findById({_id:communityId});
        const ownerId = community?.owner.toHexString();   
        console.log(ownerId)

        if(userId !== ownerId){
            return next(res.status(403).send({message:`role: ${userId} are not allowed. you are not admin of this community`}));
        }
        next();
    };
}
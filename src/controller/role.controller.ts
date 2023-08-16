import RoleModels,{IRole} from "../models/role.models";
import express, {Request, Response} from 'express';

exports.getAllRoles = async(req:Request,res:Response)=>{
    try{

        // we can take input from query as well
        const page =  1; // Get the page number from the query parameter
        const limit =  20; // Set a default limit or get the limit from the query parameter

        const skip = (page - 1) * limit;

        const role = await RoleModels.find({}).skip(skip).limit(limit);

        
        res.status(200).json({
            success:true,
            content:{
                meta:{
                    page:page,
                    pages:limit,
                    total:role.length
                }
            },
            role
        })
    }
    catch(e){
        res.status(500).json({ error: 'An error occurred while fetching roles' });

    }
}

exports.createRoles = async(req:Request,res:Response)=>{
    try{
        const data=await RoleModels.create(req.body);
        res.status(201).json({
        success:true,
        content:{
            data
        }
    })
    }catch{
        res.status(404).send({message:"something error"})
    }
}
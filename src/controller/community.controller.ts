import express, {Request, Response} from 'express';
import CommunityModels,{ICommunity} from '../models/community.models';
import memberModels from '../models/member.models';
import { getCommunityInfo,getRoleInfo,getUserInfo } from '../../utils/helper';

exports.createCommunity = async(req:any,res:Response)=> {
    try {
        const community = new CommunityModels({
            name:req.body.name,
            slug:req.body.name,
            owner:req.user.id
        })
        community.save();
        res.status(200).json({
            success:true,
            content:{
                data:community
            }
        })
    } catch(e:any) {
        res.status(500).send({message:e.message})
    }
}

exports.getAllCommunity = async(req:Request,res:Response)=> {
    try {
        const page =  1; // Get the page number from the query parameter
        const limit =  2; // Set a default limit or get the limit from the query parameter

        const skip = (page - 1) * limit;
        const communities = await CommunityModels.find({}).skip(skip).limit(limit);

        res.status(200).json({
            success:true,
            content:{
                meta:{
                    page:page,
                    pages:limit,
                    total:communities.length
                }
            },
            data:communities
        })
    } catch(e:any) {
        res.status(500).json({ error: e.message });

    }
}

exports.getAllMembers = async(req:Request,res:Response)=> {
try {
    const member =await memberModels.find({community:req.params.id});

    const transformedData = await Promise.all(
        member.map(async (item) => ({
          id: item._id.toString(),
          community: item.community.toString(),
          user: await getUserInfo(item.user),
          role: await getRoleInfo(item.role),
          created_at: item.createdAt
        }))
      );
      res.status(200).json({
        success:true,
        data:transformedData
      })
    } catch(e:any) {
        res.status(500).send({message: e.message})
    }
}

exports.getMyOwnCommunity = async(req:any,res:Response)=> {
    try {
        // we can take these data from query as well
    const page =  1; 
    const limit =  10; 
    const skip = (page - 1) * limit;

    const userId = req.user.id;
    const community = await CommunityModels.find({owner:userId}).skip(skip).limit(limit);
    res.status(200).json({
        success:true,
        content:{
            meta:{
                page:page,
                pages:limit,
                total:community.length
            }
        },
        data:community
    })
    } catch(e:any) {
        res.status(500).json({ error: e.message });

    }
}

exports.getMyJoinCommunity = async(req:any,res:Response)=> {
    try {
        const page =  1; 
        const limit =  10; 
        const skip = (page - 1) * limit;

        const member = await memberModels.find({user:req.user.id}).skip(skip).limit(limit);

        const transformedData = await Promise.all(
            member.map( async (item)=>({
                id: item._id.toString(),
                community: await getCommunityInfo(item.community),
                user: await getUserInfo(item.user),
                created_at: item.createdAt
            }))
        )
        res.status(200).json({
            success:true,
            content:{
                meta:{
                    page:page,
                    pages:limit,
                    total:member.length
                }
            },
            data:transformedData
          })
    } catch(e:any) {
        res.status(500).json({ error: e.message });

    }
}

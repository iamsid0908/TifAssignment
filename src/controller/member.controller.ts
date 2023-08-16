import express, {Request, Response} from 'express';
import MemberModels,{IMember} from '../models/member.models';

exports.addMember= async (req:Request,res:Response)=> {
    try {
        const member= new MemberModels({
            community:req.body.community,
            user:req.body.user,
            role:req.body.role
        })
        member.save();
        res.status(200).json({
            success:true,
            content:{
                data:member
            }
        })

    } catch(e:any) {
        res.status(500).send({message: e.message})
    }
}

exports.deleteMember = async (req:Request,res:Response) => {
    try {
        const member=await MemberModels.findByIdAndRemove(req.params.id)
        res.status(200).json({
            sucess:true,
           
        })
    }catch(err:any) {
        return res.status(400).json({
            sucess:false,
            message:err.message
        })
    }
}
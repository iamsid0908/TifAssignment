import mongoose, { Schema,Types } from "mongoose";

export interface ICommunity extends Document {
    name: string;
    slug: string;
    owner: Types.ObjectId;
  }

const CommunitySchema:Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    creatdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }   
})

export default mongoose.model<NonNullable<ICommunity>>('Community',CommunitySchema)
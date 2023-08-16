import mongoose,{Schema,Types} from "mongoose";

export interface IMember extends Document {
    community: Types.ObjectId;
    user: Types.ObjectId;
    role: Types.ObjectId;
    createdAt: Date;
}

const MemberSchema:Schema = new Schema({
    community:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Community",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role",
        required:true
    },
    creatdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model<NonNullable<IMember>>('Member',MemberSchema);
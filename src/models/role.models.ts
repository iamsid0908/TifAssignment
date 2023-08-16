import mongoose ,{Schema,Document}from "mongoose";


export interface IRole extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}


const RoleSchema:Schema=new Schema({
    name:{
        type:String,
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
export default mongoose.model<NonNullable<IRole>>('Role',RoleSchema);
import mongoose,{Schema} from "mongoose";


export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
  }

const UserSchema:Schema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true
    },
    creatdAt:{
        type:Date,
        default:Date.now
    },
})
export default mongoose.model<NonNullable<IUser>>('User',UserSchema)
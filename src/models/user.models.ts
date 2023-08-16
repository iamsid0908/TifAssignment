import mongoose,{Schema} from "mongoose";
const validator=require("validator")


export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
  }

const UserSchema:Schema = new Schema({
    name:{
        type:String,
        require:[true,"Please enter yr name"],
        maxLength:[30,"cannot exid"],
        minLength:[4,"more than 5 char"]
    },
    email:{
        type:String,
        require:[true,"please enter your email"],
        unique:true
        },
    password:{
        type:String,
        require:[true,"please enter yr password"],
        minLength:[8,"password should be more than 8 char"]
    },
    creatdAt:{
        type:Date,
        default:Date.now
    },
})
export default mongoose.model<NonNullable<IUser>>('User',UserSchema)
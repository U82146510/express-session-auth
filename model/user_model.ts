import bcrypt from "bcryptjs";
import {type Document,model,Schema} from "mongoose";

interface IUser extends Document{
    name:string;
    email:string;
    password:string;
};

const user_schema = new Schema<IUser>({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true,minlength:6}
});

user_schema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(this.password,salt)
    this.password = hashed_password
    next()
});

export const User = model<IUser>('User',user_schema);
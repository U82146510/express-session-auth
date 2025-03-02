import { type Request,type Response,type NextFunction } from "express";
import {User} from '../model/user_model.ts'
import {type user_login,assert_user_login} from '../interfaces/user_controller.ts';
import {login_schema} from '../validators/user_validator.ts';
import bcrypt, { genSalt } from "bcryptjs";

export const get_all_users = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const users = await User.find({});
        res.status(201).json(users);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const update_password = async(req:Request<{},{},user_login>,res:Response,next:NextFunction)=>{
    const {value,error} = login_schema.validate(req.body);
    try {
        if(error){
            res.status(400).json({error:error.message});
            return;
        }
        assert_user_login(value);
        const user = await User.findOne({email:value.email});
        if(!user){
            res.status(404).json({message:'not found'});
            return;
        }
        const salt = await genSalt(10);
        const hashed_password = await bcrypt.hash(value.password,salt)
        user.password = hashed_password;
        user.save();
        res.status(201).json({message:'password updated'});
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const update_email = async(req:Request<{},{},user_login>,res:Response,next:NextFunction)=>{
    const {value,error} = login_schema.validate(req.body);
    try {
        if(error){
            res.status(400).json({error:error.message});
            return;
        }
        assert_user_login(value);
        const user = await User.findOne({email:value.email});
        if(!user){
            res.status(404).json({message:'not found'});
            return;
        }
        user.email=value.email;
        user.save();
        res.status(201).json({message:'email updated'});
    } catch (error) {
        console.error(error);
        next(error);
    }
};
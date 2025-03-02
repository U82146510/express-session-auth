import { type Request,type Response,type NextFunction } from "express";
import bcrypt from "bcryptjs";
import { User } from "../model/user_model.ts";
import {type user_register,type user_login ,assert_user_reg,assert_user_login} from '../interfaces/user_controller.ts';
import {register_schema,login_schema} from '../validators/user_validator.ts';



export const register_user = async(req:Request<{},{},user_register>,res:Response,next:NextFunction):Promise<void>=>{
    const {value,error} = register_schema.validate(req.body);
    try {
        if(error){
            res.status(400).json({error:error.message});
            return;
        }
        assert_user_reg(value);
        const if_user_exists = await User.findOne({email:value.email});
        if(!if_user_exists){
            res.status(404).json({message:'not found'});
            return;
        };
        const user = await User.create({name:value.name,email:value.email,password:value.password});
        res.status(201).json({message:'Success'});
    } catch (error) {
        console.error(error);
        next(error);
    }
};
export const login_user = async(req:Request<{},{},user_login>,res:Response,next:NextFunction)=>{
    const {value,error} = login_schema.validate(req.body);
    try {
        if(error){
            res.status(400).json({error:error.message});
            return;
        }
        assert_user_login(value);
        const user = await User.findOne({email:value.email});
        if(!user){
            res.status(404).json({message:'user not found'});
            return;
        }
        const compare_password = await bcrypt.compare(value.password,user.password);
        if(!compare_password){
            res.status(403).json({message:'password not match'})
        }
        req.session.user={name:user.name,id:user.id};
        res.status(200).json({message:'successfully'});
    } catch (error) {
        console.error(error);
        next(error);
    }
};

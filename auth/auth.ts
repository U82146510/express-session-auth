import { type Request,type Response,type NextFunction } from "express";
import {assert_user_session} from '../interfaces/user_controller.ts';
import { User } from "../model/user_model.ts";

export const authorize = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try {
        if(!req.session.user){
            res.status(401).json({message:'unauthorized'});
            return;
        }
        assert_user_session(req.session.user);
        const {name,id} = req.session.user;
        const user = await User.findOne({_id:id});
        if(!user){
            res.status(401).json({message:'unauthorized'});
            return;
        }
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
}
import { type Request,type Response,type NextFunction } from "express";

export const error_handler = (err:any,req:Request,res:Response,next:NextFunction):void=>{
    if(err instanceof Error){
        console.error(err.stack);
        res.status(500).json({error:err.message});
        return;
    }
    
    res.status(500).json({error:'Internal server error'});
}
import { Request,Response,NextFunction } from "express";
import { errorHandler } from "./error";
import { HttpStatusCodes } from "../constants/httpStatusCodes";

const validateAppToken = (req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log(1);
        
        const {token} = req.headers;
        
        
        if(token !== process.env.APP_TOKEN){
            console.log(2);
            throw new Error('Unauthorized');
        }
        
        console.log(3);
        return next();
    } catch (error) {
        console.log(4);
        
       return errorHandler(res, error, 'validateAppToken', HttpStatusCodes.UNAUTHORIZED);
    }
}

export {
    validateAppToken
}
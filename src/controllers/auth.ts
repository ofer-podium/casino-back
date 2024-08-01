import { Request,Response,NextFunction } from "express";
import { errorHandler } from "./error";
import { HttpStatusCodes } from "../constants/httpStatusCodes";

const validateAppToken = (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {token} = req.headers;
        
        if(token !== process.env.APP_TOKEN){
            throw new Error('Unauthorized');
        }
        next();
        
    } catch (error) {
        errorHandler(res, error, 'validateAppToken', HttpStatusCodes.UNAUTHORIZED);
    }
}

export {
    validateAppToken
}
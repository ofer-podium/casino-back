import { Request,Response,NextFunction } from "express";
import { errorHandler } from "./error";
import { HttpStatusCodes } from "../constants/httpStatusCodes";
import { severityLevels } from "../constants/sevirityLevels";
import { userErrors } from "../constants/ErrorLogs";

const validateAppToken = (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {token} = req.headers;
        
        if(token !== process.env.APP_TOKEN){
            throw{
                statusCode:HttpStatusCodes.UNAUTHORIZED,
                clientFacingMessage:userErrors.USER_NOT_AUTHORIZED,
                log: `${userErrors.USER_NOT_AUTHORIZED} with token: ${token}`,
                severityLevel:severityLevels.WARN
            }
        }
        return next();
    } catch (error) {
       return errorHandler(res, error, 'validateAppToken');
    }
}

export {
    validateAppToken
}
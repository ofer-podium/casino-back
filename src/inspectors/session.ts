import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { HttpStatusCodes } from '../constants/httpStatusCodes';
import { severityLevels } from '../constants/sevirityLevels';
import { errorHandler } from '../controllers/error';

const inspectObtainSessionInput = (req:Request, res:Response, next:NextFunction) =>{
    try {
      const schema = Joi.object({
        token: Joi.string().required(),
      }).unknown(true);
  
      const { error } = schema.validate(req.params);
  
      if (error) {
        throw {
          statusCode: HttpStatusCodes.BAD_REQUEST,
          log: error.message,
          clientFacingMessage: error.message,
          severityLevel: severityLevels.WARN,
        };
      }
  
      return next();
    } catch (error:unknown) {
      errorHandler( res,error, 'inspectObtainSessionInput');
    }
  };

  export {
    inspectObtainSessionInput
  }
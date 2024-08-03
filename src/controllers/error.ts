/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import { HttpStatusCodes } from "../constants/httpStatusCodes";

const errorHandler = (res: Response, error: any, triggeringFunction:string) => {
    console.error(`Error in ${triggeringFunction}:`, error);

    res.status(error?.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error?.clientFacingMessage ||  'Internal server error',
      });
}

export {
    errorHandler
}


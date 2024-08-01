import { Response } from "express";

const errorHandler = (res: Response, error: unknown, triggeringFunction:string, statusCode:number = 500) => {
    console.log('Error Handler');
    
    if (error instanceof Error) {
        console.log(`Error in ${triggeringFunction}: `, error);
        res.status(statusCode).json({ error: error?.message });
    }
    
    if (typeof error === 'string') {
        console.log(`Error in ${triggeringFunction}: `, error);
        res.status(statusCode).json({ error });
    }

    console.log(`Error in ${triggeringFunction}: `, error);
    res.status(statusCode).json({ error: 'Internal Server Error' });
}

export {
    errorHandler
}
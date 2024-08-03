import { Request, Response } from 'express';

const sendResponse = (req:Request, res:Response) => {
    const {message,data} = res.locals
    res.json({message,data});
}

export {
    sendResponse
}
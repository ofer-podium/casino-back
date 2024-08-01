import { Request, Response } from "express";
import { generateToken } from "./jwt";
import db from "../models/main";
import { errorHandler } from "./error";

const creatNewSession = (req: Request, res: Response) => {
    try {
        const session = db.Session.create({
            token: generateToken(),
            initialCredits: 10,
            currentCredits: 10,
            isActive: true
        });
        res.locals.session = session;
    } catch (error:unknown) {
        errorHandler(res, error, 'creatNewSession');        
    }
}

export {
    creatNewSession
}